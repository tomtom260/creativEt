import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { prisma } from "../../utils/db"
import { Profile, User } from "@prisma/client"
import DefaultLayout from "../../layouts/DefaultLayout"
import Text from "../../components/Typography"
import { TypographyVariant } from "../../components/Typography/textVariant.enum"
import Button from "../../components/Button"
import ButtonVariants from "../../components/Button/button.enum"
import Head from "next/head"
import HorizontalMenu from "../../components/HorizontalMenu"
import Cards from "../../components/Cards/BaseCard"
import { getSession } from "next-auth/react"
import { MailIcon } from "@heroicons/react/outline"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getContents } from "../../modules/content/server"
import { ContentBoughtQuery, ContentLikedQuery } from "@/api/content"
import {
  useUserWithProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/hooks/user"
import { isFollwingUser } from "modules/user/server"
import MyContent from "@/components/Cards/MyContent"
import BoostModal from "@/modules/content/components/BoostModal"
import DeleteModal from "@/modules/content/components/DeleteModal"

type Contents = Awaited<ReturnType<typeof getContents>>
type ProfileProps = Awaited<ReturnType<typeof getServerSideProps>>["props"]

enum MenuItems {
  "Shots",
  "Liked Shots",
  "Bought Content",
  "Boosted Shots",
}

function ProfilePage({ profile, myProfile, contents }: ProfileProps) {
  const profileQuery = useUserWithProfileQuery(profile.id, {
    placeholderData: { data: { data: { ...profile } } },
  })

  console.log("filteredContents", contents)

  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const [filteredContents, setFilteredContents] = useState<Contents>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    switch (selectedMenuItem) {
      case MenuItems["Liked Shots"]:
        ContentLikedQuery().then((res) => {
          setLoading(false)
          setFilteredContents(res)
        })
        break
      case MenuItems["Bought Content"]:
        ContentBoughtQuery().then((res) => {
          setLoading(false)
          setFilteredContents(res)
        })
        break
      default:
      case MenuItems.Shots:
        setFilteredContents(contents)
        setLoading(false)
    }
  }, [selectedMenuItem])

  const followMutation = useFollowUserMutation(profileQuery.data.id)
  const unFollowMutation = useUnfollowUserMutation(profileQuery.data.id)

  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  if (!profileQuery.data) {
    return <div>NO User with that username exists</div>
  }

  return (
    <>
      <Head>
        <title>{profileQuery.data.name} | creativET</title>
      </Head>
      <DefaultLayout>
        <div className="flex flex-col w-full">
          <div className="flex mx-auto">
            <div className="relative w-20 md:w-32 h-20 md:h-32 mr-12">
              <Image
                src={profileQuery.data.image!}
                className="rounded-full"
                layout="fill"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col flex-1   justify-between min-h-20 md:min-h-32">
              <Text className="" varaint={TypographyVariant.H1}>
                {profileQuery.data.name}
              </Text>
              {profileQuery.data.location && (
                <Text
                  className="capitalize mb-1 "
                  varaint={TypographyVariant.Body1}
                >
                  {profileQuery.data.location}
                </Text>
              )}
              {myProfile ? (
                <Button
                  onClick={() => {
                    router.push("/account/Profile")
                  }}
                  variant={ButtonVariants.OUTLINED}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-4 ">
                  <Button
                    className="w-min"
                    onClick={() => {
                      profileQuery.data.isFollowedByCurrentUser
                        ? unFollowMutation.mutate(profileQuery.data.id)
                        : followMutation.mutate(profileQuery.data.id)
                    }}
                    variant={ButtonVariants.OUTLINED}
                  >
                    {profileQuery.data.isFollowedByCurrentUser
                      ? "Following"
                      : "Follow"}
                  </Button>
                  <Button
                    appendComponent={<MailIcon />}
                    className=""
                    onClick={() => {}}
                    variant={ButtonVariants.PRIMARY}
                  >
                    Hire Us
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 md:mt-16"></div>
          <HorizontalMenu
            setSelectedMenuItem={setSelectedMenuItem}
            selectedMenuItem={selectedMenuItem}
            menuItems={Object.values(MenuItems).filter(
              (item) => typeof item === "string"
            )}
          />
          <div className="grid mb-96  mt-8 md:mt-14 gap-8  mx-auto  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
            {filteredContents?.map((content) => {
              return (
                <MyContent
                  flippedCard={flippedCard}
                  setFlippedCard={setFlippedCard}
                  key={content.id}
                  loading={loading}
                  content={content}
                />
              )
            })}
          </div>
        </div>
      </DefaultLayout>
      <BoostModal />
      <DeleteModal />
    </>
  )
}

export default ProfilePage

type GetServerSidePropsContextWithCustomParams = GetServerSidePropsContext & {
  params: {
    username: string
  }
}

export async function getServerSideProps(
  context: GetServerSidePropsContextWithCustomParams
) {
  const session = await getSession(context)
  const { username } = context.params
  const profile = await prisma.profile.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      location: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          id: true,
        },
      },
    },
  })
  profile.isFollowedByCurrentUser = await isFollwingUser(
    session?.user.id,
    profile?.user.id
  )
  const contents = await getContents(session?.user.id, profile?.user.id)
  const formattedProfileObject = formatProfileObject(profile)

  return {
    props: changeDateInJSONToMoment({
      profile: formattedProfileObject,
      myProfile: formattedProfileObject.id === session?.user.id,
      contents,
      protected: true,
    }),
  }
}

function formatProfileObject(
  profile: Profile & {
    user: User
  }
) {
  const newProfile = { ...profile }
  delete newProfile["user"]
  return {
    ...newProfile,
    ...profile?.user,
  }
}

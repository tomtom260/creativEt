import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { prisma } from "../../utils/db"
import { Prisma, Profile, User } from "@prisma/client"
import DefaultLayout from "../../layouts/DefaultLayout"
import Text from "../../components/Typography"
import { TypographyVariant } from "../../components/Typography/textVariant.enum"
import Button from "../../components/Button"
import ButtonVariants from "../../components/Button/button.enum"
import Head from "next/head"
import HorizontalMenu from "../../components/HorizontalMenu"
import Cards from "../../components/Cards"
import { getSession, useSession } from "next-auth/react"
import { MailIcon } from "@heroicons/react/outline"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getContents } from "../../module/content/server"
import { ContentBoughtQuery, ContentLikedQuery } from "@/api/content"
// import { useContentBoughtQuery, useContentLikedQuery } from "@/api/content"
type Contents = Awaited<ReturnType<typeof getContents>>
type ProfileProps = Awaited<ReturnType<typeof getServerSideProps>>["props"]

enum MenuItems {
  "Shots",
  "Liked Shots",
  "Bought Content",
  "Boosted Shots",
}

function ProfilePage({ profile, myProfile, contents }: ProfileProps) {
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

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>NO User with that username exists</div>
  }

  return (
    <>
      <Head>
        <title>{profile.name} | creativET</title>
      </Head>
      <DefaultLayout>
        <div className="flex flex-col w-full">
          <div className="flex mx-auto">
            <div className="relative w-20 md:w-32 h-20 md:h-32 mr-12">
              <Image
                src={profile.image!}
                className="rounded-full"
                layout="fill"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col flex-1   justify-between min-h-20 md:min-h-32">
              <Text className="" varaint={TypographyVariant.H1}>
                {profile.name}
              </Text>
              {profile.location && (
                <Text
                  className="capitalize mb-1 "
                  varaint={TypographyVariant.Body1}
                >
                  {profile.location}
                </Text>
              )}
              {!myProfile ? (
                <Button onClick={() => {}} variant={ButtonVariants.OUTLINED}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-4 ">
                  <Button
                    className="w-min"
                    onClick={() => {}}
                    variant={ButtonVariants.OUTLINED}
                  >
                    Follow
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
          <div className="grid md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-4 gap-y-8  mt-12">
            {filteredContents?.map((content) => {
              return (
                <Cards key={content.id} loading={loading} content={content} />
              )
            })}
          </div>
        </div>
      </DefaultLayout>
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
  const contents = await getContents(session?.user.id, profile?.user.id)
  const formattedProfileObject = formatProfileObject(profile)

  return {
    props: changeDateInJSONToMoment({
      profile: formattedProfileObject,
      myProfile: formattedProfileObject.id === session?.user.id,
      contents,
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
    ...profile.user,
  }
}

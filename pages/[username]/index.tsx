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
import { getSession } from "next-auth/react"
import { MailIcon } from "@heroicons/react/outline"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getContents } from "../../modules/content/server"
import {
  ContentBoostedQuery,
  ContentBoughtQuery,
  ContentLikedQuery,
} from "@/modules/content/api"
import {
  useUserWithProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetCurrentUser,
  useToggleAvailableForHireMutation,
} from "@/hooks/user"
import { isFollwingUser } from "modules/user/server"
import MyContent from "@/components/Cards/MyContent"
import BoostModal from "@/modules/content/components/BoostModal"
import DeleteModal from "@/modules/content/components/DeleteModal"
import InsufficientBalanceModal from "@/modules/content/components/InsufficientBalanceModal"
import Toggle from "@/components/Form/Switch"
import HireModal from "@/modules/user/component/HireModal"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"
import EditModal from "@/modules/user/component/EditModal"
import EnterFullProfileModal from "@/modules/user/component/EnterFullProfileModal"
import { CheckIcon, PlusIcon } from "@heroicons/react/solid"
import Link from "next/link"
import {
  getOptimisedProfileImage,
  getPublicIdFromUrl,
  getResponsiveImage,
} from "@/utils/cloudinary"

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

  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const [filteredContents, setFilteredContents] = useState<Contents>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = useGetCurrentUser().data

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
      case MenuItems["Boosted Shots"]:
        ContentBoostedQuery().then((res) => {
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
  const toggleAvailableForHireMutation = useToggleAvailableForHireMutation(
    profileQuery.data.id
  )
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  if (!profileQuery.data) {
    return <div>NO User with that username exists</div>
  }

  const profileImageUrl = profileQuery.data.image as string
  const profileImage = profileImageUrl.includes("cloudinary")
    ? getResponsiveImage(getPublicIdFromUrl(profileImageUrl), 128)
    : profileImageUrl

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
                src={profileImage}
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
                <div className="flex flex-col gap-4 mt-4 ">
                  <Button
                    onClick={() => {
                      router.push("/account/Profile")
                    }}
                    variant={ButtonVariants.OUTLINED}
                  >
                    Edit Profile
                  </Button>
                  <div className=" flex gap-4">
                    <Text varaint={TypographyVariant.Body1}>
                      Available for hire
                    </Text>
                    <Toggle
                      onChange={() => {
                        if (
                          !user.data?.availableForHire &&
                          (!user?.bio || !user?.location)
                        ) {
                          dispatch(
                            showModal({
                              modalType: ModalType.UPDATE_PROFILE,
                              payload: {},
                            })
                          )
                        } else {
                          toggleAvailableForHireMutation.mutate(
                            profileQuery.data.id
                          )
                        }
                      }}
                      value={profileQuery.data.availableForHire}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 ">
                  <Button
                    appendComponent={
                      !profileQuery.data.isFollowedByCurrentUser && (
                        <PlusIcon className="w-5 h-5" />
                      )
                    }
                    prependComponent={
                      profileQuery.data.isFollowedByCurrentUser && (
                        <CheckIcon className="w-5 h-5" />
                      )
                    }
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
                  {profileQuery.data.availableForHire && (
                    <Button
                      className=""
                      onClick={() => {
                        dispatch(
                          showModal({
                            modalType: ModalType.HIRE_MODAL,
                            payload: {
                              userId: profileQuery.data.id,
                            },
                          })
                        )
                      }}
                      variant={ButtonVariants.PRIMARY}
                    >
                      Hire
                    </Button>
                  )}
                  <Link
                    passHref
                    href={`chat?username=${profileQuery.data.username}`}
                  >
                    <Button
                      appendComponent={<MailIcon className="h-5 w-5" />}
                      className=""
                      onClick={() => {}}
                      variant={ButtonVariants.OUTLINED}
                    >
                      Message
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 md:mt-8"></div>
          {myProfile && (
            <HorizontalMenu
              setSelectedMenuItem={setSelectedMenuItem}
              selectedMenuItem={selectedMenuItem}
              menuItems={Object.values(MenuItems).filter(
                (item) => typeof item === "string"
              )}
            />
          )}
          <div className="grid mb-96  mt-8 md:mt-8 gap-8  mx-auto  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
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
      <InsufficientBalanceModal />
      <HireModal />
      <EditModal />
      <EnterFullProfileModal />
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
          availableForHire: true,
        },
      },
    },
  })

  if (!profile) {
    return {
      notFound: true,
    }
  }

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

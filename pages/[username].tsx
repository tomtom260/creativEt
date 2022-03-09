import { GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"
import DefaultLayout from "../layouts/DefaultLayout"
import Text from "../components/Typography"
import { TypographyVariant } from "../components/Typography/textVariant.enum"
import Button from "../components/Button"
import ButtonVariants from "../components/Button/button.enum"
import Head from "next/head"
import HorizontalMenu from "../components/HorizontalMenu"
import Cards from "../components/Cards"

type ProfileProps = {
  profile: Awaited<ReturnType<typeof getStaticProps>>["props"]["profile"]
}

function Profile({ profile }: ProfileProps) {
  useEffect(() => {
    console.log(profile?.user.name)
  }, [])

  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>NO User with that username exists</div>
  }
  console.log(process.env.NEXT_PUBLIC_URL)

  return (
    <>
      <Head>
        <title>{profile.user.name} | creativET</title>
      </Head>
      <DefaultLayout>
        <div className="flex flex-col w-full">
          <div className="flex mx-auto">
            <div className="relative w-20 md:w-32 h-20 md:h-32 mr-12">
              <Image
                src={profile.user.image!}
                className="rounded-full"
                layout="fill"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col flex-1   justify-between min-h-20 md:min-h-32">
              <Text className="" varaint={TypographyVariant.H1}>
                {profile.user.name}
              </Text>
              <Text
                className="capitalize mb-1 "
                varaint={TypographyVariant.Body1}
              >
                {profile.location || "unknown"}
              </Text>
              <Button onClick={() => {}} variant={ButtonVariants.OUTLINED}>
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-16"></div>
          <HorizontalMenu
            setSelectedMenuItem={setSelectedMenuItem}
            selectedMenuItem={selectedMenuItem}
            menuItems={["Shots", "Boosted Shots", "Liked Shots"]}
          />
          <div className="grid md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-4 gap-y-8  mt-12">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default Profile

export function getStaticPaths() {
  return {
    paths: [{ params: { username: "tomtom" } }],
    fallback: true,
  }
}

type GetStaticPropsContextWithCustomParams = GetStaticPropsContext & {
  params: {
    username: string
  }
}

export async function getStaticProps(
  context: GetStaticPropsContextWithCustomParams
) {
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
    // include: {
    //   user: true,
    // },
  })

  return {
    props: {
      profile,
    }, // will be passed to the page component as props
  }
}

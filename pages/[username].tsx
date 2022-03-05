import { GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import React, { useEffect } from "react"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"
import DefaultLayout from "../layouts/DefaultLayout"
import Text from "../components/Typography"
import { TypographyVariant } from "../components/Typography/textVariant.enum"

type ProfileProps = {
  profile: Awaited<ReturnType<typeof getStaticProps>>["props"]["profile"]
}

function Profile({ profile }: ProfileProps) {
  useEffect(() => {
    console.log(profile?.user.name)
  }, [])

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>NO User with that username exists</div>
  }
  return (
    <DefaultLayout>
      <div className="flex flex-col">
        <div className="flex">
          <div className="relative w-20 md:w-32 h-20 md:h-32">
            <Image
              src={profile.user.image!}
              className="rounded-full"
              layout="fill"
              alt="profile image"
            />
          </div>
          <div className="flex flex-col">
            <Text varaint={TypographyVariant.H2}>{profile.user.name}</Text>
            <Text varaint={TypographyVariant.Body1}>
              {profile.location || "unknown"}
            </Text>
          </div>
        </div>
      </div>
    </DefaultLayout>
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

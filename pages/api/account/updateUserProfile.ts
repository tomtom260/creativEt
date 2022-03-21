import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: {
    image?: string
    name?: string
    location?: string
    bio?: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const id = session?.user?.id!

  let k: keyof typeof req.body
  for (k in req.body) {
    if (!req.body[k]) delete req.body[k]
  }

  switch (req.method) {
    case "POST":
      let user = {}
      const { image } = req.body
      if (image) {
        user = await prisma.user.update({
          where: {
            id,
          },
          include: {
            Profile: true,
          },
          data: {
            image,
          },
        })
      } else {
        const { name, location, bio } = req.body
        if (name) {
          user = await prisma.user.update({
            where: {
              id,
            },
            include: {
              Profile: true,
            },
            data: {
              name,
            },
          })
        }
        if (location || bio) {
          const profile = await prisma.profile.update({
            where: {
              userId: id,
            },
            include: {
              user: true,
            },
            data: {
              location,
              bio,
            },
          })
          user = {
            ...profile.user,
            Profile: {
              bio: profile.bio,
              location: profile.location,
              username: profile.username,
            },
          }
        }
      }
      return SuccessAPIResponse(res, user)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

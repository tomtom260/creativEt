import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  ErrorAPIResponse,
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    id?: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    throw {
      message: "unauthorized",
      status: "error",
      statusCode: 401,
    }
  }
  switch (req.method) {
    case "GET":
      const { id } = req.query
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          Profile: true,
          // followers: true,
          following: true,
        },
      })

      user = {
        ...user,
        location: user?.Profile?.location,
        username: user?.Profile?.username,
        bio: user?.Profile?.bio,
      }

      if (!user) {
        return ErrorAPIResponse(res, `User with that id ${id} not found`)
      }

      user.isFollowedByCurrentUser = user.following.some(
        (follow) => follow.followerId === session.user.id
      )

      // delete user.followers
      delete user.following
      delete user.Profile

      return SuccessAPIResponse(res, user)

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

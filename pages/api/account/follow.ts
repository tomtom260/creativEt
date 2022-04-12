import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    followingId: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const followerId = session?.user?.id!
  const { followingId } = req.query

  switch (req.method) {
    case "GET":
    const followObj = await prisma.follow.create({
        data: {
          followerId: followerId,
          followingId,
        },
      })
      return SuccessAPIResponse(res, followObj)
    case "DELETE":
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      })
      return SuccessAPIResponse(res, {})

    default:
      wrongRequestMethodError(res, ["GET", "DELETE"])
  }
}

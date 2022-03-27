import { Profile } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const id = req.query.contentId as string
      const userId = req.query.userId as string
      const content = await prisma?.content.findUnique({
        where: {
          id,
        },
        include: {
          tags: true,
          createdBy: true,
          likes: true,
          _count: {
            select: { likes: true },
          },
        },
      })

      const { location, username } = (await prisma?.profile.findUnique({
        where: {
          userId: content?.userId,
        },
      })!) as Profile
      content.createdBy = { ...content.createdBy, location, username }
      content.totalLikes = content._count.likes
      console.log(userId)
      content.isLikedByCurrentUser = content.likes.some(
        like => like.userId === userId
      )

      delete content._count
      delete content.likes

      console.log(content)
      return SuccessAPIResponse(res, content!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

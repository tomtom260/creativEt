import { Profile } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"
import { getContent } from "module/content/server"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.contentId as string
  const userId = req.query.userId as string
  const content = await getContent(id, userId)
  switch (req.method) {
    case "GET":
      // const content = await prisma?.content.findUnique({
      //   where: {
      //     id,
      //   },
      //   include: {
      //     tags: true,
      //     createdBy: true,
      //     likes: true,
      //     Transaction: true,
      //     _count: {
      //       select: { likes: true },
      //     },
      //   },
      // })

      // const { location, username } = (await prisma?.profile.findUnique({
      //   where: {
      //     userId: content?.userId,
      //   },
      // })!) as Profile
      // content.createdBy = { ...content.createdBy, location, username }
      // content.totalLikes = content._count.likes
      // content.isLikedByCurrentUser = content.likes.some(
      //   like => like.userId === userId
      // )
      // content.isBoughtByCurrentUser = content?.Transaction.some(
      //   trans => trans.buyerId === userId
      // )
      // delete content._count
      // delete content.likes
      // delete content.Transaction

      console.log(content)
      return SuccessAPIResponse(res, content!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

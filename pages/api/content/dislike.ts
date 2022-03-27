import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.id!

  switch (req.method) {
    case "GET":
      const contentId = req.query.contentId as string
      const like = await prisma?.likes.delete({
        where: {
          userId_contentId: {
            userId,
            contentId,
          },
        },
      })
      return SuccessAPIResponse(res, like!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

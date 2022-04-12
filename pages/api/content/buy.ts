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
      const content = await prisma?.content.findUnique({
        where: {
          id: contentId,
        },
        include: {
          createdBy: true,
        },
      })
      if (!content) {
        throw {
          statusCode: 400,
          status: "error",
          message: "not found",
        }
      }
      const transaction = await prisma.transaction.create({
        data: {
          sellerId: content.createdBy.id,
          buyerId: userId,
          amount: content.price,
          contentId: content.id,
        },
      })
      return SuccessAPIResponse(res, transaction!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

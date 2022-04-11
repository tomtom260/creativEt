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
      const contentId = req.query.contentId as string
      const contents = await prisma?.content.update({
        where: {
          id: contentId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      })
      return SuccessAPIResponse(res, contents!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

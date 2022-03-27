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
      const content = await prisma?.content.findUnique({
        where: {
          id,
        },
      })
      return SuccessAPIResponse(res, content!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

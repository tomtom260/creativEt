import { Profile } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"
import { getContent } from "modules/content/server"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.contentId as string
  const userId = req.query.userId as string
  const content = await getContent(id, userId)
  switch (req.method) {
    case "GET":
      return SuccessAPIResponse(res, content!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

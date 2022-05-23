import { boostContent, deleteContent } from "@/modules/content/server"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await boostContent(req.query.id as string)
      return SuccessAPIResponse(res, {})
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

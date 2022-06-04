import { UpdateContent } from "@/modules/content/server"
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
    case "PATCH":
      return SuccessAPIResponse(
        res,
        await UpdateContent(req.query.id as string, req.body)
      )
    default:
      wrongRequestMethodError(res, ["PATCH"])
  }
}

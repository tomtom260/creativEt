import { toggleMessageSeen } from "@/modules/chat/server/controller"
import { getMessage } from "@/modules/chat/server/services"
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
      return SuccessAPIResponse(
        res,
        (await getMessage(req.query.id as string)) || {}
      )
    case "PATCH":
      return SuccessAPIResponse(
        res,
        await toggleMessageSeen(req.query.id as string)
      )
    default:
      wrongRequestMethodError(res, ["PATCH", "GET"])
  }
}

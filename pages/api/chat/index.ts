import {
  createNewMessage,
  toggleMessageSeen,
} from "@/modules/chat/server/controller"
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
    case "POST":
      createNewMessage(req.body)
      return SuccessAPIResponse(res, {})
    case "PATCH":
      toggleMessageSeen(req.body.id)
      return SuccessAPIResponse(res, {})
    default:
      wrongRequestMethodError(res, ["POST", "PATCH"])
  }
}

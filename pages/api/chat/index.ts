import {
  createNewMessage,
  getMessagesWithRoomId,
  toggleMessageSeen,
} from "@/modules/chat/server/controller"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  switch (req.method) {
    case "GET":
      const messages = await getMessagesWithRoomId(req.query.id)
      return res.status(200).json(messages)
    case "POST":
      createNewMessage({ ...req.body, senderId: session?.user.id })
      return SuccessAPIResponse(res, {})
    case "PATCH":
      toggleMessageSeen(req.body.id)
      return SuccessAPIResponse(res, {})
    default:
      wrongRequestMethodError(res, ["POST", "PATCH", "GET"])
  }
}

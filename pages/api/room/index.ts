import { createNewRoom, getAllRooms } from "@/modules/chat/server/controller"
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
    case "POST":
      const room = await createNewRoom(req.body)
      return SuccessAPIResponse(res, room)
    case "GET":
      const rooms = await getAllRooms(session?.user.id)
      return SuccessAPIResponse(res, rooms)
    default:
      wrongRequestMethodError(res, ["POST", "GET"])
  }
}

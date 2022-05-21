import { createNewRoom, getAllRooms } from "@/modules/chat/server/controller"
import { CreateView } from "@/modules/views/server"
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
  switch (req.method) {
    case "POST":
      const session = await getSession({ req })
      const view = await CreateView(req.body.contentId, session?.user.id!)
      return SuccessAPIResponse(res, view)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

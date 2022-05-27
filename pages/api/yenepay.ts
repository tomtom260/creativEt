import { createNewRoom, getAllRooms } from "@/modules/chat/server/controller"
import { CreateView } from "@/modules/views/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      console.log(req.query)
      return
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

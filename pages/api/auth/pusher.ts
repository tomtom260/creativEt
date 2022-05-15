/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import Pusher from "pusher"
import pusher from "@/utils/pusher"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.id!
  switch (req.method) {
    case "POST":
      const socketId = req.body.socket_id
      const channel = req.body.channel_name
      const session = await getSession({ req })
      const presenceData = {
        user_id: session?.user?.id!,
        user_info: { ...session?.user },
      }
      const authResponse = pusher.authorizeChannel(
        socketId,
        channel,
        presenceData
      )
      return res.send(authResponse)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

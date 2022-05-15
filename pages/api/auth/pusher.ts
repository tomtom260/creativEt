/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import Pusher from "pusher"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.id!

  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    key: process.env.NEXT_PUBLIC_KEY!,
    secret: process.env.NEXT_PUBLIC_SECRET!,
    cluster: process.env.NEXT_PUBLIC_CLUSTER!,
    useTLS: process.env.NEXT_PUBLIC_FORCETLS,
  })
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

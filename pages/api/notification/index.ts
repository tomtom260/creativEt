import { getNotifcations } from "@/modules/notification/server"
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
      const notifications = await getNotifcations(session?.user.id)
      return SuccessAPIResponse(res, notifications)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

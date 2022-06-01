import { dismissNotifcationController } from "@/modules/notification/controller"
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
    case "PATCH":
      const notification = await dismissNotifcationController(req.query.id)
      return SuccessAPIResponse(res, notification)
    default:
      wrongRequestMethodError(res, ["GET", "PATCH"])
  }
}

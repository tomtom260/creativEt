import { getUsersForHIre } from "@/modules/user/server"
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
      SuccessAPIResponse(
        res,
        await getUsersForHIre(
          session?.user.id,
          req.query.filter,
          req.query.query
        )
      )
      break
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

import { getUsersForHIre } from "@/modules/user/server"
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
    case "GET":
      SuccessAPIResponse(res, await getUsersForHIre())
      break
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

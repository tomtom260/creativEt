import { searchUsers } from "modules/user/server"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    username: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const { username } = req.query
  switch (req.method) {
    case "GET":
      const users = await searchUsers(username)
      return SuccessAPIResponse(res, users)

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

import { getBoughtContents } from "modules/content/server"
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
  const userId = session?.user?.id!

  let contents = []
  switch (req.method) {
    case "GET":
      contents = await getBoughtContents(userId)
      return SuccessAPIResponse(res, contents)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

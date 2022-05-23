import { getContents, getLikedContents } from "modules/content/server"
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
  switch (req.method) {
    case "GET":
      const contents = await getContents(
        userId,
        req.query.creatorId,
        req.query.tag,
        req.query.filter
      )
      return SuccessAPIResponse(res, contents)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

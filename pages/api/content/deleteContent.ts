import { deleteContent } from "@/modules/content/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.id!

  switch (req.method) {
    case "DELETE":
      await deleteContent(req.query.id as string)
      return SuccessAPIResponse(res, {})
    default:
      wrongRequestMethodError(res, ["DELETE"])
  }
}

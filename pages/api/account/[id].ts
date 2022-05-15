import { getUserWithProfile } from "modules/user/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  ErrorAPIResponse,
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    id?: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    throw {
      message: "unauthorized",
      status: "error",
      statusCode: 401,
    }
  }
  switch (req.method) {
    case "GET":
      const { id } = req.query
      const user = await getUserWithProfile(id, session.user.id)
      return SuccessAPIResponse(res, user)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

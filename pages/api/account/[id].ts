import { NextApiRequest, NextApiResponse } from "next"
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
  switch (req.method) {
    case "GET":
      const { id } = req.query
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          Profile: true,
        },
      })

      if (!user) {
        return ErrorAPIResponse(res, `User with that id ${id} not found`)
      }
      return SuccessAPIResponse(res, user)

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

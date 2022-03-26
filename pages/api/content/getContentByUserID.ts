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
  switch (req.method) {
    case "GET":
      const { userId, take } = req.query
      const contents = await prisma?.content.findMany({
        include: {
          likes: true,
        },
        where: {
          userId: userId as string,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
        take: take ? Number(take) : undefined,
      })
      return SuccessAPIResponse(res, contents!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

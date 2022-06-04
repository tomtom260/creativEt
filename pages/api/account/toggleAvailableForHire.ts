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
  const id = session?.user?.id!

  switch (req.method) {
    case "PATCH":
      console.log("d")

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      const userObj = await prisma.user.update({
        where: {
          id,
        },
        data: {
          availableForHire: !user?.availableForHire,
        },
      })
      return SuccessAPIResponse(res, userObj)
    default:
      wrongRequestMethodError(res, ["PATCH"])
  }
}

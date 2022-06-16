import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: {
    username: string | undefined
  }
}

export default async function checkifUsernameExists(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { username } = req.body
      if (!username) {
        return res.status(400).json({
          message: "No Username",
        })
      }

      const user = await prisma.profile.findFirst({
        where: {
          username,
        },
      })

      if (user) {
        return res.status(200).json({
          message: "Username Already Exists",
        })
      }
      return res.status(200).json({
        message: "Username Valid",
      })
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: {
    email: string | undefined
  }
}

export default async function checkifEmailExists(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { email } = req.body
      if (!email) {
        return res.status(400).json({
          message: "No Email",
        })
      }

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (user) {
        return res.status(200).json({
          message: "Email Already Exists",
        })
      }

      return res.status(200).json({
        message: "Email Valid",
      })
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

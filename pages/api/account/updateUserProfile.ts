import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: {
    image?: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  switch (req.method) {
    case "POST":
      const { image } = req.body
      if (image) {
        const user = await prisma.user.update({
          where: {
            email: session?.user?.email!,
          },
          data: {
            image,
          },
        })
        return res.status(200).json({ user })
      }
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

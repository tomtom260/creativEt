import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"
import bcrypt from "bcryptjs"
import { updateEmail } from "@/modules/user/server"
import moment from "moment"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    token: string
    id: string
    email: string
    verTokenid: string
  }
}

export default async function checkifEmailExists(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { token, id, email, verTokenid } = req.query
      const verificationToken = await prisma.verificationToken.findFirst({
        where: {
          id: verTokenid,
        },
      })

      console.log(verificationToken)

      let isValid = false
      if (verificationToken) {
        isValid = bcrypt.compareSync(token, verificationToken.token)
      }

      if (isValid) {
        await updateEmail(id, email)
        return res.redirect("/account/general?message=success")
      } else {
        return res.redirect("/account/general?message=invalid_token")
      }

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

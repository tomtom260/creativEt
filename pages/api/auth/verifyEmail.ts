import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"
import bcrypt from "bcryptjs"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    token: string
    accountId: string
  }
}

export default async function checkifEmailExists(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { token, accountId } = req.query
      const account = await prisma.account.findFirst({
        where: {
          id: accountId,
        },
      })
      let isValid = false
      if (account?.verificationToken) {
        isValid = bcrypt.compareSync(token, account?.verificationToken)
      }

      if (isValid) {
        await prisma.user.update({
          where: {
            id: account?.userId,
          },
          data: {
            emailVerified: new Date(),
          },
        })
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account?.provider!,
              providerAccountId: account?.providerAccountId!,
            },
          },
          data: {
            verificationToken: null,
          },
        })
        return res.redirect("/auth/signin")
      }

      return res.redirect("/api/auth/error?message=invalid_verification_token")

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

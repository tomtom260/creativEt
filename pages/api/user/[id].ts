import {
  deleteAccountController,
  updateEmailAndUsernameController,
  updatePasswordController,
} from "@/modules/user/controller"
import { deleteAccount, getUsersForHIre } from "@/modules/user/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  ErrorAPIResponse,
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  switch (req.method) {
    case "PATCH":
      if (req.body.email || req.body.username) {
        SuccessAPIResponse(
          res,
          await updateEmailAndUsernameController(
            session?.user.id,
            req.body.email,
            req.body.username
          )
        )
      } else {
        const message = await updatePasswordController(
          session?.user.id,
          req.body.oldPassword,
          req.body.newPassword
        )
        if (message === "wrong password") {
          return ErrorAPIResponse(res, message)
        }
        SuccessAPIResponse(res, {})
      }
      break
    case "DELETE":
      SuccessAPIResponse(res, await deleteAccountController(session?.user.id))
      break
    default:
      wrongRequestMethodError(res, ["PATCH", "DELETE"])
  }
}

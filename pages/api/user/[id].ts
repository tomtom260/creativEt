import { updateEmailAndUsernameController } from "@/modules/user/controller"
import { getUsersForHIre } from "@/modules/user/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
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
      SuccessAPIResponse(
        res,
        await updateEmailAndUsernameController(
          session?.user.id,
          req.body.email,
          req.body.username
        ) 
      )
      break
    default:
      wrongRequestMethodError(res, ["PATCH"])
  }
}

import { resetPasswordController } from "@/modules/user/controller"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  body: {
    password: string
    email: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return SuccessAPIResponse(
        res,
        await resetPasswordController(req.body.email, req.body.password)
      )

    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

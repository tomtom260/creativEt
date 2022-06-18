import { forgetPasswordController } from "@/modules/user/controller"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  body: {
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
        await forgetPasswordController(req.body.email)
      )

    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

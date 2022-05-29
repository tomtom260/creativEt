import { createJobController } from "@/modules/jobs/controller"
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
    case "POST":
      const job = createJobController(req.body)
      return SuccessAPIResponse(res, job)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

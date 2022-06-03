import { createJobController } from "@/modules/jobs/controller"
import { getJobs } from "@/modules/jobs/server"
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
  switch (req.method) {
    case "POST":
      const job = await createJobController(req.body)
      return SuccessAPIResponse(res, job)
    case "GET":
      console.log(req.query)
      const jobs = await getJobs(req.query)
      return SuccessAPIResponse(res, jobs)
    default:
      wrongRequestMethodError(res, ["POST", "GET"])
  }
}

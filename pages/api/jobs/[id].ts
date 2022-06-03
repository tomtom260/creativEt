import { getJobsById } from "@/modules/jobs/server"
import { TJOb } from "@/modules/jobs/types"
import { NextApiRequest, NextApiResponse } from "next"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const job = await getJobsById(req.query.id as string)
      return SuccessAPIResponse(res, job as TJOb)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

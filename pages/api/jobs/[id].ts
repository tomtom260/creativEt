import {
  acceptJobController,
  finishJobController,
  rejectJobController,
  reviseContentJobController,
  successJobController,
} from "@/modules/jobs/controller"
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
      return SuccessAPIResponse(
        res,
        (await getJobsById(req.query.id as string)) as TJOb
      )
    case "PATCH":
      switch (Object.keys(req.query).filter((key) => key !== "id")[0]) {
        case "accept":
          return SuccessAPIResponse(
            res,
            await acceptJobController(req.query.id as string)
          )
        case "reject":
          return SuccessAPIResponse(
            res,
            await rejectJobController(req.query.id as string)
          )
        case "finish":
          return SuccessAPIResponse(
            res,
            await finishJobController(req.query.id as string, req.body.image)
          )
        case "success":
          return SuccessAPIResponse(
            res,
            await successJobController(req.query.id as string)
          )
        case "revise":
          return SuccessAPIResponse(
            res,
            await reviseContentJobController(req.query.id as string)
          )
      }
      break

    default:
      wrongRequestMethodError(res, ["GET", "PATCH"])
  }
}

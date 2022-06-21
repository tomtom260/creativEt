import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.id!
  console.log(req.query.id)
  let contents = []

  switch (req.method) {
    case "PATCH":
      const contentId = req.query.contentId
      const reportId = req.query.reportId
      const action = req.query.action
      await prisma.content.update({
        where: {
          id: contentId,
        },
        data: {
          deleted: true
        },
      })
      console.log(reportId)
    
      await prisma.report.update({
        where: {
          id: reportId,
        }, 
        data: {
          resolved: action
        }
      })

      return SuccessAPIResponse(res, { msg: "successfully acted on report" })
    // break

    default:
      wrongRequestMethodError(res, ["PATCH"])
  }
}

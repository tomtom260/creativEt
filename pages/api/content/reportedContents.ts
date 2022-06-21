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
    case "GET":
      // await removeContent(req.query.id as string, req.query.reportId as string)
      // await prisma.content.update({
      //   where: {
      //     id: req.query.id as string,
      //   },
      //   data: {
      //     deleted: true
      //   },
      // })

      switch(req.query.filter){
        case "REMOVED":
          contents = await prisma.report.findMany({
            where: {
              resolved: "REMOVED"
            },
            include: {
              // reportedBy: true,
              contentReported: true,
            }
          })
          break
          case "DISMISSED":
          contents = await prisma.report.findMany({
            where: {
              resolved: "ALLOWED"
            },
            include: {
              // reportedBy: true,
              contentReported: true,
            }
          })
          break

        case "PENDING":
          contents = await prisma.report.findMany({
            // by: ['contentId'],
            where: {
              resolved: "PENDING"
            },
            include: {
              // reportedBy: true,
              contentReported: true,
            }
          })
          break
        
          default:
          contents = await prisma.report.findMany({
            // where: {
            //   resolved: "ALLOWED"
            // },
            // by: ['contentId'],
            include: {
              // contentId: true,
              // reportedBy: true,
              contentReported: true,
            }
          })
      }
      // contents = await prisma.report.findMany({
        
      //   include: {
      //       reportedBy: true,
      //       contentReported: true,
      //   }
      // })
      return SuccessAPIResponse(res, contents)
      // break

    case "PATCH":
      const contentId = req.query.contentId
      const description = req.query.description
      
        await prisma.report.upsert({
          where: {
            contentId,
          },
          update: {
            reportCount: {increment: 1}
          },
          create: {
            contentId,
            description
          }
        })
      
      return SuccessAPIResponse(res, {msg: "successfully added to report"})
      // break
      
      
    default:
      wrongRequestMethodError(res, ["PATCH"])
  }
} 

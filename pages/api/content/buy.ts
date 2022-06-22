/* eslint-disable no-case-declarations */
import { createNotifcationController } from "@/modules/notification/controller"
import { createMoneyTransaction } from "@/modules/walet/server"
import { MoneyTransactionStatus, MoneyTransactionType } from "@prisma/client"
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

  switch (req.method) {
    case "GET":
      const contentId = req.query.contentId as string
      const content = await prisma?.content.findUnique({
        where: {
          id: contentId,
        },
        include: {
          createdBy: true,
        },
      })
      if (!content) {
        throw {
          statusCode: 400,
          status: "error",
          message: "not found",
        }
      }
      const transaction = await prisma.transaction.create({
        data: {
          sellerId: content.createdBy.id,
          buyerId: userId,
          amount: content.price,
          contentId: content.id,
        },
      })
      createNotifcationController({
        title: "Buy",
        userId: transaction.sellerId,
        type: "BOUGHT",
        notifiedById: transaction.buyerId,
      })
      createMoneyTransaction({
        amount: content.price,
        userId: content.createdBy.id,
        type: MoneyTransactionType.DEPOSIT,
        description: `Sold ${content.title} `,
        status: MoneyTransactionStatus.SUCCESS,
      })
      createMoneyTransaction({
        amount: content.price,
        userId,
        type: MoneyTransactionType.WITHDRAW,
        description: `Bought ${content.title} `,
        status: MoneyTransactionStatus.SUCCESS,
      })
      return SuccessAPIResponse(res, transaction!)
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

import { boostContent, deleteContent } from "@/modules/content/server"
import { createMoneyTransaction } from "@/modules/walet/server"
import { MoneyTransactionStatus, MoneyTransactionType } from "@prisma/client"
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
    case "GET":
      const content = await boostContent(req.query.id as string)
      await createMoneyTransaction({
        amount: 50,
        type: MoneyTransactionType.WITHDRAW,
        description: `Boosted ${content.content.title}`,
        userId: session?.user.id!,
        status: MoneyTransactionStatus.SUCCESS,
      })
      return SuccessAPIResponse(res, {})
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

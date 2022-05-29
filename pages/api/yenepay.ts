import { createNewRoom, getAllRooms } from "@/modules/chat/server/controller"
import { CreateView } from "@/modules/views/server"
import { updateMoneyTransaction } from "@/modules/walet/server"
import { MoneyTransactionStatus } from "@/modules/walet/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../utils/apiResponses"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      console.log(req.query.status)
      updateMoneyTransaction({
        id: req.query.MerchantOrderId as string,
        status:
          req.query.Status === "Paid"
            ? MoneyTransactionStatus.SUCCESS
            : req.query.Status === "Canceled"
            ? MoneyTransactionStatus.CANCELED
            : MoneyTransactionStatus.PENDING,
      })
      return res.redirect("/account/wallet")
    default:
      wrongRequestMethodError(res, ["GET"])
  }
}

import { CreateView } from "@/modules/views/server"
import { transferMoney } from "@/modules/walet/controller"
import { TransferMoney } from "@/modules/walet/types"
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
      const result = await transferMoney({
        ...req.body,
        userId: session?.user.id,
      })
      return SuccessAPIResponse(res, result.data.result)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}

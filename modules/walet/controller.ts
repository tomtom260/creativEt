import { sendMoneyAPI } from "./api"
import { createMoneyTransaction } from "./server"
import { TransferMoney, MoneyTransactionType } from "./types"

export async function transferMoney(data: TransferMoney) {
  const transaction = await createMoneyTransaction(data)
  return await sendMoneyAPI({
    id: transaction.id,
    amount: transaction.amount,
    type: data.type,
    merchantId:
      data.type === MoneyTransactionType.DEPOSIT ? "SB1607" : data.merchantId,
  })
}

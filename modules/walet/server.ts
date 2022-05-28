import { prisma } from "@/utils/db"
import { MoneyTransaction } from "@prisma/client"

export async function createMoneyTransaction({
  amount,
  description,
  userId,
  type,
}: Pick<MoneyTransaction, "amount" | "description" | "userId" | "type">) {
  return await prisma.moneyTransaction.create({
    data: {
      amount,
      description,
      userId,
      type,
    },
  })
}

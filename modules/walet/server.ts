import { prisma } from "@/utils/db"
import { MoneyTransaction } from "@prisma/client"
import { MoneyTransactionStatus } from "./types"

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

export async function updateMoneyTransaction({
  id,
  status,
}: {
  id: string
  status: MoneyTransactionStatus
}) {
  console.log("idd", id, status)
  return await prisma.moneyTransaction.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

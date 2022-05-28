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
  return await prisma.moneyTransaction.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

export async function getMoneyTransaction({ userId }: { userId: string }) {
  return await prisma.moneyTransaction.findMany({
    where: {
      userId,
      status: {
        not: MoneyTransactionStatus.PENDING,
      },
    },
  })
}

import { prisma } from "@/utils/db"
import { MoneyTransaction, MoneyTransactionStatus } from "@prisma/client"

export async function createMoneyTransaction({
  amount,
  description,
  userId,
  type,
  status = MoneyTransactionStatus.PENDING,
}: Pick<MoneyTransaction, "amount" | "description" | "userId" | "type"> & {
  status?: MoneyTransaction["status"]
}) {
  return await prisma.moneyTransaction.create({
    data: {
      amount,
      description,
      userId,
      type,
      status,
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

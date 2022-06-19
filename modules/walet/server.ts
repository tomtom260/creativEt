import { prisma } from "@/utils/db"
import {
  MoneyTransaction,
  MoneyTransactionStatus,
  MoneyTransactionType,
} from "@prisma/client"
import moment from "moment"

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

export async function getRevenueGroupedDay(userId: string) {
  const data: {
    close: number
    date: string
  }[] = []
  await (
    await prisma.moneyTransaction.findMany({
      where: {
        userId,
        status: MoneyTransactionStatus.SUCCESS,
        type: MoneyTransactionType.DEPOSIT,
        description: {
          not: "Deposit",
        },
      },
    })
  ).forEach((trans) => {
    const date = moment(trans.transactionAt).format(" YYYY-MMM-DD")
    const index = data.findIndex((datum) => datum.date === date)
    if (index === -1) {
      data.push({
        date,
        close: trans.amount,
      })
    } else {
      data[index].close += trans.amount
    }
  })
  return data
}

export async function getTotalRevenueLastMonth(userId: string) {
  return (
    await prisma.moneyTransaction.findMany({
      where: {
        userId,
        status: MoneyTransactionStatus.SUCCESS,
        type: MoneyTransactionType.DEPOSIT,
        transactionAt: {
          lte: moment().startOf("month").toDate(),
        },
        description: {
          not: "Deposit",
        },
      },
    })
  ).reduce((acc, red) => {
    return acc + red.amount
  }, 0)
}

export async function getTotalRevenue(userId: string) {
  return (
    await prisma.moneyTransaction.findMany({
      where: {
        userId,
        status: MoneyTransactionStatus.SUCCESS,
        type: MoneyTransactionType.DEPOSIT,
        description: {
          not: "Deposit",
        },
      },
    })
  ).reduce((acc, red) => {
    return acc + red.amount
  }, 0)
}

export async function getRevenueFromContent(userId: string) {
  return (
    await prisma.moneyTransaction.findMany({
      where: {
        userId,
        status: MoneyTransactionStatus.SUCCESS,
        type: MoneyTransactionType.DEPOSIT,
        description: {
          contains: "Sold",
        },
      },
    })
  ).reduce((acc, red) => {
    return acc + red.amount
  }, 0)
}

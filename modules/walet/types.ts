import { MoneyTransaction } from "@prisma/client"

export enum MoneyTransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

export enum MoneyTransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  CANCELED = "CANCELED",
}

export type TCreateMoneyTransaction = Pick<
  MoneyTransaction,
  "amount" | "description" | "userId"
>

export type TransferMoney =
  | ({
      type: MoneyTransactionType.DEPOSIT
    } & TCreateMoneyTransaction)
  | ({
      type: MoneyTransactionType.WITHDRAW
    } & TCreateMoneyTransaction & {
        merchantId: string
      })

export type TransferMoneyClient = Omit<TransferMoney, "userId">

export type TDepositMoney = {
  type: MoneyTransactionType.DEPOSIT
} & Pick<MoneyTransaction, "amount" | "id">

export type TWithdrawMoney = {
  type: MoneyTransactionType.WITHDRAW
} & Pick<MoneyTransaction, "amount" | "id"> & {
    merchantId: string
  }

export type TYenepayApi = Pick<MoneyTransaction, "amount" | "id" | "type"> & {
  merchantId: string
}

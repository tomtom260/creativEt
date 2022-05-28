import { useMutation } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createMoneyTransactionAPI } from "./api"

export function useMoneyTransaction(options?: CustomUseMutationOptions) {
  return useMutation(createMoneyTransactionAPI, options)
}

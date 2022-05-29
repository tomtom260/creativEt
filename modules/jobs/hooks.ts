import { useMutation } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createJobAPI } from "./api"

export function useCreateJobMutatation(options?: CustomUseMutationOptions) {
  return useMutation(createJobAPI, options)
}

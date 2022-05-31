import { useGetCurrentUser } from "@/hooks/user"
import { useMutation, useQuery } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createNotifcationsAPI, getNotifcationsAPI } from "./api"

export function useCreateNotifictionMutatation(
  options?: CustomUseMutationOptions
) {
  return useMutation(createNotifcationsAPI, options)
}

export function useGetNotifictionsQuery() {
  const id = useGetCurrentUser().data?.id
  return useQuery(["notifications"], () => getNotifcationsAPI(id as string))
}

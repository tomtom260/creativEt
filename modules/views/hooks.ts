import { useMutation, useQueryClient } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createViewApi } from "./api"

export function useCreateViewMutation(
  contentId: string,
  options?: CustomUseMutationOptions
) {
  const queryClient = useQueryClient()
  return useMutation(() => createViewApi(contentId), {
    onSuccess: (res) =>
      queryClient.invalidateQueries(["content", res.data.data.contentId]),
    ...options,
  })
}

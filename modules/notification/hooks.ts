import { useGetCurrentUser } from "@/hooks/user"
import { Notification } from "@prisma/client"
import moment from "moment"
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  useQueries,
} from "react-query"
import { dismissNotifcationsAPI, getNotifcationsAPI } from "./api"
import { TGetNotifcation } from "./types"

export function useDismissNotifictionMutatation() {
  const queryClient = useQueryClient()
  return useMutation<UseMutationOptions<Notification>>(dismissNotifcationsAPI, {
    onSuccess: (notification) => {
      queryClient.setQueryData(["notifications", notification.id], notification)
    },
  })
}

export function useGetNotifictionsQuery() {
  const id = useGetCurrentUser().data?.id
  const notificationsQuery = useQuery<TGetNotifcation[]>(
    ["notifications"],
    () => getNotifcationsAPI(id as string),
    {
      select: (data) => {
        return data.sort((a, b) =>
          moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1
        )
      },
    }
  )
  return useQueries(
    (notificationsQuery.data || []).map((notification) => ({
      queryKey: ["notifications", notification.id],
      initialData: notification,
    }))
  )
}

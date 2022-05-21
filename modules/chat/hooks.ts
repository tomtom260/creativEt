import { transformUserResponse } from "@/api/user"
import { useGetCurrentUser } from "@/hooks/user"
import { useEffect, useState } from "react"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query"
import {
  createMessage,
  createRoom,
  getMessagesWithRoomId,
  toggleMessageSeen,
} from "./api"

export type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

export function useCreateMessageMutation(props?: CustomUseMutationOptions) {
  return useMutation(createMessage, props)
}

export function useGetMessagesWithRoomId(
  id: string,
  options?: UseQueryOptions
) {
  return useQuery(["room", id], () => getMessagesWithRoomId(id), {
    ...options,
  })
}

export function useCreateRoomMutation(props?: CustomUseMutationOptions) {
  return useMutation(createRoom, props)
}

export function useToggleMessageSeen(props?: CustomUseMutationOptions) {
  return useMutation(toggleMessageSeen, props)
}

export function useSendMessage({
  roomId,
  id,
}: {
  roomId: string
  id?: string
}) {
  useEffect(() => {
    setRoom(roomId)
  }, [roomId, id])

  const [room, setRoom] = useState(roomId)
  const { id: currentUserId } = useGetCurrentUser().data!

  const createMessageMutation = useCreateMessageMutation()
  const createRoomMutation = useCreateRoomMutation({
    onSuccess: (res: any) => {
      setRoom(res.data.data.id)
    },
  })
  const queryClient = useQueryClient()

  async function sendMessage(message: string) {
    if (!room) {
      await createRoomMutation.mutateAsync([currentUserId, id!]).then((res) => {
        createMessageMutation.mutateAsync({
          message,
          roomId: res.data.data.id!,
        })
      })
    } else {
      await createMessageMutation.mutateAsync({ message, roomId: room! })
    }
  }

  return sendMessage
}

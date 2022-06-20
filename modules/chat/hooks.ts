import { transformUserResponse } from "@/modules/user/api"
import { useGetCurrentUser } from "@/hooks/user"
import { useEffect, useState } from "react"
import {
  useMutation,
  UseMutationOptions,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query"
import {
  createMessage,
  createRoom,
  getMessage,
  getMessagesWithRoomId,
  toggleMessageSeen,
} from "./api"
import { Message } from "@prisma/client"

export type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

export function useCreateMessageMutation(props?: CustomUseMutationOptions) {
  return useMutation(createMessage, props)
}

export function useGetMessagesWithRoomId(id: string) {
  const room = useQuery(["room", id], () => getMessagesWithRoomId(id))
  return useQueries(
    (room.data || []).map((message) => ({
      queryKey: ["message", message.id],
      queryFn: () => getMessage({ id: message.id }),
      initialData: message,
    }))
  )
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

  const createMessageMutation = useCreateMessageMutation({
    onMutate(message: Message) {
      message.senderId = currentUserId
      const room = queryClient.getQueryData(["room", roomId])
      queryClient.setQueryData(["room", roomId], [...room, message])
    },
  })
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

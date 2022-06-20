import { transformUserResponse } from "@/modules/user/api"
import { useGetCurrentUser } from "@/hooks/user"
import { useEffect, useState } from "react"
import {
  useMutation,
  UseMutationOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "react-query"
import {
  createMessage,
  createRoom,
  getMessage,
  getMessagesWithRoomId,
  toggleMessageSeen,
} from "./api"
import { Message, Room } from "@prisma/client"
import { NewMessageDTO } from "./types"

export type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

export function useCreateMessageMutation(props?: CustomUseMutationOptions) {
  const { id: currentUserId } = useGetCurrentUser().data!
  const queryClient = useQueryClient()

  return useMutation(
    async ({ message, roomId }: { message: string; roomId: string }) => {
      const newMessage = {
        senderId: currentUserId,
        message,
        roomId,
      }

      await createMessage(newMessage)
    },
    {
      onMutate(message) {
        message.senderId = currentUserId
        message.id = message.message
        const room = queryClient.getQueryData<Room[]>(["room", message.roomId])!
        room.push(message as Message)
        console.log(room[room.length - 1])
        queryClient.setQueryData(["room", message.roomId], room)
      },
    }
  )
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

export function useToggleMessageSeen() {
  return useMutation(toggleMessageSeen)
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

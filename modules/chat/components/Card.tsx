import Badge from "@/components/Badge"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { PusherContext } from "@/hooks/pusher"
import { useGetCurrentUser } from "@/hooks/user"
import { Message, Prisma, Room } from "@prisma/client"
import moment from "moment"
import { useRouter } from "next/router"
import { Channel } from "pusher-js"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import {
  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetMessagesWithRoomId,
} from "../hooks"
import { ChatBoxProps, TTypingUser } from "./ChatBox"

type UserCardProps = {
  image: string
  name: string
  username: string
  searchString: string
  changeSelectedUser: (user: ChatBoxProps) => void
  id: string
  roomId?: string
  message?: Message
}

function Card({
  image,
  name,
  username,
  searchString,
  changeSelectedUser,
  id,
  roomId,
  message,
}: UserCardProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const pusherClient = useContext(PusherContext)
  const [typingUser, setTypingUser] = useState<TTypingUser | null>(null)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const { id: currentUserid, name: currentUserName } = useGetCurrentUser().data!
  const messagesQueries = useGetMessagesWithRoomId(roomId)
  const numberOfNewMessages = messagesQueries.filter(
    (messagesQuery) =>
      !messagesQuery.data.seen && messagesQuery.data.senderId !== currentUserid
  ).length

  let roomid = roomId

  const createRoomMutation = useCreateRoomMutation()

  useEffect(() => {
    const channel = pusherClient.subscribe(`presence-room-${roomId}`)
    channel.bind("message:new", function (message: Message) {
      const rooms = queryClient.getQueryData<
        Prisma.RoomGetPayload<{
          include: {
            members: true
            Message: true
          }
        }>[]
      >(["rooms"])
      if (rooms) {
        const roomIndex = rooms.findIndex((room) => room.id === message.roomId)
        if (roomIndex !== -1) {
          rooms[roomIndex].Message[0] = message
          queryClient.setQueryData(["rooms"], rooms)
        }
      }
    })
    channel.bind(
      "client-message:typing",
      function (typingUser: TTypingUser | null) {
        setTypingUser(typingUser)
      }
    )

    channel.bind("pusher:subscription_succeeded", function (members) {
      setIsOnline(members.count === 2)
    })
    channel.bind("pusher:member_added", function (member) {
      setIsOnline(true)
    })

    channel.bind("pusher:member_removed", function (member) {
      setIsOnline(false)
    })

    return () => channel.unsubscribe()
  }, [roomId])

  const time = moment(message?.createdAt)

  return (
    <div
      onClick={async () => {
        if (!roomId) {
          roomid = await (
            await createRoomMutation.mutateAsync([currentUserid, id])
          ).data.data.id
        }
        changeSelectedUser({
          name,
          image,
          roomId: roomid,
          id,
        })
        router.push(
          {
            pathname: `/chat`,
            query: { username },
          },
          undefined,
          {
            shallow: true,
          }
        )
      }}
      className="flex justify-between bg-white p-2"
    >
      <div className="flex gap-4">
        <div className="relative w-min ">
          <div className=" relative w-16 h-16 rounded-full ">
            <ImageWithSkeleton
              src={image}
              layout="fill"
              className="rounded-full"
            />
          </div>
          {isOnline && (
            <div className=" bg-secondary-dark border-2 absolute bottom-1 right-1.5 w-3 h-3 rounded-full overflow-hidden text-xl "></div>
          )}
        </div>
        <div className="flex flex-col">
          <Text
            className="!text-lg w-[10ch] truncate"
            varaint={TypographyVariant.H2}
          >
            {name}
          </Text>
          <Text className=" text-gray-normal" varaint={TypographyVariant.Body1}>
            <span className="text-secondary-dark font-medium">
              {searchString.toLowerCase()}
            </span>
            {typingUser
              ? "typing"
              : message?.message ||
                username.toLowerCase().replace(searchString.toLowerCase(), "")}
          </Text>
        </div>
      </div>
      <div className="flex-col justify-between flex items-end">
        <Text className="font-semibold mt-1" varaint={TypographyVariant.Body2}>
          {time.isSame(new Date(), "day")
            ? time.format("h:mm A")
            : time.isAfter(moment().subtract(7, "day"))
            ? time.format("ddd")
            : time.format("M/D/YYYY")}
        </Text>
        {numberOfNewMessages ? <Badge count={numberOfNewMessages} /> : null}
      </div>
    </div>
  )
}

export default Card

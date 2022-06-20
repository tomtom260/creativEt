import Badge from "@/components/Badge"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { PusherContext } from "@/hooks/pusher"
import { useGetCurrentUser } from "@/hooks/user"
import { Message } from "@prisma/client"
import { useRouter } from "next/router"
import { Channel } from "pusher-js"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { ChatBoxProps, TTypingUser } from "./ChatBox"

type UserCardProps = {
  image: string
  name: string
  username: string
  searchString: string
  changeSelectedUser: (user: ChatBoxProps) => void
  id: string
  roomId: string
}

function Card({
  image,
  name,
  username,
  searchString,
  changeSelectedUser,
  id,
  roomId,
}: UserCardProps) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const pusherClient = useContext(PusherContext)
  const typingRef = useRef<Channel>({} as Channel)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<TTypingUser | null>(null)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const { id: currentUserid, name: currentUserName } = useGetCurrentUser().data!

  useEffect(() => {
    const channel = pusherClient.subscribe(`presence-room-${roomId}`)
    channel.bind("message:new", function (message: Message) {
      const room = queryClient.getQueryData<Message[]>(["room", roomId])
      if (room) {
        const newMessageIndex = room.findIndex(
          (mess) =>
            mess.id === mess.message &&
            message.senderId === mess.senderId &&
            message.message === mess.message &&
            message.roomId === mess.roomId
        ) as number
        if (newMessageIndex !== -1) {
          console.log(newMessageIndex)
          room[newMessageIndex] = message
        } else {
          room.push(message)
        }
        queryClient.setQueryData(["room", roomId], room)
      }
    })

    typingRef.current = channel.bind(
      "client-message:typing",
      function (typingUser: TTypingUser | null) {
        setTypingUser(typingUser)
      }
    )

    channel.bind("pusher:subscription_succeeded", function (members) {
      setIsOnline(members.count === 2)
      console.log(members)
    })
    channel.bind("pusher:member_added", function (member) {
      // console.log(Object.keys(channel.members.members).includes(id))
      setIsOnline(true)
    })

    channel.bind("pusher:member_removed", function (member) {
      // console.log(Object.keys(channel.members.members).includes(id))
      setIsOnline(false)
    })

    channel.bind("message:seen", function (message: TMessage) {
      const seenMessage = queryClient.getQueryData<TMessage>([
        "message",
        message.id,
      ])
      if (seenMessage) {
        seenMessage.seen = true
        queryClient.invalidateQueries(["message", message.id])
      }
    })

    return () => channel.unsubscribe()
  }, [roomId])

  useEffect(() => {
    if (typingRef.current.subscribed) {
      if (isTyping) {
        typingRef.current.trigger("client-message:typing", {
          senderId: currentUserid,
          name: currentUserName,
        } as TTypingUser)
      } else {
        typingRef.current.trigger("client-message:typing", "false")
      }
    }
  }, [isTyping])

  return (
    <div
      onClick={() => {
        changeSelectedUser({
          name,
          image,
          roomId,
          id,
        })
        router.replace({
          pathname: `/chat`,
          query: { username },
        })
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
          <div className=" bg-emerald-800 absolute bottom-2 right-2 w-3 h-3 rounded-full overflow-hidden text-xl "></div>
        </div>
        <div className="flex flex-col">
          <Text
            className="!text-xl w-[3ch] overflow-ellipsis"
            varaint={TypographyVariant.H2}
          >
            {name}
          </Text>
          <Text className="text-gray-dark" varaint={TypographyVariant.Body2}>
            <span className="text-secondary-dark font-medium">
              {searchString.toLowerCase()}
            </span>
            {username.toLowerCase().replace(searchString.toLowerCase(), "")}
          </Text>
        </div>
      </div>
      <div className="flex-col justify-between flex items-end">
        <Text className="font-semibold" varaint={TypographyVariant.Body2}>
          9:00 AM
        </Text>
        <Badge count={4} />
      </div>
    </div>
  )
}

export default Card

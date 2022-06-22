import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import MessageInput from "@/modules/chat/components/MessageInput"
import Message from "@/modules/chat/components/Message"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { DotsVerticalIcon, SearchIcon } from "@heroicons/react/outline"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useGetMessagesWithRoomId, useSendMessage } from "../hooks"
import { useGetCurrentUser } from "@/hooks/user"
import { useRouter } from "next/router"
import { Message as TMessage } from "@prisma/client"
import { PusherContext } from "@/hooks/pusher"
import { useQueryClient } from "react-query"
import { Channel } from "pusher-js"
import moment from "moment"

export type TTypingUser = {
  senderId: string
  name: string
}

export type ChatBoxProps = {
  name: string
  image: string
  roomId: string
  id: string
}

function ChatBox({ name, image, id, roomId }: ChatBoxProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesQueries = useGetMessagesWithRoomId(roomId)
  const { id: currentUserid, name: currentUserName } = useGetCurrentUser().data!
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<TTypingUser | null>(null)
  const [isOnline, setIsOnline] = useState<boolean>(false)

  const sendMessage = useSendMessage({
    roomId,
    id,
  })

  const messageBoxRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  useEffect(() => {
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
  }, [messagesQueries])
  const router = useRouter()

  const queryClient = useQueryClient()
  const pusherClient = useContext(PusherContext)
  const typingRef = useRef<Channel>({} as Channel)

  useEffect(() => {
    const channel = pusherClient.subscribe(`presence-room-${roomId}`)
    channel.bind("message:new", function (message: TMessage) {
      const room = queryClient.getQueryData<TMessage[]>(["room", roomId])
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

    // return () => channel.unsubscribe()
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
      className={` flex-col flex-1 ${
        router.query.username ? "flex" : "hidden md:flex"
      } `}
    >
      <div className="flex gap-4 px-2 bg-slate-100 justify-between items-center">
        <div className="flex gap-4 h-[70px] items-center ">
          <div className="relative w-14  h-14 rounded-full overflow-hidden">
            <ImageWithSkeleton src={image} layout="fill" />
          </div>
          <div className="flex flex-col">
            <Text varaint={TypographyVariant.H2}>{name}</Text>
            <Text
              className="text-gray-normal"
              varaint={TypographyVariant.Body2}
            >
              {typingUser
                ? `${typingUser.name} is typing`
                : isOnline
                ? "Online"
                : "last seen recently"}
            </Text>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => {
              console.log("clicked")
            }}
            variant={ButtonVariants.ICON}
          >
            <SearchIcon className="text-gray-normal w-7 h-7" />
          </Button>
          <Button
            onClick={() => {
              console.log("clicked")
            }}
            variant={ButtonVariants.ICON}
          >
            <DotsVerticalIcon className="text-gray-normal w-7 h-7" />
          </Button>
        </div>
      </div>
      <div className="bg-white   h-[calc(100vh)] md:h-[calc(100vh-192px)]   md:rounded-xl md:px-4 md:pt-0 p-2 col-span-8 md:col-span-5 w-full flex flex-col">
        <div
          ref={messageBoxRef}
          className="flex flex-col overflow-auto pt-2 pb-4 md:pt-4 gap-4"
        >
          {messagesQueries
            .map((messagesQuery) => messagesQuery.data as TMessage)
            .map(({ message, id, createdAt, senderId, seen }) => (
              <Message
                key={id || message}
                id={id}
                message={message}
                type={senderId === currentUserid ? "Sent" : "Recieved"}
                time={createdAt}
                image={image}
                seen={seen}
              />
            ))}
        </div>
        <div className="flex flex-1 gap-4 mt-4  items-end">
          <MessageInput
            label=""
            value={newMessage}
            onChange={(val) => setNewMessage(val)}
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                setNewMessage("")
                sendMessage(newMessage)
              }
            }}
            onFocus={() => {
              setIsTyping(true)
            }}
            onBlur={() => {
              setIsTyping(false)
            }}
          />
          <Button
            className="text-white mb-1 flex-shrink-0 !pb-4 bg-secondary-normal hover:!bg-secondary-dark p-2 !w-12 !h-12 rotate-45"
            onClick={() => {
              sendMessage(newMessage)
              setNewMessage("")
            }}
            variant={ButtonVariants.ICON}
          >
            <PaperAirplaneIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox

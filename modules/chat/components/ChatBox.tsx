import React, { useEffect, useRef, useState } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import moment from "moment"
import MessageInput from "@/modules/chat/components/MessageInput"
import Message, { MessageProps } from "@/modules/chat/components/Message"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { DotsVerticalIcon, SearchIcon } from "@heroicons/react/outline"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useGetMessagesWithRoomId, useSendMessage } from "../hooks"
import { useGetCurrentUser } from "@/hooks/user"
import { useRouter } from "next/router"

export type ChatBoxProps = {
  name: string
  image: string
  roomId: string
  id: string
}

function ChatBox({ name, image, id, roomId }: ChatBoxProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesQuery = useGetMessagesWithRoomId(roomId)
  const { id: currentUserid } = useGetCurrentUser().data

  const sendMessage = useSendMessage({
    roomId,
    id,
  })

  const messageBoxRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  useEffect(() => {
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
  }, [messagesQuery])
  const router = useRouter()

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
              last seen recently
            </Text>
          </div>
        </div>
        <div className="flex">
          <Button onClick={() => {}} variant={ButtonVariants.ICON}>
            <SearchIcon className="text-gray-normal w-7 h-7" />
          </Button>
          <Button onClick={() => {}} variant={ButtonVariants.ICON}>
            <DotsVerticalIcon className="text-gray-normal w-7 h-7" />
          </Button>
        </div>
      </div>
      <div className="bg-white   h-[calc(100vh)] md:h-[calc(100vh-192px)]   md:rounded-xl md:px-4 md:pt-0 p-2 col-span-8 md:col-span-5 w-full flex flex-col">
        <div
          ref={messageBoxRef}
          className="flex flex-col overflow-auto pt-2 md:pt-4 gap-4"
        >
          {messagesQuery.data &&
            messagesQuery.data.map(({ message, id, createdAt, senderId }) => (
              <Message
                key={message.id}
                id={message.id}
                message={message}
                type={senderId === currentUserid ? "Sent" : "Recieved"}
                time={createdAt}
                image={image}
                seen={message.seen}
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
                sendMessage(newMessage)
              }
            }}
          />
          <Button
            className="text-white mb-1 flex-shrink-0 !pb-4 bg-secondary-normal hover:bg-secondary-normal p-2 !w-12 !h-12 rotate-45"
            onClick={() => sendMessage(newMessage)}
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

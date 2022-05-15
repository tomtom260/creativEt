import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import DefaultLayout from "@/layouts/DefaultLayout"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import Card from "modules/chat/components/Card"
import Message, { MessageProps } from "modules/chat/components/Message"
import MessageInput from "modules/chat/components/MessageInput"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useState } from "react"
import moment from "moment"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { DotsVerticalIcon, SearchIcon } from "@heroicons/react/outline"

function Chat() {
  console.log()
  const [search, setSearch] = useState("")
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      message: "dfjgnkjfd",
      type: "Recieved",
      time: moment(moment.now()).format("HH:mm A"),
      id: 445,
    },
    {
      message: "dfjgnkjfd",
      type: "Sent",
      time: moment(moment.now() - 1100000000000).format("HH:mm A"),
      id: 58,
    },
  ])

  function sendMessage(message: string) {
    setMessages([
      ...messages,
      {
        message,
        type: "Sent",
        time: moment(moment.now()).format("HH:mm A"),
        id: Math.random() * 10000,
      },
    ])
    setSearch("")
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-y-4 bg-gray-light md:p-4">
        <div className="hidden md:flex gap-x-10 px-2">
          <SearchInput
            label=""
            className="w-min"
            value={search}
            onChange={(val) => setSearch(val)}
          />
          <div className="flex gap-4 justify-between items-center flex-1">
            <div className="flex gap-4">
              <div className="relative w-14  h-14 rounded-full overflow-hidden">
                <ImageWithSkeleton
                  src="https://lh3.googleusercontent.com/a/AATXAJxxsj5_nasdaBu5jQwXqgCusNJt9v8lSDl2eKU-=s96-c"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col">
                <Text varaint={TypographyVariant.H2}>Yeab G</Text>
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
        </div>
        <div className="flex gap-x-6">
          <div className="hidden flex-shrink-0 min-w-[280px] md:flex flex-col  px-2 ">
            <div className=" divide-y-2  rounded-xl overflow-hidden ">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div className="bg-white rounded-xl md:px-4 md:pt-4 p-0 col-span-8 md:col-span-5 w-full flex flex-col">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <Message key={message.id} {...message} />
              ))}
            </div>
            <div className="flex flex-1 gap-4  items-end">
              <MessageInput
                label=""
                value={search}
                onChange={(val) => setSearch(val)}
                onKeyPress={(e) => {
                  console.log(e)
                  if (e.code === "Enter") {
                    sendMessage(search)
                  }
                }}
              />
              <Button
                className="text-white mb-1 flex-shrink-0 !pb-4 bg-secondary-normal hover:bg-secondary-normal p-2 !w-12 !h-12 rotate-45"
                onClick={() => sendMessage(search)}
                variant={ButtonVariants.ICON}
              >
                <PaperAirplaneIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Chat

import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"

export type MessageProps = {
  type: "Sent" | "Recieved"
  message: string
  time: string
  id: number
}

function Message({ type, message, time }: MessageProps) {
  const isSentMessage = type === "Sent"
  return (
    <div
      className={`flex  gap-3 ${isSentMessage ? "self-end text-white" : ""} `}
    >
      {/* <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <ImageWithSkeleton
          src="https://lh3.googleusercontent.com/a/AATXAJxxsj5_nasdaBu5jQwXqgCusNJt9v8lSDl2eKU-=s96-c"
          layout="fill"
        />
      </div> */}
      <div
        className={` ${
          isSentMessage
            ? "bg-secondary-light  rounded-tr-none "
            : "bg-gray-light rounded-tl-none"
        } px-4 py-2 max-w-md rounded-xl  flex flex-col `}
      >
        <Text varaint={TypographyVariant.Body1}>{message}</Text>
        <Text
          className={`${
            isSentMessage ? "text-white" : "text-gray-dark"
          }  self-end`}
          varaint={TypographyVariant.Body2}
        >
          {time}
        </Text>
      </div>
    </div>
  )
}

export default Message

import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useGetCurrentUser } from "@/hooks/user"
import { CheckIcon, ClockIcon } from "@heroicons/react/outline"
import moment from "moment"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useToggleMessageSeen } from "../hooks"

export type MessageProps = {
  type: "Sent" | "Recieved"
  message: string
  time: Date
  image: string
  seen: boolean
  id: string
}

function Message({ type, message, time, image, seen, id }: MessageProps) {
  const isSentMessage = type === "Sent"
  const currentUserImage = useGetCurrentUser().data!.image
  const toggleMessageSeenMutation = useToggleMessageSeen()
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  })
  const [eventFired, setIsEventFired] = useState(false)

  if (inView && !seen && !isSentMessage && !eventFired) {
    setIsEventFired(true)
    toggleMessageSeenMutation.mutate({
      id,
    })
  }

  const decreptedMessage = CryptoJS.AES.decrypt(
    message,
    process.env.NEXT_PUBLIC_SECRET
  ).toString(CryptoJS.enc.Utf8)

  return (
    <div
      ref={ref}
      className={`flex   gap-3 ${
        isSentMessage ? "self-end flex-row-reverse text-white" : ""
      } `}
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <ImageWithSkeleton
          src={isSentMessage ? currentUserImage : image}
          layout="fill"
        />
      </div>
      <div
        className={` ${
          isSentMessage
            ? "bg-secondary-light  rounded-tr-none "
            : "bg-gray-light rounded-tl-none"
        } px-4 py-2 max-w-md rounded-xl  flex flex-col `}
      >
        <Text varaint={TypographyVariant.Body1}>{decreptedMessage}</Text>
        <div className="flex gap-2 self-end items-end justify-end ">
          <Text
            className={`${
              isSentMessage ? "text-white" : "text-gray-dark"
            }  self-end`}
            varaint={TypographyVariant.Body2}
          >
            {moment(time).format("h:mm A")}
          </Text>
          {isSentMessage && (
            <>
              {!time ? (
                <ClockIcon className="h-4 w-4 " />
              ) : !seen ? (
                <CheckIcon className="h-4 w-4 " />
              ) : (
                <div className="flex">
                  <CheckIcon className="h-4 w-4 " />
                  <CheckIcon className="h-4 w-4 -ml-[19px] " />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message

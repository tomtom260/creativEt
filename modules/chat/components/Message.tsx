import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useGetCurrentUser } from "@/hooks/user"
import { CheckIcon, ClockIcon } from "@heroicons/react/outline"
import moment from "moment"
import React from "react"
import { useInView } from "react-intersection-observer"
import { useToggleMessageSeen } from "../hooks"

export type MessageProps = {
  type: "Sent" | "Recieved"
  message: string
  time: string
  image: string
  seen: boolean
  id
}

function Message({ type, message, time, image, seen, id }: MessageProps) {
  const isSentMessage = type === "Sent"
  const currentUserImage = useGetCurrentUser().data!.image
  const toggleMessageSeenMutation = useToggleMessageSeen()

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  })

  // if (!seen && !isSentMessage) {
  //   if (inView) {
  //     toggleMessageSeenMutation.mutate({
  //       id,
  //     })
  //   }
  // }

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
        <Text varaint={TypographyVariant.Body1}>{message}</Text>
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
              <ClockIcon className="h-4 w-4 " />
              <CheckIcon className="h-4 w-4 " />
              <div className="flex">
                <CheckIcon className="h-4 w-4 " />
                <CheckIcon className="h-4 w-4 -ml-[19px] " />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message

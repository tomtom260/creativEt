import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { Prisma } from "@prisma/client"
import moment from "moment"
import React from "react"
import ImageWithSkeleton from "../../../components/ImageWithSkeleton"
import { useDismissNotifictionMutatation } from "../hooks"
import { TGetNotifcation } from "../types"
import classNames from "@/utils/classNames"

function NotificationCard({ notification }: { notification: TGetNotifcation }) {
  const dismissNotificationMutatation = useDismissNotifictionMutatation()
  return (
    <div
      className={classNames(
        "flex gap-2 md:gap-6 p-3",
        notification.seen ? " text-gray-dark" : " text-black "
      )}
    >
      <div className=" rounded-full relative overflow-hidden h-8 w-8 md:h-14 md:w-14 flex-shrink-0">
        <ImageWithSkeleton
          src={notification.job?.employer.image as string}
          layout="fill"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Text varaint={TypographyVariant.Body1}>
            <span className="font-bold ">
              {notification.job?.employer.name}
            </span>{" "}
            offered you a <span className="font-bold">job</span>
          </Text>
          <div className="flex gap-3 items-center">
            <Text varaint={TypographyVariant.Body2}>
              {moment(notification.job?.createdAt).fromNow()}
            </Text>
            <Text className="hidden md:block" varaint={TypographyVariant.Body1}>
              {notification.job?.title as string}
            </Text>
          </div>
        </div>
      </div>
      {!notification.seen && (
        <Text
          className="self-end underline cursor-pointer underline-offset-2 text-secondary-light"
          varaint={TypographyVariant.Body2}
          onClick={() =>
            dismissNotificationMutatation.mutate(notification.id as string)
          }
        >
          Dismiss
        </Text>
      )}
    </div>
  )
}

export default React.memo(NotificationCard)

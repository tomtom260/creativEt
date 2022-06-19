import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { NotificationType, Prisma } from "@prisma/client"
import moment from "moment"
import React from "react"
import ImageWithSkeleton from "../../../components/ImageWithSkeleton"
import { useDismissNotifictionMutatation } from "../hooks"
import { TGetNotifcation } from "../types"
import classNames from "@/utils/classNames"

export function selectMessage(type: NotificationType) {
  switch (type) {
    case NotificationType.JOB:
      return (
        <>
          offered you a <span className="font-bold">job</span>`
        </>
      )
    case NotificationType.MESSAGE:
      return (
        <>
          sent you a new <span className="font-bold">message</span>`
        </>
      )
  }
}

function NotificationCard({
  notification,
  isToast = false,
}: {
  notification: TGetNotifcation
  isToast?: boolean
}) {
  const dismissNotificationMutatation = useDismissNotifictionMutatation()
  return (
    <div
      className={classNames(
        `flex gap-2 md:gap-6 ${isToast ? "p-0" : "p-3"}`,
        notification.seen ? " text-gray-dark" : " text-black "
      )}
    >
      <div className=" rounded-full relative overflow-hidden h-8 w-8 md:h-14 md:w-14 flex-shrink-0">
        {notification?.notifiedBy?.image && (
          <ImageWithSkeleton
            src={notification.notifiedBy.image as string}
            layout="fill"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          {
            <Text varaint={TypographyVariant.Body1}>
              <span className="font-bold ">{notification.notifiedBy.name}</span>{" "}
              {selectMessage(notification.type)}
            </Text>
          }
          <div className="flex gap-3 items-center">
            <Text varaint={TypographyVariant.Body2}>
              {moment(notification.createdAt).fromNow()}
            </Text>
            {/* <Text className="hidden md:block" varaint={TypographyVariant.Body1}>
              {notification.job?.title as string}
            </Text> */}
          </div>
        </div>
      </div>
      {!notification.seen && !isToast && (
        <Text
          className="self-end underline cursor-pointer underline-offset-2 text-secondary-light"
          varaint={TypographyVariant.Body2}
          onClick={() => dismissNotificationMutatation.mutate(notification.id)}
        >
          Dismiss
        </Text>
      )}
    </div>
  )
}

export default React.memo(NotificationCard)

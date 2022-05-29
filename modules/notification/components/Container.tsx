import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"
import NotificationCard from "./NotificationCard"

function NotificationContainer() {
  return (
    <div className="flex flex-col w-full bg-white border rounded-3xl px-8 py-6 ">
      <Text varaint={TypographyVariant.H2}>Notifications</Text>
      <div className="flex flex-col divide-y-2 gap-3 mt-6">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  )
}

export default NotificationContainer

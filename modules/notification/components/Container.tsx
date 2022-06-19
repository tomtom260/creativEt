import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"
import { useGetNotifictionsQuery } from "../hooks"
import NotificationCard from "./NotificationCard"

function NotificationContainer() {
  const notifications = useGetNotifictionsQuery().map(
    (notifQuery) => notifQuery.data!
  )

  return (
    <div className="relative w-1/4 max-h-96 overflow-hidden">
      <div
        className="flex fixed flex-col bg-white border rounded-3xl 
        h-full  w-fit  min-w-[350px] max-w-[550px] max-h-96 top-20 right-40 pl-8 py-6
        "
      >
        <Text varaint={TypographyVariant.H2}>Notifications</Text>
        <div className="flex overflow-y-auto  flex-col  divide-y-2 gap-3 pr-4 mt-6">
          {notifications.map((not) => (
            <NotificationCard notification={not} key={not.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(NotificationContainer)

import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"
import ImageWithSkeleton from "../../../components/ImageWithSkeleton"

function NotificationCard() {
  return (
    <div className="flex gap-6 p-3 ">
      <div className="bg-red-700 rounded-full h-14 w-14 flex-shrink-0">
        {/* <ImageWithSkeleton /> */}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Text
            className="md:whitespace-nowrap "
            varaint={TypographyVariant.Body1}
          >
            <span className="font-bold ">Thomas Mesfin</span> offered you a{" "}
            <span className="font-bold">job</span>
          </Text>
          <div className="flex gap-3 items-center">
            <Text varaint={TypographyVariant.Body2}>3h ago</Text>
            <Text varaint={TypographyVariant.Body1}>Axum</Text>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant={ButtonVariants.PRIMARY}>Accept</Button>
          <Button variant={ButtonVariants.OUTLINED}>Reject</Button>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard

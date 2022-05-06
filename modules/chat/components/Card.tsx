import Badge from "@/components/Badge"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"

function Card() {
  return (
    <div className="flex justify-between bg-white p-2">
      <div className="flex gap-4">
        <div className="relative w-min ">
          <div className=" relative w-16 h-16 rounded-full ">
            <ImageWithSkeleton
              src={
                "https://res.cloudinary.com/dlqzrhr6r/image/upload/v1648297324/profile/22-223968_default-profile-picture-circle-hd-png-download_xrlhqm.png"
              }
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className=" bg-emerald-800 absolute bottom-2 right-2 w-3 h-3 rounded-full overflow-hidden text-xl "></div>
        </div>
        <div className="flex flex-col">
          <Text className="!text-xl" varaint={TypographyVariant.H2}>
            Thomas
          </Text>
          <Text className="text-gray-dark" varaint={TypographyVariant.Body2}>
            Hey There
          </Text>
        </div>
      </div>
      <div className="flex-col justify-between flex items-end">
        <Text className="font-semibold" varaint={TypographyVariant.Body2}>
          9:00 AM
        </Text>
        <Badge count={4} />
      </div>
    </div>
  )
}

export default Card

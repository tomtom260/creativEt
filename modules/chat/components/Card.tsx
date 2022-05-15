import Badge from "@/components/Badge"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useRouter } from "next/router"
import React from "react"
import { ChatBoxProps } from "./ChatBox"

type UserCardProps = {
  image: string
  name: string
  username: string
  searchString: string
  changeSelectedUser: (user: ChatBoxProps) => void
}

function Card({
  image,
  name,
  username,
  searchString,
  changeSelectedUser,
}: UserCardProps) {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        changeSelectedUser({
          name,
          image,
        })
        router.replace({
          pathname: `/message`,
          query: { username },
        })
      }}
      className="flex justify-between bg-white p-2"
    >
      <div className="flex gap-4">
        <div className="relative w-min ">
          <div className=" relative w-16 h-16 rounded-full ">
            <ImageWithSkeleton
              src={image}
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className=" bg-emerald-800 absolute bottom-2 right-2 w-3 h-3 rounded-full overflow-hidden text-xl "></div>
        </div>
        <div className="flex flex-col">
          <Text
            className="!text-xl w-[3ch] overflow-ellipsis"
            varaint={TypographyVariant.H2}
          >
            {name}
          </Text>
          <Text className="text-gray-dark" varaint={TypographyVariant.Body2}>
            <span className="text-secondary-dark font-medium">
              {searchString}
            </span>
            {username.replace(searchString, "")}
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

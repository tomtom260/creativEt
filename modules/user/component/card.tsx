import React, { ReactNode } from "react"
import { Content } from "types/content"
import ImageWithSkeleton from "../ImageWithSkeleton"
import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/router"

export type CardsProps = {
  content: Content
  loading?: boolean
  captionDetail: ReactNode
  hoverComponent?: ReactNode
  backSide?: ReactNode
  isFlipped?: boolean
}

const Card = ({
  loading = false,
  content,
  captionDetail,
  hoverComponent,
  isFlipped = false,
  backSide,
}: CardsProps) => {
  const { id, createdBy, image } = content

  const router = useRouter()

  return (
    <div className="max-w-[400px] min-w-[280px]  w-full  flex flex-col">
      <div className="group  w-full  h-[380px] sm:h-[250px] lg:h-[220px] relative bg-white">
        {loading ? (
          <Skeleton height="100%" width="100" />
        ) : !isFlipped ? (
          <ImageWithSkeleton
            onClick={() => {
              router.push(`/${createdBy.username}/${id}`)
            }}
            src={image}
            className=" rounded-lg hover:cursor-pointer overflow-hidden"
            layout="fill"
          />
        ) : (
          backSide
        )}

        {hoverComponent}
      </div>
      {captionDetail}
    </div>
  )
}

Card.displayName = "Card"

export default Card

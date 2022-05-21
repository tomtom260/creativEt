import { useGetBest3ContentsQuery } from "@/api/content"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import { useInView } from "react-intersection-observer"
import React, { useEffect, useState } from "react"
import { Content } from "types/content"
import EyeSVG from "../../assets/icons/EyeOn"
import HeartFilledSVG from "../../assets/icons/HeartFilled"
import Button from "../Button"
import ButtonVariants from "../Button/button.enum"
import ImageWithSkeleton from "../ImageWithSkeleton"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import useContentService from "@/service/content"
import { useFollowUserMutation, useUnfollowUserMutation } from "@/hooks/user"
import { useQuery } from "react-query"
import { fetchUserWithProfile } from "@/api/user"
import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/router"
import { useCreateViewMutation } from "@/modules/views/hooks"

export type CardsProps = {
  content: Content
  loading?: boolean
}

function Cards({
  loading = false,
  content: {
    createdBy,
    title,
    image,
    totalLikes,
    views,
    id,
    isLikedByCurrentUser,
  },
}: CardsProps) {
  const createdByQuery = useQuery(
    ["user", createdBy.id],
    () => fetchUserWithProfile(createdBy.id),
    {
      initialData: { data: { data: createdBy } },
    }
  )

  const [isCardSeen, setIsCardSeen] = useState<boolean>(false)
  const [getBest3ContentsQueryEnabled, setGetBest3ContentsQueryEnabled] =
    useState(false)

  const getBest3ContentsQuery = useGetBest3ContentsQuery(createdBy.id, {
    enabled: getBest3ContentsQueryEnabled,
  })

  const { onContentLiked, onContentDisliked } = useContentService()
  const createViewMutation = useCreateViewMutation(id)

  const ownerImageURL = getOptimisedProfileImage(createdBy.image)

  const onLikePress: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    isLikedByCurrentUser ? onContentDisliked(id) : onContentLiked(id)
    e.stopPropagation()
  }

  const { ref, inView } = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (inView) {
      setIsCardSeen(true)
    }
  }, [inView])

  useEffect(() => {
    if (isCardSeen) {
      createViewMutation.mutate(id)
    }
  }, [isCardSeen])

  const followMutation = useFollowUserMutation(createdBy.id)
  const unfollowMutation = useUnfollowUserMutation(createdBy.id)

  const onFollowButtonCliked = () => {
    createdByQuery.data.isFollowedByCurrentUser
      ? unfollowMutation.mutate(createdBy.id)
      : followMutation.mutate(createdBy.id)
  }
  const router = useRouter()

  if (!createdByQuery.data) return null

  return (
    <div
      ref={ref}
      onClick={() => {
        router.push(`/${createdBy.username}/${id}`)
      }}
      className="w-[375px]  flex flex-col"
    >
      <div className="group hover:cursor-pointer w-full h-[275px] relative bg-white">
        {loading ? (
          <Skeleton height="100%" />
        ) : (
          <ImageWithSkeleton
            src={image}
            className=" rounded-lg overflow-hidden"
            layout="fill"
          />
        )}
        <div className="absolute flex flex-col-reverse bottom-0 w-full h-20 z-1 group-hover:bg-gradient-to-t  from-gray-dark">
          <div className="hidden group-hover:flex flex-row m-4 justify-between items-center">
            <Text
              className="text-white font-semibold mt-px"
              varaint={TypographyVariant.Body1}
            >
              {title}
            </Text>
            <div>
              <Button
                variant={ButtonVariants.ICON}
                onClick={onLikePress}
                className={`w-8 h-8 ${
                  isLikedByCurrentUser
                    ? "text-secondary-light "
                    : "text-gray-normal"
                } bg-white rounded-md flex items-center justify-center`}
              >
                <HeartFilledSVG />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Skeleton className="mt-4 h-6" />
      ) : (
        <div className="flex justify-between items-center mt-2 px-2">
          <div className="flex flex-col relative group">
            <div
              onMouseEnter={() => {
                setGetBest3ContentsQueryEnabled(true)
              }}
              className="flex flex-row items-center focus:cursor-pointer z-10"
            >
              <div className="relative w-[25px] h-[25px]">
                <ImageWithSkeleton
                  layout="fill"
                  className="rounded-full"
                  src={ownerImageURL}
                />
              </div>
              <Text
                className="mb-1 ml-3 font-medium cursor-pointer"
                varaint={TypographyVariant.Body1}
              >
                {createdBy.name}
              </Text>
            </div>
            <div className="pt-6 absolute">
              <div
                className={`hidden group-hover:flex bg-white shadow-md mt-6  rounded-2xl w-[400px] min-h-[200px] p-5 flex-col z-10 relative`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div className="w-[60px] h-[60px] relative">
                      <ImageWithSkeleton
                        src={ownerImageURL}
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col mx-3">
                      <Text
                        varaint={TypographyVariant.H2}
                        className="font-semibold mt-3"
                      >
                        {createdBy.name}
                      </Text>
                      <Text
                        varaint={TypographyVariant.Body1}
                        className="font-thin text-gray-normal"
                      >
                        {createdBy.location}
                      </Text>
                    </div>
                  </div>
                  <Button
                    onClick={onFollowButtonCliked}
                    // appendComponent={<PlusSVG />}
                    className={`${
                      createdByQuery.data.isFollowedByCurrentUser
                        ? "bg-secondary-normal"
                        : "bg-gray-light"
                    } `}
                    variant={ButtonVariants.PRIMARY}
                  >
                    {createdByQuery.data.isFollowedByCurrentUser
                      ? "Following"
                      : "Follow"}
                  </Button>
                </div>
                <div className="grid grid-cols-3 h-full gap-5 mt-5">
                  {getBest3ContentsQuery.isFetching ? (
                    <p>Fetcghing</p>
                  ) : (
                    getBest3ContentsQuery.data?.map((content) => (
                      <div
                        key={content.id}
                        className="relative w-[106px] h-[82px]"
                      >
                        <ImageWithSkeleton
                          src={content.image}
                          alt=""
                          layout="fill"
                          className="rounded-md"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center mr-1">
              <Button
                title="Like this content?"
                className={`mx-1 ${
                  isLikedByCurrentUser
                    ? "text-secondary-light"
                    : "text-gray-normal"
                } 
             `}
                onClick={() => {}}
                variant={ButtonVariants.ICON}
              >
                <HeartFilledSVG />
              </Button>
              <Text className="" varaint={TypographyVariant.Body2}>
                {`${totalLikes}`}
              </Text>
            </div>
            <div className="flex items-center">
              <div className="mx-1 text-gray-normal">
                <Button onClick={() => {}} variant={ButtonVariants.ICON}>
                  <EyeSVG />
                </Button>
              </div>
              <Text className="" varaint={TypographyVariant.Body2}>
                {`${views}`}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards

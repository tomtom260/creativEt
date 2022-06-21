import { useGetBest3ContentsQuery } from "@/modules/content/api"
import { fetchUserWithProfile, transformUserResponse } from "@/modules/user/api"
import EyeOnSVG from "@/assets/icons/EyeOn"
import HeartFilledSVG from "@/assets/icons/HeartFilled"
import useContentService from "@/service/content"
import {
  getOptimisedProfileImage,
  getResponsiveImage,
} from "@/utils/cloudinary"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Content } from "types/content"
import { CardsProps } from "./BaseCard"
import Button from "../Button"
import ButtonVariants from "../Button/button.enum"
import ImageWithSkeleton from "../ImageWithSkeleton"
import Skeleton from "../Skeleton"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import Cards from "./BaseCard"
import {
  useFollowUserMutation,
  useGetCurrentUser,
  useUnfollowUserMutation,
} from "@/hooks/user"
import { useInView } from "react-intersection-observer"
import { useCreateViewMutation } from "@/modules/views/hooks"
import Link from "next/link"

function ContentCard({
  content,
  loading,
}: Pick<CardsProps, "loading" | "content">) {
  const { views, id, isLikedByCurrentUser, createdBy, title, totalLikes } =
    useQuery(["content", content.id]).data as Content

  const { onContentDisliked, onContentLiked } = useContentService()
  const onLikePress: React.MouseEventHandler<HTMLButtonElement> = () => {
    isLikedByCurrentUser ? onContentDisliked(id) : onContentLiked(id)
  }

  const { id: currentUserId } = useGetCurrentUser().data!

  const createdByQuery = useQuery(
    ["user", createdBy.id],
    () => fetchUserWithProfile(createdBy.id),
    {
      initialData: { data: { data: createdBy } },
      select: transformUserResponse,
    }
  )

  const [getBest3ContentsQueryEnabled, setGetBest3ContentsQueryEnabled] =
    useState(false)

  const getBest3ContentsQuery = useGetBest3ContentsQuery(createdBy.id, {
    enabled: getBest3ContentsQueryEnabled,
  })

  const ownerImageURL = getOptimisedProfileImage(createdBy.image)

  const followMutation = useFollowUserMutation(createdBy.id, content.id)
  const unfollowMutation = useUnfollowUserMutation(createdBy.id, content.id)

  const onFollowButtonCliked = () => {
    createdByQuery.data.isFollowedByCurrentUser
      ? unfollowMutation.mutate(createdBy.id)
      : followMutation.mutate(createdBy.id)
  }
  const [isCardSeen, setIsCardSeen] = useState<boolean>(false)

  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  })
  const createViewMutation = useCreateViewMutation(id)

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

  return (
    <Cards
      ref={ref}
      loading={loading}
      content={content}
      hoverComponent={
        <>
          <div className="absolute left-4 top-4 px-2 bg-[rgba(255,255,255,0.5)] text-black opacity-70  ">
            <Text
              className="font-extrabold  tracking-wider"
              varaint={TypographyVariant.Body1}
            >
              <span className="text-2xl">
                {content.price
                  .toFixed(2)
                  .split(".")
                  .map((e, i) => {
                    if (i == 1) {
                      return <span className="!text-base">{e}</span>
                    } else {
                      return <span>{e}.</span>
                    }
                  })}
              </span>
              ETB
            </Text>
          </div>
          {content.isBoosted && !loading && (
            <div className="z-10 absolute right-4 top-4 px-2 bg-secondary-normal  opacity-70  ">
              <Text
                className="font-extrabold  tracking-wider text-white "
                varaint={TypographyVariant.Body1}
              >
                BOOSTED
              </Text>
            </div>
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
        </>
      }
      captionDetail={
        loading ? (
          <Skeleton className="mt-4 h-6" />
        ) : (
          <div className="flex justify-between items-center mt-2 pl-1 pr-2">
            <div className="flex flex-col relative group">
              <div
                onMouseEnter={() => {
                  setGetBest3ContentsQueryEnabled(true)
                }}
                className="flex  items-center focus:cursor-pointer z-10"
              >
                <div className="relative w-[25px] h-[25px]">
                  <ImageWithSkeleton
                    layout="fill"
                    className="rounded-full"
                    src={ownerImageURL}
                  />
                </div>
                <Link href={`/${createdBy.username}`} passHref>
                  <Text
                    className="ml-3 whitespace-nowrap !w-[15ch] flex-shrink   text-ellipsis font-medium cursor-pointer"
                    varaint={TypographyVariant.Body1}
                  >
                    {createdBy.name}
                  </Text>
                </Link>
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
                        <Link href={`/${createdBy.username}`} passHref>
                          <Text
                            varaint={TypographyVariant.H2}
                            className="font-semibold cursor-pointer line-clamp-1 mt-3"
                          >
                            {createdBy.name}
                          </Text>
                        </Link>
                        <Text
                          varaint={TypographyVariant.Body1}
                          className="font-thin line-clamp-1 text-gray-normal"
                        >
                          {createdBy.location}
                        </Text>
                      </div>
                    </div>
                    {currentUserId !== createdBy.id && (
                      <Button
                        onClick={onFollowButtonCliked}
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
                    )}
                  </div>
                  <div className="grid grid-cols-3 h-full gap-5 mt-5">
                    {getBest3ContentsQuery.isLoading
                      ? Array(3)
                          .fill("")
                          .map((_, i) => <Skeleton key={i} height={82} />)
                      : getBest3ContentsQuery.data?.map((content) => (
                          <div
                            key={content.id}
                            className="relative w-[106px] h-[82px]"
                          >
                            <ImageWithSkeleton
                              src={getOptimisedProfileImage(content.image)}
                              alt=""
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center mr-1">
                <Button
                  title="Like this content?"
                  className={`mx-1 !h-5 !w-5 ${
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
                <div className="mx-1  text-gray-normal">
                  <Button
                    className="!h-5 !w-5"
                    onClick={() => {}}
                    variant={ButtonVariants.ICON}
                  >
                    <EyeOnSVG />
                  </Button>
                </div>
                <Text className="" varaint={TypographyVariant.Body2}>
                  {`${views}`}
                </Text>
              </div>
            </div>
          </div>
        )
      }
    />
  )
}

export default ContentCard

import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch } from "@/hooks/redux"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import Link from "next/link"
import React from "react"
import { ModalType, showModal } from "store/modalSlice"
import { User } from "types/user"

type UserCardProps = {
  name: string
  description: string
  id: string
  username: string
  image: string
  location?: string
  rating: number
  numberOfJobs: number
}

function UserCard({ user }: { user: User }) {
  const image = getOptimisedProfileImage(user.image)
  const dispatch = useAppDispatch()
  return (
    <div className=" px-4 md:px-12 py-8 w-full overflow-hidden flex flex-col md:flex-row gap-7 hover:scale-[1.01] transition-transform duration-50   justify-between rounded-2xl shadow-2xl">
      <div className="flex flex-col xs:flex-row  gap-3">
        <div className="relative self-center xs:self-start w-16 md:w-32 overflow-hidden flex-shrink-0 h-16 md:h-32 rounded-full">
          <ImageWithSkeleton layout="fill" src={image} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2  items-start">
            <Text className="" varaint={TypographyVariant.H2}>
              {user.name}
            </Text>
            <div className="flex  space-x-3 items-start">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-md font-bold text-amber-400">
                  {user.rating}
                </p>
              </div>
              <p className="text-sm text-cPurple line-clamp-2 truncate overflow-ellipsis w-[20ch]">
                {user.numberOfJobs} jobs completed
              </p>
            </div>
          </div>
          {user.location && (
            <Text className="mt-4" varaint={TypographyVariant.Body1}>
              {user.location}
            </Text>
          )}
          {user.bio && (
            <Text
              className="mt-2 line-clamp-3 !text-sm  flex-shrink "
              varaint={TypographyVariant.Body2}
            >
              {user.bio}
            </Text>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-shrink-0  gap-2">
        <Link passHref href={``}>
          <Button
            onClick={() => {
              dispatch(
                showModal({
                  modalType: ModalType.HIRE_MODAL,
                  payload: {
                    userId: user.id,
                  },
                })
              )
            }}
            variant={ButtonVariants.PRIMARY}
          >
            Hire
          </Button>
        </Link>
        <Link passHref href={`${user.username}`}>
          <Button
            className="!w-full"
            onClick={() => {}}
            variant={ButtonVariants.OUTLINED}
          >
            View Profile
          </Button>
        </Link>
        <Link passHref href={`chat?username=${user.username}`}>
          <Button
            className="!w-full"
            onClick={() => {}}
            variant={ButtonVariants.OUTLINED}
          >
            Message
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserCard

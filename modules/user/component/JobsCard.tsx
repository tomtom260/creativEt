import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Skeleton from "react-loading-skeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import classNames from "@/utils/classNames"
import { DotsVerticalIcon, XCircleIcon } from "@heroicons/react/solid"
import React, { Dispatch, SetStateAction } from "react"
import { TJOb } from "@/modules/jobs/types"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import Jobs from "pages/account/jobs"
import moment from "moment"

type JobsProps = {
  flippedCard: string | null
  isLoading?: boolean
  setIsFlipped: Dispatch<SetStateAction<string | null>>
  job: TJOb
}

function JobsCard({
  job,
  flippedCard,
  setIsFlipped,
  isLoading = false,
}: JobsProps) {
  const optimisedImage = getOptimisedProfileImage(job.employer.image as string)
  const dueIn = moment(job.dueIn)

  return isLoading ? (
    <div className="w-full min-h-[330px] h-full">
      <Skeleton height="100%" width={"100%"} />
    </div>
  ) : (
    <div className="flex relative flex-col w-full  px-8 py-8 items-center justify-between shadow-2xl rounded-3xl flex-wrap ">
      {flippedCard !== job.id ? (
        <>
          <Skeleton height="100%" width="100%" />
          <div className="flex w-full flex-col mb-4">
            <div className="flex">
              <div className="flex w-full gap-4">
                <div className="bg-red-900  relative w-16 h-16 self-start flex-shrink-0 rounded-full overflow-hidden">
                  <ImageWithSkeleton src={optimisedImage} layout="fill" />
                </div>
                <Text varaint={TypographyVariant.H2}>{job.title}</Text>
              </div>
              <Button
                className="!h-8 !w-8 "
                onClick={() => setIsFlipped(job.id)}
                variant={ButtonVariants.ICON}
              >
                <DotsVerticalIcon />
              </Button>
            </div>
            <Text className="font-bold mt-2" varaint={TypographyVariant.Body1}>
              {job.employer.name}
            </Text>
          </div>
          <Text varaint={TypographyVariant.Body1}>{job.description}</Text>

          <div className="flex justify-between w-full my-4">
            <div className="flex flex-col">
              <Text varaint={TypographyVariant.Body2}>Price</Text>
              <Text varaint={TypographyVariant.H1}>
                {job.price.toString()} ETB
              </Text>
            </div>
            <div className="flex flex-col">
              <Text varaint={TypographyVariant.Body2}>Due In</Text>
              <Text
                className={
                  dueIn.isBefore(moment(Date.now()))
                    ? "text-red-600"
                    : dueIn.isBetween(
                        moment(Date.now()),
                        moment(Date.now()).add("1", "d")
                      )
                    ? "text-amber-300"
                    : ""
                }
                varaint={TypographyVariant.H2}
              >
                {dueIn.fromNow()}
              </Text>
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <Button variant={ButtonVariants.PRIMARY}>Finish</Button>
            <p
              className={classNames(
                "inline-flex rounded-full px-3 py-1 text-sm bg-green-100 text-green-800 font-semibold leading-5"
              )}
            >
              {job.status}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col  gap-5 w-full">
          <Button
            className="!h-8 !w-8 self-end text-gray-normal "
            onClick={() => setIsFlipped(null)}
            variant={ButtonVariants.ICON}
          >
            <XCircleIcon />
          </Button>
          <Text
            className=" -mt-4 mb-4 text-center cursor-pointer    "
            varaint={TypographyVariant.H2}
          >
            Options
          </Text>
          <Text
            className=" text-red-600 cursor-pointer    "
            varaint={TypographyVariant.Body1}
          >
            Cancel Gig
          </Text>
          <Text
            className=" cursor-pointer    "
            varaint={TypographyVariant.Body1}
          >
            Report
          </Text>
        </div>
      )}
    </div>
  )
}

export default JobsCard

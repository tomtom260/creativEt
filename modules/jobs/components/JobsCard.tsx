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
import {
  useAcceptJobMutation,
  useCancelJobMutation,
  useRejectJobMutation,
} from "@/modules/jobs/hooks"
import { JobsStatus } from "@prisma/client"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"
import { useGetCurrentUser } from "@/hooks/user"

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
  const acceptJobMutattion = useAcceptJobMutation()
  const rejectJobMutattion = useRejectJobMutation()
  const cancelJobMutattion = useCancelJobMutation()
  const dispatch = useAppDispatch()
  const user = useGetCurrentUser().data!

  return isLoading ? (
    <div className="w-full min-h-[330px] h-full">
      <Skeleton height="100%" width={"100%"} />
    </div>
  ) : (
    <div className="flex relative flex-col w-full  px-8 py-8 items-center justify-between shadow-2xl rounded-3xl flex-wrap ">
      {flippedCard !== job.id ? (
        <>
          <div className="flex w-full flex-col mb-4">
            <div className="flex">
              <div className="flex w-full gap-4">
                <div className="relative w-16 h-16 self-start flex-shrink-0 rounded-full overflow-hidden">
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
              <Text varaint={TypographyVariant.Body2}>
                {job.status === JobsStatus.SUCCESS ? "Completed At" : "Due In"}
              </Text>
              <Text
                className={
                  job.status !== JobsStatus.SUCCESS &&
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
                {job.status === JobsStatus.SUCCESS
                  ? moment(job.updatedAt).fromNow()
                  : dueIn.fromNow()}
              </Text>
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-2">
              {job.status === JobsStatus.PENDING &&
              user?.id === job.employeeId ? (
                <>
                  <Button
                    onClick={() => {
                      acceptJobMutattion.mutate(job.id)
                    }}
                    variant={ButtonVariants.PRIMARY}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => {
                      rejectJobMutattion.mutate(job.id)
                    }}
                    className="text-red-600"
                    variant={ButtonVariants.OUTLINED}
                  >
                    Reject
                  </Button>
                </>
              ) : job.status === JobsStatus.IN_PROGRESS &&
                user?.id === job.employeeId ? (
                <Button
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: ModalType.FINISH_MODAL,
                        payload: job,
                      })
                    )
                  }}
                  variant={ButtonVariants.PRIMARY}
                >
                  Finish
                </Button>
              ) : job.status === JobsStatus.SUBMITTED &&
                user?.id === job.employerId ? (
                <Button
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: ModalType.PREVIEW_MODAL,
                        payload: job,
                      })
                    )
                  }}
                  variant={ButtonVariants.PRIMARY}
                >
                  Preview
                </Button>
              ) : null}
            </div>
            <p
              className={classNames(
                "inline-flex rounded-full px-3 py-1 text-sm  font-semibold leading-5",
                "bg-amber-100 text-amber-800",
                job.status === JobsStatus.SUCCESS
                  ? "!bg-green-100 !text-green-800"
                  : "",
                job.status === JobsStatus.CANCELED
                  ? "!bg-red-100 !text-red-800"
                  : ""
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
          {job.status !== JobsStatus.CANCELED &&
            job.status !== JobsStatus.SUCCESS && (
              <Text
                onClick={() => {
                  cancelJobMutattion.mutate({
                    id: job.id,
                    userId: user.id,
                  })
                }}
                className=" text-red-600 cursor-pointer    "
                varaint={TypographyVariant.Body1}
              >
                Cancel Gig
              </Text>
            )}
          {/* <Text
            className=" cursor-pointer    "
            varaint={TypographyVariant.Body1}
          >
            Report
          </Text> */}
        </div>
      )}
    </div>
  )
}

export default JobsCard

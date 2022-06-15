import { DotsVerticalIcon, XCircleIcon } from "@heroicons/react/solid"
import React, { SetStateAction, Dispatch } from "react"
import Cards, { CardsProps } from "./BaseCard"
import Skeleton from "../Skeleton"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"
import { useGetCurrentUser } from "@/hooks/user"

type MyContentProps = {
  flippedCard: string | null
  setFlippedCard: Dispatch<SetStateAction<string | null>>
} & Pick<CardsProps, "loading" | "content">

function MyContent({
  loading,
  content,
  flippedCard,
  setFlippedCard,
}: MyContentProps) {
  const isFlipped = flippedCard === content.id

  const dispatch = useAppDispatch()
  const user = useGetCurrentUser().data

  return (
    <Cards
      loading={loading}
      content={content}
      isFlipped={isFlipped}
      backSide={
        <div className=" shadow-lg w-full h-full flex flex-col py-6 px-8 gap-3">
          <XCircleIcon
            onClick={() => setFlippedCard(null)}
            className=" text-gray-dark cursor-pointer  self-end h-6 w-6 -mr-5 -mt-2  z-20"
          />
          <Text
            onClick={() => {
              dispatch(
                showModal({
                  modalType: ModalType.EDIT_MODAL,
                  payload: content,
                })
              )
            }}
            className="cursor-pointer"
            varaint={TypographyVariant.Body1}
          >
            Edit
          </Text>
          <Text
            onClick={() => {
              if ((user?.balance as number) >= 50) {
                dispatch(
                  showModal({
                    payload: {
                      id: content.id,
                    },
                    modalType: ModalType.BOOST_MODAL,
                  })
                )
              } else {
                dispatch(
                  showModal({
                    payload: {},
                    modalType: ModalType.INSUFFICENT_MODAL,
                  })
                )
              }
            }}
            className=" text-secondary-light cursor-pointer    "
            varaint={TypographyVariant.Body1}
          >
            Boost
          </Text>
          <Text
            onClick={() => {
              dispatch(
                showModal({
                  payload: {
                    id: content.id,
                  },
                  modalType: ModalType.DELETE_MODAL,
                })
              )
            }}
            className="text-red-600 cursor-pointer"
            varaint={TypographyVariant.Body1}
          >
            Delete
          </Text>
        </div>
      }
      hoverComponent={
        <>
          <div className="absolute left-4 top-4 px-2 bg-[rgba(255,255,255,0.5)] text-black opacity-70  ">
            <Text
              className="font-extrabold  tracking-wider"
              varaint={TypographyVariant.Body1}
            >
              <span className="text-2xl">{content.price.toFixed(2)}</span>
              ETB
            </Text>
          </div>
          {user?.id === content.createdBy.id && (
            <div
              onClick={() => {
                setFlippedCard(content.id)
              }}
              className=" top-4 right-3 absolute z-10"
            >
              <DotsVerticalIcon className="h-6 w-6 cursor-pointer text-white " />
            </div>
          )}
        </>
      }
      captionDetail={
        loading ? (
          <Skeleton className="mt-4 h-6" />
        ) : (
          <div className="flex justify-between items-center mt-2 pl-1 pr-2">
            <Text
              className=" whitespace-nowrap !w-[15ch] flex-shrink overflow-hidden  text-ellipsis font-medium cursor-pointer"
              varaint={TypographyVariant.Body1}
            >
              {content.title}
            </Text>
          </div>
        )
      }
    />
  )
}

export default MyContent

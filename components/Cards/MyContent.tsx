import { DotsVerticalIcon, XCircleIcon } from "@heroicons/react/solid"
import React, { SetStateAction, Dispatch } from "react"
import Cards, { CardsProps } from "./BaseCard"
import Skeleton from "../Skeleton"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"

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
          <Text className="cursor-pointer" varaint={TypographyVariant.Body1}>
            Edit
          </Text>
          <Text
            onClick={() => {
              dispatch(
                showModal({
                  payload: {
                    id: content.id,
                  },
                  modalType: ModalType.BOOST_MODAL,
                })
              )
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
        <div
          onClick={() => {
            setFlippedCard(content.id)
          }}
          className=" top-4 right-3 absolute z-10"
        >
          <DotsVerticalIcon className="h-6 w-6 cursor-pointer text-white " />
        </div>
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
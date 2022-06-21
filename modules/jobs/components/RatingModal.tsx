import React, { useState } from "react"
import Modal from "@/components/Dialog/Modal"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { hideModal, ModalType } from "store/modalSlice"

import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { StarIcon } from "@heroicons/react/solid"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useAddRatingMutation } from "../hooks"

function RatingModal() {
  const { modalPayload, modalType } = useAppSelector(
    (state) => state.modal
  ) as {
    modalPayload: Record<string, any>
    modalType: ModalType
  }
  const isModalVisible = modalType === ModalType.RATING_MODAL
  const [hoveredElement, setHoveredElement] = useState<number>(0)
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const dispatch = useAppDispatch()
  const addRatingMutation = useAddRatingMutation()

  return (
    <Modal
      className=" w-1/3 max-w-[500px]  overflow-y-auto"
      isVisible={isModalVisible}
    >
      <div className="flex flex-col items-center mt-3">
        <Text varaint={TypographyVariant.H2}>
          {selectedRating
            ? "Thank You for the feedback "
            : "How satisified are you?"}
        </Text>
        {!selectedRating ? (
          <div className="flex mt-6">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  onMouseEnter={() => {
                    setHoveredElement(index + 1)
                  }}
                  onMouseLeave={() => {
                    setHoveredElement(0)
                  }}
                  onClick={() => {
                    addRatingMutation.mutate({
                      id: modalPayload.jobId,
                      data: {
                        jobId: modalPayload.jobId,
                        userId: modalPayload.userId,
                        value: index + 1,
                      },
                    })
                    setSelectedRating(index + 1)
                  }}
                  className={`w-16 h-16 cursor-pointer text-gray-light ${
                    !hoveredElement
                      ? index < selectedRating
                        ? "text-[#ffcc47]"
                        : ""
                      : index < hoveredElement
                      ? "text-[#ffcc47]"
                      : ""
                  }`}
                />
              ))}
          </div>
        ) : (
          <Button
            onClick={() => dispatch(hideModal())}
            className="mt-10 text-red-600 !outline-red-600"
            variant={ButtonVariants.OUTLINED}
          >
            Close
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default RatingModal

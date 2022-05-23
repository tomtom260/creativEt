import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import useContentService from "@/service/content"
import React from "react"
import { hideModal, ModalType } from "store/modalSlice"

function DeleteModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const { onContentBuy } = useContentService()
  const isModalVisible = modalType === ModalType.DELETE_MODAL

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Delete Content</Text>
        <Text className="mt-4 mb-6" varaint={TypographyVariant.Body1}>
          Are you sure you want to
          <span className="font-bold uppercase text-red-600">
            {" "}
            Delete{" "}
          </span>{" "}
          this post. It&apos;s irreversible.
        </Text>
        <div className="flex gap-20">
          <Button
            onClick={() => {
              dispatch(hideModal())
            }}
            variant={ButtonVariants.OUTLINED}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              //   onContentBuy(modalPayload.id)
              dispatch(hideModal())
            }}
            className="bg-red-600"
            variant={ButtonVariants.PRIMARY}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal

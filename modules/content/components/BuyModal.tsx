import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import useContentService from "@/service/content"
import React from "react"
import { hideModal, ModalType } from "store/modalSlice"

function BuyModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const { onContentBuy } = useContentService()
  const isModalVisible = modalType === ModalType.BUY_MODAL

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Buy Content</Text>
        <Text className="mt-4 mb-6" varaint={TypographyVariant.Body1}>
          Are you sure you want to buy this for{" "}
          <span className="font-bold">
            {modalPayload && modalPayload.price} ETB
          </span>
          . It&apos;s not refundable.
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
              onContentBuy(modalPayload?.id)
              dispatch(hideModal())
            }}
            variant={ButtonVariants.PRIMARY}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default BuyModal

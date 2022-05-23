import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import useContentService from "@/service/content"
import React from "react"
import { hideModal, ModalType } from "store/modalSlice"

function BoostModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const { onContentBuy } = useContentService()
  const isModalVisible = modalType === ModalType.BOOST_MODAL

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Boost Content</Text>
        <Text className="mt-4 mb-6" varaint={TypographyVariant.Body1}>
          Are you sure you want to
          <span className="font-bold uppercase"> boost </span> this post for
          <span className="font-bold"> 50 ETB</span>. It&apos;ll last for a week,
          and it&apos;s not refundable.
        </Text>
        <div className="flex gap-20">
          <Button
            onClick={() => {
              dispatch(hideModal())
            }}
            className=" text-red-600"
            variant={ButtonVariants.OUTLINED}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              //   onContentBuy(modalPayload.id)
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

export default BoostModal

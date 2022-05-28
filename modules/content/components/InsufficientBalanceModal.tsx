import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import useContentService from "@/service/content"
import Router from "next/router"
import React from "react"
import { hideModal, ModalType } from "store/modalSlice"
import { useDeleteContentMutation } from "../hooks"

function InsufficientBalanceModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const isModalVisible = modalType === ModalType.INSUFFICENT_MODAL

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Insufficient Balance</Text>
        <Text className="mt-4 mb-6" varaint={TypographyVariant.Body1}>
          your balance is
          <span className="font-bold uppercase text-black"> low .</span>
          please top up your account.
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
              dispatch(hideModal())
              Router.push("/account/wallet")
            }}
            variant={ButtonVariants.PRIMARY}
          >
            Deposit
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default InsufficientBalanceModal

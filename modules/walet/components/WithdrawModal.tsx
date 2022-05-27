import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import React, { useState } from "react"
import { hideModal, ModalType } from "store/modalSlice"

function WithdrawModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const [value, setValue] = useState<number>()
  const [accountNumber, setAccountNumber] = useState<string>()

  const dispatch = useAppDispatch()
  const isModalVisible = modalType === ModalType.WITHDRAW_MODAL

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Withdraw Money</Text>
        <div className="mt-3 mb-6 flex flex-col gap-4">
          <Text varaint={TypographyVariant.Body1}>
            How much money do you want to{" "}
            <span className="font-bold uppercase"> withdraw</span>?
          </Text>
          <Input
            onChange={(val) => {
              setValue(Number(val))
            }}
            value={value?.toString()}
            variant={InputType.NORMAL}
            type="number"
          />
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Account Number
          </Text>
          <Input
            onChange={(val) => {
              setAccountNumber(val)
            }}
            value={accountNumber}
            variant={InputType.NORMAL}
          />
        </div>
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

export default WithdrawModal

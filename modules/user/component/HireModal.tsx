import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import useContentService from "@/service/content"
import { hideModal, ModalType } from "store/modalSlice"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import Script from "next/script"
import DatePicker from "react-datepicker"
import { useGetCurrentUser } from "@/hooks/user"

function HireModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const { onContentBuy } = useContentService()
  const isModalVisible = modalType === ModalType.HIRE_MODAL
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState()
  const [price, setPrice] = useState(0)

  function onChange(date) {
    setDate(date)
  }

  const { balance } = useGetCurrentUser().data

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Hire Creator</Text>
        <div className="w-full flex flex-col">
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Description
          </Text>
          <Input
            onChange={setDescription}
            className="w-full"
            variant={InputType.TEXTAREA}
            value={description}
          />
        </div>
        <div className="w-full flex flex-col">
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Price
          </Text>
          <Input
            error={balance < price ? "Insufficient balance" : ""}
            className="w-full"
            type="number"
            onChange={(val) => setPrice(val)}
            value={price}
            variant={InputType.NORMAL}
          />
        </div>
        <div className="w-full flex flex-col">
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Deadline
          </Text>
          <DatePicker
            css=""
            className="w-full h-12
            border focus:border-0  hover:ring-1 focus:ring-1  hover:border-transparent  border-gray-normal  !ring-secondary-normal
            rounded-md"
            selected={date}
            onChange={onChange}
          />
        </div>
        <div className="flex mt-8 gap-20">
          <Button
            onClick={() => {
              dispatch(hideModal())
            }}
            variant={ButtonVariants.OUTLINED}
          >
            Cancel
          </Button>
          <Button
            disabled={balance < price}
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
      <Script src="https://unpkg.com/flowbite@1.4.7/dist/datepicker.js" />
    </Modal>
  )
}

export default HireModal

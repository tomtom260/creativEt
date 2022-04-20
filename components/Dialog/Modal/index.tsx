import CloseSVG from "@/assets/icons/Close"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import React from "react"
import { hideModal } from "store/modalSlice"

export type ModalProps = {}

function Modal({}: ModalProps) {
  const dispatch = useAppDispatch()
  const { isModalVisible } = useAppSelector((state) => state.modal)
  return (
    <div
      className={`${
        !isModalVisible ? "hidden" : "fixed"
      } inset-0 h-screen flex`}
    >
      <div className="bg-black opacity-50 absolute inset-0 h-screen" />
      <div className="bg-white flex flex-col p-6 w-[90%] md:w-[50%] relative m-auto rounded-2xl ">
        <Button
          onClick={() => dispatch(hideModal())}
          variant={ButtonVariants.OUTLINED}
          className="flex self-end text-gray-dark outline-0 !p-1 !h-6"
        >
          <CloseSVG className="text-3xl" />
        </Button>
      </div>
    </div>
  )
}

export default Modal

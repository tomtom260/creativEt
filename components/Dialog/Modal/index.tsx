import CloseSVG from "@/assets/icons/Close"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useAppDispatch } from "@/hooks/redux"
import React, { ReactNode } from "react"
import { hideModal } from "store/modalSlice"

export type ModalProps = {
  children: ReactNode
  isVisible: boolean
}

function Modal({ children, isVisible }: ModalProps) {
  const dispatch = useAppDispatch()
  return (
    isVisible && (
      <div className={`inset-0 h-screen absolute flex items-center`}>
        <div className="bg-black opacity-50 z-20 fixed inset-0 h-screen" />
        <div className="bg-white flex flex-col z-30 p-6   top-1/2 m-auto rounded-2xl ">
          <Button
            onClick={() => dispatch(hideModal())}
            variant={ButtonVariants.OUTLINED}
            className="flex self-end text-gray-dark outline-0 !p-1 !h-6"
          >
            <CloseSVG className="text-3xl" />
          </Button>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal

import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useAppDispatch } from "@/hooks/redux"
import { XCircleIcon } from "@heroicons/react/solid"
import React, { ReactNode } from "react"
import { hideModal } from "store/modalSlice"

export type ModalProps = {
  children: ReactNode
  isVisible: boolean
  className?: string
}

function Modal({ children, isVisible, className }: ModalProps) {
  const dispatch = useAppDispatch()
  return isVisible ? (
    <div className={`inset-0 h-screen absolute flex items-center`}>
      <div className="bg-black opacity-50 z-20 fixed inset-0 h-screen" />
      <div
        className={`bg-white flex flex-col z-30 p-6  top-1/2 m-auto rounded-2xl ${className}`}
      >
        <Button
          onClick={() => dispatch(hideModal())}
          variant={ButtonVariants.OUTLINED}
          className="flex self-end text-gray-dark outline-0 !p-1 !h-6"
        >
          <XCircleIcon className="h-6 w-6" />
        </Button>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal

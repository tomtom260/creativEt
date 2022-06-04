import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useRouter } from "next/router"
import React from "react"
import { hideModal, ModalType } from "store/modalSlice"

function EnterFullProfileModal() {
  const { modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const isModalVisible = modalType === ModalType.UPDATE_PROFILE
  const router = useRouter()

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Update Profile</Text>
        <Text className="mt-4 mb-6" varaint={TypographyVariant.Body1}>
          You have to enter your{" "}
          <span className="font-bold uppercase">location</span> and{" "}
          <span className="font-bold uppercase">bio</span> to continue
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
              router.push("/account/Profile")
              dispatch(hideModal())
            }}
            variant={ButtonVariants.PRIMARY}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EnterFullProfileModal

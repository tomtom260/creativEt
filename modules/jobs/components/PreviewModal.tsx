import React from "react"
import Modal from "@/components/Dialog/Modal"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { hideModal, ModalType, showModal } from "store/modalSlice"

import { TJOb } from "@/modules/jobs/types"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useReviseJobMutation, useSuccessJobMutation } from "../hooks"

function PreviewModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const isModalVisible = modalType === ModalType.PREVIEW_MODAL
  const job = modalPayload as TJOb
  const successJobMutation = useSuccessJobMutation()
  const reviseJobMutation = useReviseJobMutation()
  const dispatch = useAppDispatch()

  return (
    <Modal
      className=" w-2/3 max-w-[800px] !h-[75vh] overflow-y-auto"
      isVisible={isModalVisible}
    >
      <div className="relative w-full h-full ">
        {job?.image && <ImageWithSkeleton src={job.image} layout="fill" />}
      </div>
      <div className="flex self-end gap-6 mt-10">
        <Button
          variant={ButtonVariants.PRIMARY}
          onClick={() => {
            setTimeout(() => {
              dispatch(
                showModal({
                  modalType: ModalType.RATING_MODAL,
                  payload: {
                    userId: job.employeeId,
                    jobId: job.id,
                  },
                })
              )
            }, 3000)
            successJobMutation.mutate(job.id)
            dispatch(hideModal())
          }}
        >
          Accept
        </Button>
        <Button
          className="text-red-600"
          variant={ButtonVariants.OUTLINED}
          onClick={() => {
            reviseJobMutation.mutate(job.id)
            dispatch(hideModal())
          }}
        >
          Reject
        </Button>
      </div>
    </Modal>
  )
}

export default PreviewModal

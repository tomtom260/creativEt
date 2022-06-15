import React from "react"
import Modal from "@/components/Dialog/Modal"
import { useAppSelector } from "@/hooks/redux"
import { ModalType } from "store/modalSlice"

import UploadContent from "@/modules/content/components/UploadContent"
import { TJOb } from "@/modules/jobs/types"

function FinishJobModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const isModalVisible = modalType === ModalType.FINISH_MODAL
  const job = modalPayload as TJOb

  return (
    <Modal
      className=" w-1/3 max-w-[500px] !h-[75vh] overflow-y-auto"
      isVisible={isModalVisible}
    >
      {job && (
        <UploadContent
          jobId={job.id}
          userId={job.employerId}
          gigTitle={job.title}
          gigDescription={job.description}
          gigPrice={job.price}
          modal
          tags={[]}
        />
      )}
    </Modal>
  )
}

export default FinishJobModal

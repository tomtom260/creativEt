import React, { useEffect, useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Modal from "@/components/Dialog/Modal"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { hideModal, ModalType } from "store/modalSlice"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import Script from "next/script"
import Select from "@/components/Form/Select"
import { useUpdateContent } from "@/modules/content/hooks"
import { Content } from "types/content"
import { toast } from "react-toastify"

function EditModal() {
  const { modalPayload, modalType } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const isModalVisible = modalType === ModalType.EDIT_MODAL
  const content = modalPayload as Content | undefined
  console.log(content, modalType)

  const [description, setDescription] = useState<string>(
    content?.description || ""
  )
  const [price, setPrice] = useState<number>(content?.price || 0)
  const [title, setTitle] = useState<string>(content?.title || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(
    content?.tags?.map((tag) => tag.name) || []
  )
  const updateContentMutation = useUpdateContent()

  useEffect(() => {
    setDescription(content?.description || "")
    setTitle(content?.title || "")
    setPrice(content?.price || 0)
    setSelectedTags(content?.tags?.map((tag) => tag.name) || [])
  }, [content])

  return (
    <Modal isVisible={isModalVisible}>
      <div className=" w-[500px] px-6 flex flex-col items-center text-center">
        <Text varaint={TypographyVariant.H2}>Edit Content</Text>
        <div className="w-full flex flex-col">
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Title
          </Text>
          <Input
            className="w-full"
            onChange={(val) => setTitle(val)}
            value={title}
            variant={InputType.NORMAL}
          />
        </div>
        <div className="w-full flex flex-col">
          <Text className="self-start" varaint={TypographyVariant.Body1}>
            Price
          </Text>
          <Input
            className="w-full"
            type="number"
            onChange={(val) => setPrice(parseInt(val))}
            value={price.toString()}
            variant={InputType.NORMAL}
          />
        </div>
        <div className="w-full">
          <Select
            className="!text-base !self-start !m-0"
            selectedOptions={selectedTags}
            setSelectedOptions={setSelectedTags}
            options={[]}
          />
        </div>
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
            onClick={() => {
              updateContentMutation
                .mutateAsync({
                  id: content?.id as string,
                  data: {
                    title,
                    tags: selectedTags,
                    description,
                    price,
                  },
                })
                .then(() => {
                  toast.success("Content Edited")
                  dispatch(hideModal())
                })
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

export default EditModal

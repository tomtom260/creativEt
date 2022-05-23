import TrashSVG from "@/assets/icons/Trash"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType, InputVariant } from "@/components/Form/Input/Input.enum"
import Select from "@/components/Form/Select"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import DefaultLayout from "@/layouts/DefaultLayout"
import { getTags } from "@/modules/content/server"
import useContentService from "@/service/content"
import { images } from "@/utils/images"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Dropzone from "react-dropzone"
import { useQueryClient } from "react-query"

const MAX_IMAGE_SIZE = 1024 * 1024 * 10

function Upload({ tags }) {
  const [imageToBeUploaded, setImageToBeUploaded] = useState<File | null>(null)
  const [imageError, setImageError] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { uploadContent } = useContentService()

  const errorMessage = (code: string) => {
    switch (code) {
      case "file-invalid-type":
        return "Only images can be uploaded"
      case "file-too-large":
        return "Image size is greater than 10MB"
      default:
        return ""
    }
  }

  const onImageChange = (image: File) => {
    if (image) {
      setImageError([])
      prepareImageforPreview(image)
      setImageToBeUploaded(image)
    }
  }

  const prepareImageforPreview = (image: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => setImagePreview(reader.result as string)
  }

  const onUpload = () => {
    uploadContent({
      imageToBeUploaded: imageToBeUploaded!,
      tags: selectedTags,
      title,
      description,
    }).then(() => {
      router.push("/")
      queryClient.refetchQueries(["contents"])
    })
  }
  const router = useRouter()
  const queryClient = useQueryClient()

  return (
    <DefaultLayout>
      <Text varaint={TypographyVariant.H1}>Upload your work</Text>
      {imagePreview ? (
        <Input
          variant={InputType.NORMAL}
          label=""
          placeholder="Content Title"
          className=" text-base md:text-3xl px-0 "
          value={title}
          onChange={setTitle}
          noBorder
        />
      ) : (
        <div className="h-12" />
      )}
      <Dropzone
        accept="image/*"
        maxSize={MAX_IMAGE_SIZE}
        multiple={false}
        onDrop={(acceptedFiles) => {
          onImageChange(acceptedFiles[0])
        }}
        onDropRejected={([{ errors }]) => {
          setImageError(errors.map((error) => errorMessage(error.code)))
        }}
      >
        {({ getRootProps }) => (
          <div
            className="w-full h-[200px] xs:h-[280px] md:h-[480px] md:w-3/5 mx-auto flex flex-col items-center justify-between  relative border my-4  md:my-16 pr-4 pl-8 py-2  md:py-16"
            {...getRootProps()}
          >
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  layout="fill"
                  alt="image to be uploaded"
                />
                <div className="text-white bg-black rounded-md absolute top-3 right-3">
                  <Button
                    className="hover:!bg-black rounded-sm  !h-5 md:!h-8 !w-5 md:!w-8  text-sm"
                    onClick={(e) => {
                      setImagePreview(undefined)
                      setImageToBeUploaded(null)
                      e.stopPropagation()
                    }}
                    variant={ButtonVariants.ICON}
                  >
                    <TrashSVG className="h-3 md:h-6 w-3 md:w-6" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="relative w-20 h-20 md:w-40 md:h-40 flex-shrink-0">
                  <Image
                    src={images.picturePlaceholder}
                    layout="fill"
                    alt="picture placeholder"
                  />
                </div>
                <Text varaint={TypographyVariant.Body1}>
                  Drag and drop some files here, or click to browse image
                </Text>
                <ul
                  className={`flex flex-col items-start mt-2 md:mt-8 list-disc ${
                    imageError?.length ? "text-red-600" : "text-gray-dark"
                  }`}
                >
                  {imageError?.length ? (
                    imageError.map((error) => (
                      <li key={error}>
                        <Text varaint={TypographyVariant.Body2}>{error}</Text>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <Text varaint={TypographyVariant.Body2}>
                          1600X1200 or higher resolutions recommended. Max 10MB
                        </Text>
                      </li>
                      <li>
                        <Text varaint={TypographyVariant.Body2}>
                          Only upload media you own the rights to
                        </Text>
                      </li>
                    </>
                  )}
                </ul>
              </>
            )}
          </div>
        )}
      </Dropzone>
      {imagePreview ? (
        <>
          <Select
            selectedOptions={selectedTags}
            setSelectedOptions={setSelectedTags}
            options={tags}
          />
          <Input
            variant={InputType.TEXTAREA}
            label=""
            placeholder="Anything else you would like to mention?"
            className="text-base md:text-3xl px-0 "
            value={description}
            onChange={setDescription}
            noBorder
          />
        </>
      ) : // <div className="h-28" />
      null}
      <div className="flex w-full justify-end">
        <Button onClick={onUpload} variant={ButtonVariants.PRIMARY}>
          Continue
        </Button>
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const tags = await getTags()
  return {
    props: {
      protected: true,
      tags,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default Upload

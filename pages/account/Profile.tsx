import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useEffect, useState, InputHTMLAttributes } from "react"
import Text from "@/components/Typography"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Input from "@/components/Form/Input"
import axios from "axios"
import { InputType } from "@/components/Form/Input/Input.enum"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Image from "next/image"
import cloudinary, {
  getPublicIdFromUrl,
  getThumnailSizedImage,
} from "@/utils/cloudinary"

function Profile() {
  const { data: session, status } = useSession()

  const [imageToBeUploaded, setImageToBeUploaded] = useState<File>()
  const [imageError, setImageError] = useState<string>()

  const [previewImage, setPreviewImage] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    } else {
      if (session?.user?.image!) {
        const publicId = getPublicIdFromUrl(session?.user?.image!)
        const profileUrl = getThumnailSizedImage(publicId)
        setPreviewImage(profileUrl)
      }
    }
  }, [status, router, session])

  if (status === "loading") {
    return "Loading"
  }

  const checkIfImageIsValidBeforeUpload = (image: File) => {
    if (!image.type.includes("image")) {
      return setImageError("Only images can be uploaded")
    }
    if (image.size > 1024 * 1024 * 2) {
      return setImageError("Image size is greater than 2MB")
    }
    setImageToBeUploaded(image)
  }

  const onImageChange: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    e => {
      const image = e.target.files && e.target.files[0]
      if (image) {
        setImageError(undefined)
        checkIfImageIsValidBeforeUpload(image)
        prepareImageforPreview(image)
      }
    }

  const prepareImageforPreview = (image: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => setPreviewImage(reader.result as string)
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", imageToBeUploaded as Blob)
    formData.append("upload_preset", "profile")
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { body: formData, method: "POST" }
    ).then(res => {
      return res.json()
    })

    axios
      .post(
        "/api/account/updateUserProfile",
        {
          image: data.secure_url,
        },
        {
          withCredentials: true,
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="relative w-20 h-20 mr-6">
            {previewImage && (
              <Image
                src={previewImage!}
                className="rounded-full"
                alt="profile image"
                layout="fill"
              />
            )}
          </div>
          <div className="grid grid-cols-1 flex-1">
            <div>
              <div>
                <div className="flex items-center">
                  <Button onClick={() => {}} variant={ButtonVariants.OUTLINED}>
                    <label>
                      Choose File
                      <input
                        onChange={onImageChange}
                        className="hidden"
                        type="file"
                      />
                    </label>
                  </Button>
                  {imageToBeUploaded && (
                    <Text
                      className="text-gray-normal ml-4"
                      varaint={TypographyVariant.Body1}
                    >
                      {imageToBeUploaded.name}
                    </Text>
                  )}
                </div>

                <Text
                  className={` mt-2 ${
                    imageError ? "text-red-600" : "text-gray-normal"
                  }`}
                  varaint={TypographyVariant.Body1}
                >
                  {imageError ? imageError : "Max size of 2MB"}
                </Text>
              </div>
              <Button
                className="w-min"
                onClick={uploadImage}
                variant={ButtonVariants.PRIMARY}
              >
                Upload
              </Button>
            </div>
            <Input
              variant={InputType.NORMAL}
              value=""
              onChange={() => {}}
              label="Name"
            />
            <Input
              variant={InputType.NORMAL}
              value=""
              onChange={() => {}}
              label="Location"
            />
            <Input
              variant={InputType.TEXTAREA}
              value=""
              onChange={() => {}}
              label="Bio"
            />
            <Button variant={ButtonVariants.PRIMARY}>Save </Button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default Profile

import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState, InputHTMLAttributes, useContext } from "react"
import Text from "@/components/Typography"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import Image from "next/image"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import useUserService from "@/service/user"
import { useGetCurrentUser } from "@/hooks/user"
import { LangContext} from "@/hooks/Lang"

function Profile() {
  const { updateCurrentUserProfileImage, updateCurrentUserProfile } =
    useUserService()
  const { data: user } = useGetCurrentUser()
  const [imageToBeUploaded, setImageToBeUploaded] = useState<File>()
  const [imageError, setImageError] = useState<string>()

  const profileUrl = getOptimisedProfileImage(user?.image!)
  const [previewImage, setPreviewImage] = useState(profileUrl)

  const [name, setName] = useState(user?.name || "")
  const [location, setLocation] = useState(user?.location || "")
  const [bio, setBio] = useState(user?.bio || "")
  
  const { lang, setLang, selectedLang } = useContext(LangContext)

  const checkIfImageIsValidBeforeUpload = (image: File) => {
    if (!image.type.includes("image")) {
      return setImageError("Only images can be uploaded")
    }
    if (image.size > 1024 * 1024 * 2) {
      return setImageError("Image size is greater than 2MB")
    }
    setImageToBeUploaded(image)
  }

  const onImageChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
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
    imageToBeUploaded
      ? updateCurrentUserProfileImage(imageToBeUploaded)
      : setImageError("Image is the same as current profile picture")
  }

  const updateProfile = () => {
    const data = {
      name,
      location,
      bio,
    }
    let k: keyof typeof data
    for (k in data) {
      if (!data[k] || data[k] === user![k]) {
        delete data[k]
      }
    }
    updateCurrentUserProfile(data)
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
                  {/* @ts-ignore */}
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
                className="w-min my-4"
                onClick={uploadImage}
                variant={ButtonVariants.PRIMARY}
              >
                {lang.upload}
              </Button>
            </div>
            <Input
              variant={InputType.NORMAL}
              value={name}
              onChange={setName}
              label="Name"
            />
            <Input
              variant={InputType.NORMAL}
              value={location}
              onChange={setLocation}
              label="Location"
            />
            <Input
              variant={InputType.TEXTAREA}
              value={bio}
              onChange={setBio}
              label="Bio"
            />
            <Button onClick={updateProfile} variant={ButtonVariants.PRIMARY}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Profile

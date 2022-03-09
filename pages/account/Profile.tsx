import React, { InputHTMLAttributes } from "react"
import DefaultLayout from "@/layouts/DefaultLayout"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useState } from "react"
import axios from "axios"

function Profile() {
  const SidebarMenuItems = [
    {
      name: "General",
      path: "/account/",
    },
    {
      name: "Profile",
      path: "/account/profile",
    },
    {
      name: "Password",
      path: "/account/password",
    },
  ]

  const router = useRouter()
  const { data: session, status } = useSession()
  const [imageToBeUploaded, setImageToBeUploaded] = useState<File>()
  const [imageError, setImageError] = useState<string>()
  const [previewImage, setPreviewImage] = useState(session?.user?.image)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    } else {
      setPreviewImage(session?.user?.image)
    }
  }, [status, session, router])

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

    console.log(data)

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
    <DefaultLayout>
      <div className="flex">
        <div className="relative  w-12 h-12 mr-4">
          <Image
            layout="fill"
            className="rounded-full"
            src={session?.user?.image!}
            alt="profile image"
          />
        </div>
        <div className="flex flex-col">
          <Text varaint={TypographyVariant.H2}>
            Thomas Mesfin / Edit Profile
          </Text>
          <Text className=" text-gray-normal" varaint={TypographyVariant.Body1}>
            Setup your CreativET Account
          </Text>
        </div>
      </div>
      <div className="grid grid-cols-[1fr,3fr] mt-12">
        <div className="">
          {SidebarMenuItems.map(item => {
            const isActive = router.asPath.includes(item.path)
            return (
              <Link key={item.name} href={item.path} passHref>
                <Text
                  varaint={TypographyVariant.Body1}
                  className={`${isActive ? "font-bold " : ""} capitalize py-1`}
                >
                  {item.name}
                </Text>
              </Link>
            )
          })}
          <div className="w-full h-px bg-gray-light my-5" />
          <Link href="#" passHref>
            <Text
              varaint={TypographyVariant.Body1}
              className={` capitalize text-red-600 font-bold`}
            >
              Delete Account
            </Text>
          </Link>
        </div>
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
                    <Button
                      onClick={() => {}}
                      variant={ButtonVariants.OUTLINED}
                    >
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
              <div className="flex-1">
                <Text
                  className=" font-mono !text-xl"
                  varaint={TypographyVariant.Body1}
                >
                  Name
                </Text>
                <input
                  type="text"
                  className="h-12 py-4 w-full rounded-lg focus:border-0 border-gray-normal !ring-secondary-normal"
                />
              </div>
              <div className="flex-1">
                <Text
                  className=" font-mono !text-xl"
                  varaint={TypographyVariant.Body1}
                >
                  Location
                </Text>
                <input
                  type="text"
                  className="h-12 py-4 w-full flex-1 rounded-lg focus:border-0 border-gray-normal !ring-secondary-normal"
                />
              </div>
              <div className="flex-1">
                <Text
                  className=" font-mono !text-xl"
                  varaint={TypographyVariant.Body1}
                >
                  Bio
                </Text>
                <textarea className=" h-32 resize-none py-4 w-full flex-1 rounded-lg focus:border-0 border-gray-normal !ring-secondary-normal" />
              </div>
              <Button variant={ButtonVariants.PRIMARY}>Save </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Profile

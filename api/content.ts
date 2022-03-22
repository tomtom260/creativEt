import axios from "axios"
import { useMutation, UseMutationOptions } from "react-query"
import { Content } from "types/content"

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

async function uploadImage(formData: FormData) {
  return await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { body: formData, method: "POST" }
  ).then(res => {
    return res.json()
  })
}

export const useUploadImageMutation = (props: CustomUseMutationOptions) => {
  return useMutation(uploadImage, props)
}

async function createContent(contentData: Partial<Content>) {
  return await axios.post(`/api/content/upload`, contentData)
}

export const useCreateContentMutation = (props: CustomUseMutationOptions) => {
  return useMutation(createContent, props)
}

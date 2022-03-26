import axios from "axios"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query"
import { Content } from "types/content"

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

type CustomUseQueryOptions = UseQueryOptions<
  unknown,
  unknown,
  unknown,
  string[]
>

async function uploadImage(formData: FormData) {
  console.log("formData", formData)
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

async function getBest3Contents(userId: string) {
  return await axios.get(
    `/api/content/getContentByUserID?userId=${userId}&take=${3}`
  )
}

export function useGetBest3ContentsQuery(
  userId: string,
  options: CustomUseQueryOptions
) {
  return useQuery(["contentByUserId", userId], () => getBest3Contents(userId), {
    select: data => data.data.data,
    ...options,
  })
}

async function likeContent(id: string) {
  return await axios.get(`/api/content/like?contentId=${id}`)
}

async function dislikeContent(id: string) {
  return await axios.get(`/api/content/dislike?contentId=${id}`)
}

export const useLikeContentMutation = (props: CustomUseMutationOptions) => {
  return useMutation(likeContent, props)
}

export function useDislikeContentMutation(props: CustomUseMutationOptions) {
  return useMutation(dislikeContent, props)
}

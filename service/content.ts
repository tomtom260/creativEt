import {
  useCreateContentMutation,
  useDislikeContentMutation,
  useLikeContentMutation,
  useUploadImageMutation,
  useBuyContentMutation,
} from "@/api/content"
import { useQueryClient } from "react-query"

export default function useContentService() {
  const queryClient = useQueryClient()
  const uploadImageMutation = useUploadImageMutation({})
  const createContentMutation = useCreateContentMutation({})
  const likeContentMutation = useLikeContentMutation({
    onSuccess: (res) => {
      console.log("res", ["content", res.data.data.contentId])
      queryClient.invalidateQueries(["content", res.data.data.contentId])
    },
  })
  const dislikeContentMutation = useDislikeContentMutation({
    onSuccess: (res) =>
      queryClient.invalidateQueries(["content", res.data.data.contentId]),
  })

  const buyContentMutatation = useBuyContentMutation({
    onSuccess: (res) =>
      queryClient.invalidateQueries(["content", res.data.data.contentId]),
  })

  async function uploadContent({
    imageToBeUploaded,
    title,
    description,
    tags,
    userId,
    price,
  }: {
    imageToBeUploaded: File
    description: string
    title: string
    tags: {
      id: string
      name: string
    }[]
    userId?: string
    price: number
  }) {
    const formData = new FormData()
    formData.append("file", imageToBeUploaded)
    formData.append("upload_preset", "image-content")
    const cloudinaryResponse = await uploadImageMutation.mutateAsync(formData)
    return await createContentMutation.mutateAsync({
      title,
      description,
      tags,
      image: cloudinaryResponse.secure_url,
      userId: userId || undefined,
      published: false,
      price,
    })
  }

  function onContentSeen(contentId: string) {
    contentSeenMutation.mutate(contentId)
  }
  function onContentLiked(contentId: string) {
    likeContentMutation.mutate(contentId)
  }
  function onContentDisliked(contentId: string) {
    dislikeContentMutation.mutate(contentId)
  }

  function onContentBuy(contentId: string) {
    buyContentMutatation.mutate(contentId)
  }

  return {
    uploadContent,
    onContentSeen,
    onContentLiked,
    onContentDisliked,
    onContentBuy,
  }
}

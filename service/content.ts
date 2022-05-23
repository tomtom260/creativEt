import {
  useCreateContentMutation,
  useDislikeContentMutation,
  useLikeContentMutation,
  useUploadImageMutation,
  useContentSeenMutation,
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
  }: {
    imageToBeUploaded: File
    description: string
    title: string
    tags: any
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

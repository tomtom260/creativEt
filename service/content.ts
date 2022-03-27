import {
  useCreateContentMutation,
  useDislikeContentMutation,
  useLikeContentMutation,
  useUploadImageMutation,
} from "@/api/content"
import { useQueryClient } from "react-query"

export default function useContentService() {
  const queryClient = useQueryClient()
  const uploadImageMutation = useUploadImageMutation({})
  const createContentMutation = useCreateContentMutation({})
  const likeContentMutation = useLikeContentMutation({
    onSuccess: res =>
      queryClient.invalidateQueries(["content", res.data.data.contentId]),
  })
  const dislikeContentMutation = useDislikeContentMutation({
    onSuccess: res =>
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
    createContentMutation.mutate({
      title,
      description,
      tags,
      image: cloudinaryResponse.secure_url,
    })
  }

  function onContentSeen() {}
  function onContentLiked(contentId: string) {
    likeContentMutation.mutate(contentId)
  }
  function onContentDisliked(contentId: string) {
    dislikeContentMutation.mutate(contentId)
  }

  return {
    uploadContent,
    onContentSeen,
    onContentLiked,
    onContentDisliked,
  }
}

import {
  useCreateContentMutation,
  useDislikeContentMutation,
  useLikeContentMutation,
  useUploadImageMutation,
} from "@/api/content"

export default function useContentService() {
  const uploadImageMutation = useUploadImageMutation({})
  const createContentMutation = useCreateContentMutation({})
  const likeContentMutation = useLikeContentMutation({})
  const dislikeContentMutation = useDislikeContentMutation({})

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

  return {
    uploadContent,
    onContentSeen,
    onContentLiked,
  }
}

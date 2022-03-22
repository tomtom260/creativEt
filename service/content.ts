import { useCreateContentMutation, useUploadImageMutation } from "@/api/content"

export default function useContentService() {
  const uploadImageMutation = useUploadImageMutation({})
  const createContentMutation = useCreateContentMutation({
    onSettled(res) {
      console.log(res)
    },
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
    tags: string[]
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

  return {
    uploadContent,
  }
}

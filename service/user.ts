import { useUpdateUserProfile } from "@/modules/user/api"
import { useUploadImageMutation } from "@/modules/content/api"
import { useGetCurrentUser } from "@/hooks/user"
import { useQueryClient } from "react-query"

function useUserService() {
  const queryClient = useQueryClient()
  const { data: user } = useGetCurrentUser()

  const saveUserProfileToDBMutation = useUpdateUserProfile({
    onSuccess: (res) => {
      queryClient.refetchQueries(["currentUser"])
    },
  })

  const updateUserProfileImageMutation = useUploadImageMutation({
    onSuccess: (data: any) =>
      saveUserProfileToDBMutation.mutate({
        image: data.secure_url,
      }),
  })

  async function updateCurrentUserProfileImage(imageToBeUploaded: Blob) {
    const formData = new FormData()
    formData.append("file", imageToBeUploaded)
    formData.append("upload_preset", "profile")
    updateUserProfileImageMutation.mutate(formData)
  }

  async function updateCurrentUserProfile(data: {
    name?: string
    bio?: string
    location?: string
  }) {
    saveUserProfileToDBMutation.mutate(data)
  }

  return {
    updateCurrentUserProfileImage,
    updateCurrentUserProfile,
  }
}

export default useUserService

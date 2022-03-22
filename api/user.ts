import axios, { AxiosResponse } from "axios"
import { useMutation, UseMutationOptions, useQuery } from "react-query"
import { User } from "types/user"

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

function transformUserResponse(res: AxiosResponse<any, any>): User {
  let userData = res.data.data
  const { location, username, bio } = userData.Profile
  userData = {
    ...userData,
    location,
    username,
    bio,
  }
  delete userData["Profile"]
  return userData
}

async function fetchUser(id: string) {
  return await axios.get(`/api/account/${id}`)
}

async function updateUserProfile({
  name,
  location,
  bio,
  image,
}: {
  name?: string
  location?: string
  bio?: string
  image?: string
}) {
  return await axios.post(
    "/api/account/updateUserProfile",
    {
      name,
      location,
      bio,
      image,
    },
    {
      withCredentials: true,
    }
  )
}

export const useGetUserQuery = (id: string) => {
  return useQuery(["user", id], () => fetchUser(id), {
    refetchOnWindowFocus: false,
    select: transformUserResponse,
  })
}

export const useUpdateUserProfile = (props: CustomUseMutationOptions) => {
  return useMutation(updateUserProfile, props)
}

export const useUpdateUserProfileMutation = (
  props: CustomUseMutationOptions
) => {
  return useMutation(updateUserProfile, props)
}

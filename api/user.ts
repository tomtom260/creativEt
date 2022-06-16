import { Prisma } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import {
  QueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "react-query"
import { User } from "types/user"

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

export function transformUserResponse(res: AxiosResponse<any, any>): User {
  let userData = res.data.data
  return userData
}

export async function fetchUserWithProfile(
  id: string,
  includeTransactions = false
) {
  const user = await axios.get(
    `/api/account/${id}${
      includeTransactions ? '?includeTransactions="true"}' : ""
    }`
  )
  return user
}

export async function searchUsers(username: string) {
  const users = await axios.get(`/api/account/searchUsers?username=${username}`)
  return users
}

export async function getUser(id: string) {
  const user = await axios
    .get(`/api/auth/user?id=${id}`)
    .catch((err) => console.log(err))
  return user
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

export async function followUser(followingId: string) {
  return await (
    await axios.get(`/api/account/follow?followingId=${followingId}`)
  ).data.data
}

export async function unfollowUser(followingId: string) {
  return await (
    await axios.delete(`/api/account/follow?followingId=${followingId}`)
  ).data.data
}

export async function toggleAvailableForHire() {
  return await (
    await axios.patch(`/api/account/toggleAvailableForHire`)
  ).data.data
}

export async function getUsersAvailableForHire(filter: string, query?: string) {
  return await (
    await axios.get<{
      data: User[]
    }>(`/api/user`, {
      params: {
        query,
        filter,
      },
    })
  ).data.data
}

export const useGetUserQuery = (id: string, options?: QueryOptions) => {
  return useQuery(["user", id], () => fetchUserWithProfile(id), {
    refetchOnWindowFocus: false,
    select: transformUserResponse,
    ...options,
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

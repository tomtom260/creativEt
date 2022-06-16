import {
  fetchUserWithProfile,
  getUsersAvailableForHire,
  searchUsers,
  toggleAvailableForHire,
  transformUserResponse,
  updateEmailAndUsernameAPI,
} from "api/user"
import {
  useMutation,
  UseMutationOptions,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query"
import { followUser, unfollowUser } from "@/api/user"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { User } from "types/user"
import { Room } from "@prisma/client"

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>

export function useGetCurrentUser() {
  const [enabled, setEnabled] = useState(false)

  const { data, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      setEnabled(true)
    }
  }, [status])

  const query = useQuery(
    ["currentUser"],
    () => fetchUserWithProfile(data.user.id!, true),
    {
      select: transformUserResponse,
      enabled: enabled,
    }
  )
  return query
}

export const useUserWithProfileQuery = (
  id: string,
  options: UseQueryOptions
) => {
  return useQuery(["user", id], () => fetchUserWithProfile(id), {
    select: transformUserResponse,
    ...options,
  })
}

export const useSearchUsers = (
  username: string,
  rooms: Room[],
  options?: UseQueryOptions
) => {
  return useQuery(
    ["user:search", username],
    async () => {
      return await searchUsers(username)
    },
    {
      select: transformUserResponse,
      ...options,
      enabled: !!username,
    }
  )
}

export const useFollowUserMutation = (
  id: string,
  props?: CustomUseMutationOptions
) => {
  const queryClient = useQueryClient()
  return useMutation(followUser, {
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id])
    },
  })
}

export const useUnfollowUserMutation = (
  id: string,
  props?: CustomUseMutationOptions
) => {
  const queryClient = useQueryClient()
  return useMutation(unfollowUser, {
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id])
    },
  })
}

export const useToggleAvailableForHireMutation = (
  id: string,
  props?: CustomUseMutationOptions
) => {
  const queryClient = useQueryClient()
  return useMutation(toggleAvailableForHire, {
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id])
    },
  })
}

export const useGetUsersForHireQuery = (
  initUsers: User[],
  query?: string,
  filter
) => {
  const [users, setUsers] = useState(initUsers)
  useEffect(() => {
    if (true) {
      getUsersAvailableForHire(filter, query).then((res) => {
        setUsers(res)
      })
    }
  }, [query])

  return useQueries(
    users.map((user) => ({
      queryFn: () => fetchUserWithProfile(user.id),
      queryKey: ["user", user.id],
      initialData: { data: { data: { ...user } } },
      select: transformUserResponse,
    }))
  )
}

export function useUpdateEmailAndUsernameMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation(updateEmailAndUsernameAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id])
      queryClient.invalidateQueries("currentUser")
    },
  })
}

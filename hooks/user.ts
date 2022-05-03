import { fetchUserWithProfile, transformUserResponse } from "api/user"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "react-query"
import { followUser, unfollowUser } from "@/api/user"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

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
    () => fetchUserWithProfile(data.user.id!),
    {
      select: transformUserResponse,
      enabled: enabled,
    }
  )

  return query
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

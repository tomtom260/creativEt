import { useGetUserQuery } from "@/api/user"
import { useSession } from "next-auth/react"

export function useGetCurrentUser() {
  const { data } = useSession()
  return useGetUserQuery(data?.user?.id!)
}

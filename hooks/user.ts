import { fetchUser, transformUserResponse } from "api/user"
import { useQuery } from "react-query"

export function useGetCurrentUser(id: string, enabled: boolean) {
  const query = useQuery(["currentUser"], () => fetchUser(id), {
    select: transformUserResponse,
    enabled: enabled,
  })

  return query
}

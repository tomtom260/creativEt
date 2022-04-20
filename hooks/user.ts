import { fetchUserWithProfile, transformUserResponse } from "api/user";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "react-query";
import { followUser, unfollowUser } from "@/api/user";

type CustomUseMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  unknown,
  unknown
>;

export function useGetCurrentUser(id?: string, enabled?: boolean) {
  const query = useQuery(["currentUser"], () => fetchUserWithProfile(id!), {
    select: transformUserResponse,
    enabled: enabled,
  });

  return query;
}

export const useFollowUserMutation = (
  id: string,
  props?: CustomUseMutationOptions
) => {
  const queryClient = useQueryClient();
  return useMutation(followUser, {
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
    },
  });
};

export const useUnfollowUserMutation = (
  id: string,
  props?: CustomUseMutationOptions
) => {
  const queryClient = useQueryClient();
  return useMutation(unfollowUser, {
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
    },
  });
};

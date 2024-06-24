import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { generateUserKey } from "@/react-query/key-factories";

// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );
  return data.user;
}

// 62. Add useQuery call to useUser
export function useUser() {

  //63. setQueryData and removeQueries
  const queryClient = useQueryClient();

  // Get details on the userId
  const { userId, userToken } = useLoginData();

  // Call useQuery to update user data from server
  const { data: user } = useQuery({
    enabled: !!userId, // executer la requete si userId existe
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity, // les données ne seront jamais refetch jusqu’a expiration du gcTime
  });

  // Meant to be called from useAuth for clearing datas from cache
  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token),
      newUser
    );
  }

  // Meant to be called from useAuth for clearing datas from cache
  function clearUser() {
    // remove user profile data
    queryClient.removeQueries(
      { queryKey: [queryKeys.user] }
    );

    // remove user appointments data
    queryClient.removeQueries(
      { queryKey: [queryKeys.appointments, queryKeys.user] }
    );
  }

  return { user, updateUser, clearUser };
}

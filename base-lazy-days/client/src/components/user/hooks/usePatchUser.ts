
// 70. Update User and Query Cache with Mutation Response

import jsonpatch from "fast-json-patch";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@shared/types";
import { useCustomToast } from "@/components/app/hooks/useCustomToast";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);
  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    },
  );
  return data.user;
}

export function usePatchUser() {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();

  const { mutate: patchUser } = useMutation({
    mutationFn: (newData: User) => patchUserOnServer(newData, user),
    onSuccess: (userData: User | null) => {
      updateUser(userData),
        toast({
          title: "User updated",
          status: "success"
        })
    }
  });

  return patchUser;
}

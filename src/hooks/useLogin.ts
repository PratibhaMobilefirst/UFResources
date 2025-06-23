import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: getAccessToken,
    onSuccess: (data) => {
      const { token, user } = data.data;
      setToken(token, user);
    },
  });
};

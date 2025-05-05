import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginApi, LoginPayload } from "@/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = (): UseMutationResult<
  any,
  any,
  LoginPayload,
  unknown
> => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data: any) => {
      setAuth(
        {
          id: data.id,
          email: data.email,
          role: data.role,
          permissions: data.permissions,
        },
        data.token
      );
      toast({
        title: "Login attempt",

        description: data.message || "Welcome back! You are logged in.",
      });
      navigate("/case");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Invalid email or password";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

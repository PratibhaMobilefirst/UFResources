import axiosInstance from "./axiosInstance";

export interface LoginResponse {
  data: {
    token: string;
    user: any;
  };
}

export const getAccessToken = async (email: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    `auth/get-access-token/${email}`
  );
  return response.data;
};

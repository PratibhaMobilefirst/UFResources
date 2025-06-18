import axiosInstance from "./axiosInstance";

export interface ActiveState {
  id: string;
  stateCode: string;
  stateName: string;
  addedDate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveStatesResponse {
  status: boolean;
  message: string;
  data: {
    data: ActiveState[];
    meta: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

export const getActiveStates = async (
  page: number = 1,
  limit: number = 50
): Promise<ActiveStatesResponse> => {
  const response = await axiosInstance.get<ActiveStatesResponse>(
    `/cms/active-states?page=${page}&limit=${limit}`
  );
  return response.data;
};

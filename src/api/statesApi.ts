import axiosInstance from "./axiosInstance";

export interface State {
  id: string;
  stateCode: string;
  stateName: string;
  addedDate: string;
  status: boolean;
}

export interface StatesResponse {
  data: State[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const getStates = async (
  page: number = 1,
  limit: number = 10
): Promise<StatesResponse> => {
  const response = await axiosInstance.get<StatesResponse>(
    `/cms/states?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const toggleStateStatus = async (id: string): Promise<void> => {
  await axiosInstance.put(`/cms/toggle-status-state?id=${id}`);
}; 
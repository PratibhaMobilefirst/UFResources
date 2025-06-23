import axiosWithToken from "./axiosWithToken";

export interface AttorneyState {
  stateId: string;
  stateName: string;
}

export interface AttorneyStatesResponse {
  status: boolean;
  message: string;
  data: AttorneyState[];
}

export const getAttorneyStates = async (): Promise<AttorneyStatesResponse> => {
  const response = await axiosWithToken.get<AttorneyStatesResponse>(
    `/attorney/fetchAttorneyStates`
  );
  return response.data;
};

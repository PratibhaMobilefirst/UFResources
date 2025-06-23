import axiosInstance from "./axiosInstance";

export interface CaseData {
  id: string;
  caseName: string;
  createdAt: string;
  updatedAt: string;
  state: {
    stateName: string;
  };
  attorney: {
    firstName: string;
    email: string;
  };
}

export interface PrivateCasesParams {
  attorneyId?: string;
  isActive?: boolean;
  search?: string;
  stateId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PrivateCasesResponse {
  data: CaseData[];
  meta: {
    total: number;
    activeCases: number;
    inactiveCases: number;
    page: number;
    totalPages: number;
  };
}

export const getPrivateCases = async (
  params: PrivateCasesParams
): Promise<PrivateCasesResponse> => {
  const response = await axiosInstance.get("network-attorney/cases", {
    params,
  });
  return response.data.data;
};

interface CaseDetails {
  caseId: string;
  attorneyId: string;
  page: number;
  limit: number;
}

export const getCaseDetails = async ({
  caseId,
  attorneyId,
  page,
  limit,
}: CaseDetails): Promise<PrivateCasesResponse> => {
  const response = await axiosInstance.get(`/network-attorney/case-details`, {
    params: {
      attorneyId: attorneyId,
      caseId: caseId,
      page,
      limit,
    },
  });
  return response.data;
};

import {
  getCaseDetails,
  getPrivateCases,
  PrivateCasesParams,
  PrivateCasesResponse,
} from "@/api/PrivateCases";
import { useQuery } from "@tanstack/react-query";

export const usePrivateCases = (params: PrivateCasesParams) => {
  return useQuery<PrivateCasesResponse>({
    queryKey: ["privateCases", params],
    queryFn: () => getPrivateCases(params),
    // keepPreviousData: true,
  });
};

interface UseCaseDetailsParams {
  caseId: string;
  attorneyId: string;
  isActive?: boolean;
  page: number;
  limit: number;
}

export const useCaseDetails = ({
  caseId,
  attorneyId,
  page,
  limit,
}: UseCaseDetailsParams) => {
  return useQuery<UseCaseDetailsParams>({
    queryKey: ["caseDetails", caseId, attorneyId, page, limit],
    queryFn: () => getCaseDetails({ caseId, attorneyId, page, limit }),
    enabled: !!caseId && !!attorneyId,
  });
};

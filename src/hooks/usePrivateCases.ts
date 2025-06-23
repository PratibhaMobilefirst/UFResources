// src/hooks/usePrivateCases.ts
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
}

export const useCaseDetails = ({
  caseId,
  attorneyId,
}: UseCaseDetailsParams) => {
  return useQuery<UseCaseDetailsParams>({
    queryKey: ["caseDetails", caseId, attorneyId],
    queryFn: () => getCaseDetails({ caseId, attorneyId }),
    enabled: !!caseId && !!attorneyId,
  });
};

import {
  getPrivateCases,
  PrivateCasesParams,
  PrivateCasesResponse,
} from "@/api/PrivateCases";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AttorneyStatesResponse,
  CategoriesResponse,
  EngagementTemplatesResponse,
  getPersonalCaseDetails,
  PersonalAttorneyStates,
  PersonalCategoriesByState,
  PersonalcreateCase,
  PersonalEngagementTemplates,
  PersonalPrivateCases,
  PersonalPrivateCasesParams,
  PersonalPrivateCasesResponse,
  PersonaltoggleStatus,
} from "./../api/Personal";
import { toast } from "sonner";

export const usePersonalPrivateCases = (params: PersonalPrivateCasesParams) => {
  return useQuery<PersonalPrivateCasesResponse>({
    queryKey: ["personalPrivateCases", params],
    queryFn: () => PersonalPrivateCases(params),
  });
};

export const usePersonalAttorneyStates = () => {
  return useQuery<AttorneyStatesResponse>({
    queryKey: ["attorneyStates"],
    queryFn: PersonalAttorneyStates,
  });
};

export const usePersonalCategoriesByState = (stateId?: string) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categoriesByState", stateId],
    queryFn: () => PersonalCategoriesByState(stateId),
    enabled: !!stateId, // only fetch when state is selected
  });
};

export const usePersonalEngagementTemplates = (stateId?: string) => {
  return useQuery<EngagementTemplatesResponse>({
    queryKey: ["engagementTemplates", stateId],
    queryFn: () => PersonalEngagementTemplates(stateId!),
    enabled: !!stateId, // Only fetch if a state is selected
  });
};

export const usePersonalCreateCase = () => {
  return useMutation({
    mutationFn: PersonalcreateCase,
    onSuccess: (data) => {
      toast.success("Case created successfully ✅", {
        description:
          data?.message || "Your case has been created successfully!",
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to create case";
      toast.error("Case creation failed ❌", {
        description: message,
      });
    },
  });
};
interface UsePersonalCaseDetailsParams {
  caseId: string;
  attorneyId: string;
}
export const usePersonalCaseDetails = ({
  caseId,
  attorneyId,
}: UsePersonalCaseDetailsParams) => {
  return useQuery({
    queryKey: ["personalCaseDetails", caseId, attorneyId],
    queryFn: () => getPersonalCaseDetails({ caseId, attorneyId }),
    enabled: !!caseId && !!attorneyId, // fetch only if both are available
  });
};
export const usePersonalToggleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (caseId: string) => PersonaltoggleStatus(caseId),
    onSuccess: (data) => {
      toast.success("Case status updated ✅", {
        description: data?.message || "Case status has been toggled.",
      });
      queryClient.invalidateQueries({ queryKey: ["caseDetails"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update status";
      toast.error("Status update failed ❌", {
        description: message,
      });
    },
  });
};

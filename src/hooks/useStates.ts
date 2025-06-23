import { useQuery } from "@tanstack/react-query";
import { getAttorneyStates, AttorneyStatesResponse } from "@/api/statesApi";

export const useAttorneyStates = () => {
  return useQuery<AttorneyStatesResponse>({
    queryKey: ["attorneyStates"],
    queryFn: getAttorneyStates,
  });
};

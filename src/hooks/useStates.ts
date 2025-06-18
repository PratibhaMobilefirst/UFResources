import { ActiveStatesResponse, getActiveStates } from "@/api/statesApi";
import { useQuery } from "@tanstack/react-query";

export const useActiveStates = (page: number = 1, limit: number = 50) => {
  return useQuery<ActiveStatesResponse>({
    queryKey: ["activeStates", page, limit],
    queryFn: () => getActiveStates(page, limit),
  });
};

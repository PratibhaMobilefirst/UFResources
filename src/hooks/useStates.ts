import { useQuery } from "@tanstack/react-query";
import { getStates, StatesResponse } from "@/api/statesApi";

export const useStates = (page: number = 1, limit: number = 10) => {
  return useQuery<StatesResponse>({
    queryKey: ["states", page, limit],
    queryFn: () => getStates(page, limit),
  });
}; 
import { useQuery } from "@tanstack/react-query";
import { getCategories, CategoriesResponse } from "@/api/categoryApi";

export const useCategories = (page: number = 1, limit: number = 10) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories(page, limit),
  });
}; 
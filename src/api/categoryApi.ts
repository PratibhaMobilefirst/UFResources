import axiosInstance from "./axiosInstance";

export interface CreateCategoryPayload {
  templateName: string;
}

export interface CreateCategoryResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    templateName: string;
    // Add other fields if they come in the response
  };
}

export interface Category {
  id: string;
  templateName: string;
  addedDate: string;
  status: boolean;
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<CreateCategoryResponse> => {
  const response = await axiosInstance.post<CreateCategoryResponse>(
    "/cms/create",
    payload
  );
  return response.data;
};

export const getCategories = async (
  page: number = 1,
  limit: number = 10
): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get<CategoriesResponse>(
    `/cms/categories?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const toggleCategoryStatus = async (categoryId: string): Promise<void> => {
  await axiosInstance.put(`/cms/toggle-status-category`, { categoryId });
}; 
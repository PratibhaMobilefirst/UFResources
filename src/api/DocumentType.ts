import axiosWithToken from "./axiosWithToken";

export interface Document {
  id: string;
  documentName: string;
  url: string;
  approvalStatus: string;
  submitType: string;
  stateName: string;
  categoryName: string;
  createdAt: string;
}

export interface TemplateCard {
  id: string;
  templateCardName: string;
  attorneyType: string;
  categories: string[];
  documents: Document[];
}

export interface TemplateCardsResponse {
  status: boolean;
  message: string;
  data: {
    data: TemplateCard[];
    meta: {
      totalTemplateCards: number;
      page: number;
      totalPages: number;
    };
  };
}

export const getTemplateCardsByState = async (
  stateId: string
): Promise<TemplateCardsResponse> => {
  const response = await axiosWithToken.get<TemplateCardsResponse>(
    `/network-attorney/template-cards-by-state?stateId=${stateId}`
  );
  return response.data;
};

export const getTemplateCardsByStatePersonal = async (
  stateId: string
): Promise<TemplateCardsResponse> => {
  const response = await axiosWithToken.get<TemplateCardsResponse>(
    `/private-attorney/private-template-cards-by-state?stateId=${stateId}`
  );
  return response.data;
};

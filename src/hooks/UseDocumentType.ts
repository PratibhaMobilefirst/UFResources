import {
  getTemplateCardsByState,
  getTemplateCardsByStatePersonal,
  TemplateCardsResponse,
} from "@/api/DocumentType";
import { useQuery } from "@tanstack/react-query";

export const useDocumentType = (stateId: string) => {
  return useQuery<TemplateCardsResponse>({
    queryKey: ["templateCards", stateId],
    queryFn: () => getTemplateCardsByState(stateId),
    enabled: !!stateId, // only fetch when stateId is provided
  });
};
export const useDocumentTypePersonal = (stateId: string) => {
  return useQuery<TemplateCardsResponse>({
    queryKey: ["templateCards", stateId],
    queryFn: () => getTemplateCardsByStatePersonal(stateId),
    enabled: !!stateId, // only fetch when stateId is provided
  });
};

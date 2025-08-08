import {
  fetchEditDocument,
  fetchPrivateEditDocument,
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
export const useEditDocument = (templateDocumentId: string) => {
  return useQuery({
    queryKey: ["edit-document", templateDocumentId],
    queryFn: () => fetchEditDocument(templateDocumentId),
    enabled: !!templateDocumentId, // don't fetch if ID is missing
    refetchOnWindowFocus: false,
  });
};
export const useDocumentTypePersonal = (stateId: string) => {
  return useQuery<TemplateCardsResponse>({
    queryKey: ["templateCards", stateId],
    queryFn: () => getTemplateCardsByStatePersonal(stateId),
    enabled: !!stateId, // only fetch when stateId is provided
  });
};

export const usePrivateEditDocument = (documentId: string) => {
  return useQuery({
    queryKey: ["private-edit-document", documentId],
    queryFn: () => fetchPrivateEditDocument(documentId),
    enabled: !!documentId,
  });
};

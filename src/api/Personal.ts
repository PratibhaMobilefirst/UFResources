import axiosWithToken from "./axiosWithToken";

export interface State {
  stateName: string;
}

export interface Attorney {
  firstName: string;
  email: string;
}

export interface Document {
  id: string;
  documentName: string;
  documentType: string;
  createdAt: string;
}

export interface EngagementLetter {
  id: string;
  letterType: string;
  signedStatus: boolean;
  createdAt: string;
}

export interface PersonalPrivateCase {
  id: string;
  attorneyId: string;
  stateId: string;
  isActive: boolean;
  caseName: string;
  clientName: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  state: State;
  attorney: Attorney;
  documents: Document[];
  engagementLetters: EngagementLetter[];
}

export interface PersonalPrivateCasesParams {
  attorneyId?: string;
  isActive?: boolean;
  search?: string;
  stateId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PersonalPrivateCasesResponse {
  status: boolean;
  message: string;
  data: {
    data: PersonalPrivateCase[];
    meta: {
      total: number;
      activeCases: number;
      inactiveCases: number;
      page: number;
      totalPages: number;
    };
  };
}

export const PersonalPrivateCases = async (
  params: PersonalPrivateCasesParams
): Promise<PersonalPrivateCasesResponse> => {
  const response = await axiosWithToken.get("/private-attorney/private-cases", {
    params,
  });
  return response.data;
};

export interface AttorneyState {
  stateId: string;
  stateName: string;
}

export interface AttorneyStatesResponse {
  status: boolean;
  message: string;
  data: AttorneyState[];
}

export const PersonalAttorneyStates =
  async (): Promise<AttorneyStatesResponse> => {
    const response = await axiosWithToken.get("/attorney/fetchAttorneyStates");
    return response.data;
  };

export interface Category {
  id: string;
  templateName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
}

export const PersonalCategoriesByState = async (
  stateId: string
): Promise<CategoriesResponse> => {
  const response = await axiosWithToken.get(
    `/private-attorney/template-categories`,
    {
      params: { stateId },
    }
  );
  return response.data;
};

export interface EngagementTemplate {
  id: string;
  documentName: string;
  url: string;
  approvalStatus: string;
  submitType: string;
  createdAt: string;
}

export interface EngagementTemplatesResponse {
  status: boolean;
  message: string;
  data: EngagementTemplate[];
}

export const PersonalEngagementTemplates = async (
  stateId: string
): Promise<EngagementTemplatesResponse> => {
  const response = await axiosWithToken.get(
    `/private-attorney/engagement-letter-templates`,
    { params: { stateId } }
  );
  return response.data;
};

interface CreateCasePayload {
  attorneyId: string;
  caseName: string;
  stateId: string;
  clientName: string;
  categoryId: string;
  engagementLetterTemplateId: string;
}

export const PersonalcreateCase = async (payload: CreateCasePayload) => {
  const { attorneyId, ...rest } = payload;
  const response = await axiosWithToken.post(
    `/private-attorney/private-cases`,
    rest,
    { params: { attorneyId } } // 👈 pass attorneyId in query params
  );
  return response.data;
};

export const getPersonalCaseDetails = async ({
  caseId,
  attorneyId,
}: {
  caseId: string;
  attorneyId: string;
}) => {
  const { data } = await axiosWithToken.get(
    `/private-attorney/private-case-details`,
    {
      params: {
        caseId,
        attorneyId,
      },
    }
  );
  return data;
};

export const PersonaltoggleStatus = async (caseId: string) => {
  const { data } = await axiosWithToken.patch(
    `/private-attorney/private-case/toggle-status`,
    {},
    { params: { caseId } } // Pass as query param
  );
  return data;
};

export const downloadPersonalDocument = async (documentId: string) => {
  try {
    const response = await axiosWithToken.get(
      `/private-attorney/export-document`,
      {
        params: { documentId },
        responseType: "blob", // Ensure binary download
      }
    );

    // Try to extract filename from content-disposition header
    const contentDisposition = response.headers["content-disposition"];
    let filename = "downloaded-document";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+?)"/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    // Create blob URL and trigger download
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename); // filename will have correct extension from header
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download document", error);
    alert("Failed to download document. Please try again.");
  }
};

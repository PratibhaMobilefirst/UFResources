import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import PDFCanvasViewer from "@/components/PDFCanvasViewer";
import { usePersonalCaseDetails } from "@/hooks/UsePersonal";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export function PersonalDetailPage() {
  const { state } = useLocation();
  const { template, id } = state;
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );
  const handleNavigateEngagementLetter = () => {
    navigate(`/engagement-letter/${id}`);
  };
  const handleNavigateDocument = () => {
    navigate("/personal-create-document");
  };

  const handlePreview = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setIsPreviewOpen(true);
  };
  const handleNavigationEditDocument = (id: string) => {
    navigate(`/personal-edit-document/${id}`);
  };
  console.log(id?.attorneyId, template, "template");

  const { data, isLoading, isError, refetch } = usePersonalCaseDetails({
    caseId: id,
    attorneyId: template?.attorneyId,
  });

  return (
    <Layout>
      <div className=" bg-white container mx-auto p-6 max-w-full">
        <div className="flex-1 p-6">
          <DocumentContent
            data={data}
            showEngagementLetter={true}
            handleNavigateEngagementLetter={handleNavigateEngagementLetter}
            handleNavigateDocument={handleNavigateDocument}
            caseId={id}
            refetch={refetch}
            handlePreview={handlePreview}
            handleEditDocument={handleNavigationEditDocument}
          />
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-6xl max-h-[100vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogClose className="absolute top-4 right-4" />
          </DialogHeader>
          <div className="relative max-h-[80vh] overflow-auto">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-2 right-2 z-10 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close Preview
            </button>
            {selectedDocumentId ? (
              <PDFCanvasViewer
                documentId={selectedDocumentId}
                apiType="personal"
              />
            ) : (
              <p className="text-center text-gray-500 mt-20">
                No document selected.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

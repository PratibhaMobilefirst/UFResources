import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import PDFCanvasViewer from "@/components/PDFCanvasViewer";

export function LegacyAssuranceDetail() {
  const { state } = useLocation();
  const { template, id } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );
  console.log({ selectedDocumentId }, "selectedDocumentId");
  console.log({ totalPages }, "----totalPages-----");
  const pageSize = 10;

  console.log(id?.attorneyId, template, "template");
  const { data, isLoading, isError } = useCaseDetails({
    caseId: template,
    attorneyId: id?.attorneyId,
    page: currentPage,
    limit: pageSize,
  });
  console.log({ data }, "----data-----");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.meta?.totalPages) {
      setTotalPages(data?.data?.meta?.totalPages);
    }
  }, [data?.data]);

  const handleNavigateEngagementLetter = () => {
    navigate("/create-engagement-letter");
  };
  const handleNavigateDocument = () => {
    navigate("/create-document");
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePreview = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setIsPreviewOpen(true);
  };
  const handleEditDocument = (documentId: string) => {
    navigate(`/edit-document/${documentId}`);
  };
  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full bg-white">
        <div className="flex-1 p-6">
          <DocumentContent
            data={data?.data}
            showEngagementLetter={false}
            handleNavigateEngagementLetter={handleNavigateEngagementLetter}
            handleNavigateDocument={handleNavigateDocument}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            handlePreview={handlePreview}
            handleEditDocument={handleEditDocument}
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
                apiType="legacy"
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

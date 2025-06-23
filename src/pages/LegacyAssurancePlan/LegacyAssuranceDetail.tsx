import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LegacyAssuranceDetail() {
  const { state } = useLocation();
  const { template, id } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  }, [data]);

  const handleNavigateEngagementLetter = () => {
    navigate("/create-engagement-letter");
  };
  const handleNavigateDocument = () => {
    navigate("/create-document");
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full bg-white">
        <div className="flex-1 p-6">
          <DocumentContent
            data={data}
            showEngagementLetter={false}
            handleNavigateEngagementLetter={handleNavigateEngagementLetter}
            handleNavigateDocument={handleNavigateDocument}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}

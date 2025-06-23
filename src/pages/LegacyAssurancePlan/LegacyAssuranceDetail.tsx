import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useLocation, useNavigate } from "react-router-dom";

export function LegacyAssuranceDetail() {
  const { state } = useLocation();
  const { template, id } = state;

  console.log(id?.attorneyId, template, "template");
  const { data, isLoading, isError } = useCaseDetails({
    caseId: template,
    attorneyId: id?.attorneyId,
  });
  const navigate = useNavigate();

  const handleNavigateEngagementLetter = () => {
    navigate("/create-engagement-letter");
  };
  const handleNavigateDocument = () => {
    navigate("/create-document");
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
          />
        </div>
      </div>
    </Layout>
  );
}

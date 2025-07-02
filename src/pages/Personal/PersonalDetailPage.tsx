import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useLocation, useNavigate } from "react-router-dom";

export function PersonalDetailPage() {
  const { state } = useLocation();
  const { template, id } = state;
   const navigate = useNavigate();
  const handleNavigateEngagementLetter = () => {
    navigate(`/engagement-letter/${id }`);
  };
    const handleNavigateDocument = () => {
    navigate("/personal-create-document");
  };
  console.log(id?.attorneyId, template, "template");
  const { data, isLoading, isError } = useCaseDetails({
    caseId: template,
    attorneyId: id?.attorneyId,
    page: 1,
    limit: 10,
  });
  return (
    <Layout>
      <div className=" bg-white container mx-auto p-6 max-w-full">
        <div className="flex-1 p-6">
          <DocumentContent data={data} showEngagementLetter={true} handleNavigateEngagementLetter={handleNavigateEngagementLetter} handleNavigateDocument={handleNavigateDocument}/>
        </div>
      </div>
    </Layout>
  );
}

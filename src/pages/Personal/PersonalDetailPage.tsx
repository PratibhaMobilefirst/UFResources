import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { useLocation } from "react-router-dom";

export function PersonalDetailPage() {
  const { state } = useLocation();
  const { template, id } = state;

  console.log(id?.attorneyId, template, "template");
  const { data, isLoading, isError } = useCaseDetails({
    caseId: template,
    attorneyId: id?.attorneyId,
  });
  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full">
        <div className="flex-1 p-6">
          <DocumentContent data={data} showEngagementLetter={true} />
        </div>
      </div>
    </Layout>
  );
}

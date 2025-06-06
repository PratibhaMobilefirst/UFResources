import { DocumentContent } from "@/components/DocumentContent";
import Layout from "@/components/Layout";

export function LegacyAssuranceDetail() {
  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full">
        <div className="flex-1 p-6">
          <DocumentContent />
        </div>
      </div>
    </Layout>
  );
}

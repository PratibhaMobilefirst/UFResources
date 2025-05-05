import Layout from "@/components/Layout";
import CaseDetail from "@/pages/Legal Assurance Plan/CaseDetail";
import CaseList from "./Legal Assurance Plan/CaseList";
import { useParams } from "react-router-dom";


const AttorneyProfile = () => {
  const { id } = useParams();
  return (
    <Layout>
    
      {id ? <CaseDetail /> : <CaseList />}
    </Layout>
  );
};

export default AttorneyProfile;

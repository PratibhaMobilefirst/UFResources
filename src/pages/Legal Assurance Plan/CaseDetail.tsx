import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

// Use the same cases array as in CaseList, or fetch by ID in real app
const cases = [
  {
    id: "001",
    name: "Anderson Trust Creation",
    states: ["California", "Texas", "New York"],
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Active",
    finishedDate: "",
  },
  {
    id: "002",
    name: "Miller Estate Administration",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "003",
    name: "Brown Living Trust Review",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "004",
    name: "Johnson Family Will Drafting",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "005",
    name: "Parker Revocable Trust Setup",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "006",
    name: "Evans Guardianship Designation Draft",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "007",
    name: "Carter Beneficiary Designation Review",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "008",
    name: "Murphy Estate Tax Planning Advisory",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "009",
    name: "Murphy Estate Tax Planning Advisory",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
  {
    id: "010",
    name: "Murphy Estate Tax Planning Advisory",
    state: "California",
    client: "Jack Russle",
    created: "1.2.2024",
    status: "Finished",
    finishedDate: "3.2.2024",
  },
];

const engagementLetters = [
  { sno: "003", type: "Engagement Letter", created: "1.2.2024", modified: "1.2.2024", status: "Completed", signing: "Yes" },
  { sno: "002", type: "Engagement Letter", created: "30.1.2024", modified: "30.1.2024", status: "", signing: "NA" },
  { sno: "001", type: "Engagement Letter", created: "28.1.2024", modified: "28.1.2024", status: "", signing: "NA" },
];

const documents = [
  { sno: "001", name: "Simple Will", updated: "1.2.2024", status: "In Progress" },
  { sno: "002", name: "Simplified Estate Plan", updated: "1.2.2024", status: "In Progress" },
  { sno: "003", name: "Power of Attorney", updated: "1.2.2024", status: "Completed" },
];

const CaseDetail = () => {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const caseInfo = cases.find((c) => c.id === id);

  if (!caseInfo) return <div>Case not found</div>;

  const showMultipleStates = Array.isArray(caseInfo.states) && caseInfo.states.length > 1;
  const stateOptions = caseInfo.states || (caseInfo.state ? [caseInfo.state] : []);
  const docTypes = ["Engagement Letter", "Other Document Type"];

  return (
<SidebarProvider>
  <>
    <div className="flex min-h-screen  bg-mute">
      <Sidebar />
      </div>
    <div className="bg-white w-full rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">{caseInfo.name}</h2>
          <div className="flex gap-8 text-sm text-gray-600">
            <div><span className="font-semibold">Case ID:</span> {caseInfo.id}</div>
            {showMultipleStates ? (
              <div><span className="font-semibold">States:</span> {caseInfo.states.join(", ")}</div>
            ) : (
              <div><span className="font-semibold">State:</span> {caseInfo.state || (caseInfo.states && caseInfo.states[0])}</div>
            )}
            <div><span className="font-semibold">Client Name:</span> {caseInfo.client}</div>
            <div><span className="font-semibold">Created Date:</span> {caseInfo.created}</div>
            {caseInfo.status === "Finished" && (
              <div><span className="font-semibold">Finished Date:</span> {caseInfo.finishedDate}</div>
            )}
          </div>
        </div>
        <span className={`px-4 py-1 rounded-full font-semibold text-sm ${
          caseInfo.status === "Finished" ? "bg-green-500 text-white" : "bg-yellow-400 text-white"
        }`}>
          {caseInfo.status}
        </span>
      </div>

      {/* Engagement Letter Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Engagement Letter</h3>
          <div className="flex gap-2">
            <button className="bg-[#00426E] text-white px-4 py-2 rounded" onClick={() => navigate(`/case/${id}/create-engagement-letter`)}>Create Engagement letter</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => navigate(`/case/${id}/upload`)}>Upload</button>
          </div>
        </div>
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F5FAFF]">
              <tr>
                <th className="px-4 py-2 text-left">S.no</th>
                <th className="px-4 py-2 text-left">Document Type</th>
                <th className="px-4 py-2 text-left">Created on</th>
                <th className="px-4 py-2 text-left">Last Modified</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Signing Status</th>
                <th className="px-4 py-2 text-left">Preview</th>
                <th className="px-4 py-2 text-left">Modify</th>
                <th className="px-4 py-2 text-left">Export</th>
              </tr>
            </thead>
            <tbody>
              {engagementLetters.map((doc) => (
                <tr key={doc.sno} className="border-t">
                  <td className="px-4 py-2">{doc.sno}</td>
                  <td className="px-4 py-2">{doc.type}</td>
                  <td className="px-4 py-2">{doc.created}</td>
                  <td className="px-4 py-2">{doc.modified}</td>
                  <td className="px-4 py-2">
                    {doc.status ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{doc.status}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{doc.signing}</td>
                  <td className="px-4 py-2"><button className="text-[#00426E]">👁️</button></td>
                  <td className="px-4 py-2"><button className="text-[#00426E]">✏️</button></td>
                  <td className="px-4 py-2"><button className="text-gray-400 cursor-not-allowed">⏬</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Document</h3>
          <button className="bg-[#00426E] text-white px-4 py-2 rounded">Create Document</button>
        </div>
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F5FAFF]">
              <tr>
                <th className="px-4 py-2 text-left">S.no</th>
                <th className="px-4 py-2 text-left">Case Name</th>
                <th className="px-4 py-2 text-left">Last Updated</th>
                <th className="px-4 py-2 text-left">Document Status</th>
                <th className="px-4 py-2 text-left">Preview</th>
                <th className="px-4 py-2 text-left">Edit Document</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.sno} className="border-t">
                  <td className="px-4 py-2">{doc.sno}</td>
                  <td className="px-4 py-2">{doc.name}</td>
                  <td className="px-4 py-2">{doc.updated}</td>
                  <td className="px-4 py-2">
                    {doc.status === "Completed" ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Completed</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">In Progress</span>
                    )}
                  </td>
                  <td className="px-4 py-2"><button className="text-[#00426E]">👁️</button></td>
                  <td className="px-4 py-2"><button className="text-[#00426E]">✏️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Previous</button>
          <span className="text-sm text-gray-500">Page 1 of 10</span>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
    </>
    </SidebarProvider>
  );
};

export default CaseDetail; 
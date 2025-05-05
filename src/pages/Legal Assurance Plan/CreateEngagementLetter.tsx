// import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import Sidebar from "@/components/Sidebar";

// // Use the same cases array as in CaseDetail.tsx
// const cases = [
//   {
//     id: "001",
//     name: "Anderson Trust Creation",
//     states: ["California", "Texas", "New York"],
//     state: "California",
//     client: "Jack Russle",
//     created: "1.2.2024",
//     status: "Active",
//     finishedDate: "",
//   },
//   // ...add all other cases here as in CaseDetail.tsx
// ];

// const docTypes = ["Engagement Letter", "Other Document Type"];

// const CreateEngagementLetter = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const caseInfo = cases.find((c) => c.id === id);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDocType, setSelectedDocType] = useState("");

//   if (!caseInfo) return <div>Case not found</div>;

//   const showMultipleStates = Array.isArray(caseInfo.states) && caseInfo.states.length > 1;
//   const stateOptions = caseInfo.states || (caseInfo.state ? [caseInfo.state] : []);

//   return (
//     <>
//     <SidebarProvider>
//    <div className="flex min-h-screen w-full bg-muted">
//    <Sidebar />
//    </div>
//    </SidebarProvider>
//     <div className="bg-white w-full rounded-lg shadow p-6">
//       <div className="flex items-center mb-4">
//         <button onClick={() => navigate(-1)} className="mr-2 text-xl">←</button>
//         <span className="font-semibold text-lg">Create Engagement Letter</span>
//       </div>
//       <hr className="mb-6" />
//       <div className="mb-6">
//         <div className="font-semibold text-lg mb-4">Choose a Template</div>
//         {showMultipleStates && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Select State</label>
//             <select
//               className="border rounded px-3 py-2 w-full"
//               value={selectedState}
//               onChange={e => setSelectedState(e.target.value)}
//             >
//               <option value="">Select State</option>
//               {stateOptions.map((s) => (
//                 <option key={s} value={s}>{s}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Document type</label>
//           <select
//             className="border rounded px-3 py-2 w-full"
//             value={selectedDocType}
//             onChange={e => setSelectedDocType(e.target.value)}
//           >
//             <option value="">Select Document type</option>
//             {docTypes.map((d) => (
//               <option key={d} value={d}>{d}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <button className="bg-[#00426E] text-white px-8 py-2 rounded" onClick={() => {/* handle next */}}>Next</button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default CreateEngagementLetter; 


import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Use the same cases array as in CaseDetail.tsx
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
  // ...add all other cases here as in CaseDetail.tsx
];

const docTypes = ["Engagement Letter", "Other Document Type"];

const CreateEngagementLetter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseInfo = cases.find((c) => c.id === id);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");

  if (!caseInfo) return <div>Case not found</div>;

  const showMultipleStates = Array.isArray(caseInfo.states) && caseInfo.states.length > 1;
  const stateOptions = caseInfo.states || (caseInfo.state ? [caseInfo.state] : []);

  return (
    
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider ><Sidebar />
      
      <div className=" w-full min-h-screen  flex-1 flex-col">
        <header className="bg-white py-3 px-4 border-b flex justify-end gap-2">
          <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-md shadow p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => navigate(-1)} 
                className="mr-2 text-blue-600 hover:bg-blue-50 p-1 rounded"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-lg font-semibold">Create Engagement Letter</span>
            </div>
            
            <div className="mb-8">
              <h2 className="text-base font-medium mb-4">Choose a Template</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Select State</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Document type</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedDocType}
                    onChange={e => setSelectedDocType(e.target.value)}
                  >
                    <option value="">Select Document type</option>
                    {docTypes.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => {/* handle next */}}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
      </SidebarProvider>
      </div>
  );
};

export default CreateEngagementLetter;
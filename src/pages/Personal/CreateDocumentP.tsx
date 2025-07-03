import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, FileText, ScrollText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentTypeCard } from "@/components/ui/DocumentTypeCard";
import { useAttorneyStates } from "@/hooks/useStates";
import { useDocumentType } from "@/hooks/UseDocumentType";
import BackArrow from "../../asset/img/Group 37878.svg"
import TemplateList from "@/components/TemplateList";
import DocumentEditor from "./DocumentEditor";
const CreateDocumentP = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useAttorneyStates();
  const {
    data: templateCardsData,
    isLoading: isLoadingTemplateCards,
    error: templateCardsError,
  } = useDocumentType(selectedState);

  console.log(templateCardsData?.data?.data[0].documents, "templateCardsData");

const template = [
  {
    id: "simple-will",
    templateCardName: "Simple Will",
    categories: [{ category: { templateName: "Will" } }],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "simplified-estate-planning",
    templateCardName: "Simplified Estate Planning",
    categories: [{ category: { templateName: "Estate" } }],
    icon: <ScrollText className="w-6 h-6" />,
  },
  {
    id: "power-of-attorney",
    templateCardName: "Power of Attorney",
    categories: [{ category: { templateName: "Legal" } }],
    icon: <Shield className="w-6 h-6" />,
  },
];
  // const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When Next is clicked, open file dialog
  const handleNext = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset for re-selection
      fileInputRef.current.click();
    }
  };

  // When file is selected, show the editor
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowEditor(true);
    }
  };

  // If editor should be shown, render it
  if (showEditor && selectedFile) {
    return (
      <DocumentEditor
        onBack={() => setShowEditor(false)}
        initialFile={selectedFile}
      />
    );
  }

  // const handleNext = () => {
    // if (selectedState && selectedDocumentType) {
    //   console.log("Creating document with:", {
    //     state: selectedState,
    //     documentType: selectedDocumentType,
    //   });
      // Navigate to the next step or create the document
      // navigate("/document-editor")
    // }
  // };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <button
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  onClick={() => navigate(-1)}
                >
                  <img src={BackArrow} className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                  Create Document
                </h1>
              </div>
              <div className="border-b border-gray-200"></div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Choose a Template Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Choose a Template
                  </h2>

                  {/* State Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select State 
                    </label>
                    <div className="max-w-xs">
                      <Select
                        value={selectedState}
                        onValueChange={setSelectedState}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {data?.data?.map((state) => (
                            <SelectItem
                              key={state?.stateId}
                              value={state.stateId}
                            >
                              {state.stateName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Document Type Selection */}
                  <div className="mb-40">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Document type
                    </label>
                    <div className="max-w-xs mb-4">
                      <Select
                        value={selectedDocumentType}
                        onValueChange={setSelectedDocumentType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {template.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.templateCardName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                     {/* Document Type Cards  */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                      {docume.map((type) => (
                        <DocumentTypeCard
                          key={type.id}
                          title={type.title}
                          isSelected={selectedDocumentType === type.id}
                          onClick={() => setSelectedDocumentType(type.id)}
                          icon={type.icon}
                        />
                      ))}
                    </div> */}
                    <div className="p-5 bg-gray-50 border">
                    <TemplateList
                      templates={template}
                      isLoading={false}
                      isError={false} handleNavigate={function (id: string, templateData: any): void {
                        throw new Error("Function not implemented.");
                      } }               
              /> </div>
                  </div> 
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-6 mt-10 ">
                  <Button
                    onClick={handleNext}
                    // disabled={!selectedState || !selectedDocumentType}
                    className="bg-[#00426E] hover:bg-[#00426E] text-white px-12 py-2 font-medium"
                  >
                    Next
                  </Button>
 <input
                  type="file"
                  accept=".doc,.docx,.txt"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDocumentP;
// import { useNavigate, useParams } from "react-router-dom";
// import { useRef, useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { ArrowLeft, ChevronDown } from "lucide-react";
// import DocumentEditor from "./DocumentEditor";

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

// const documentTemplates = [
//   { name: "Simple Will", type: "Will" },
//   { name: "Simplified Estate Planning", type: "Will" },
//   { name: "Power of Attorney", type: "Will" },
// ];

// const CreateDocument = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const caseInfo = cases.find((c) => c.id === id);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDocType, setSelectedDocType] = useState("");
//   const [showEditor, setShowEditor] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // if (!caseInfo) return <div>Case not found</div>;

//   const showMultipleStates = Array.isArray(caseInfo.states) && caseInfo.states.length > 1;
//   const stateOptions = caseInfo.states || (caseInfo.state ? [caseInfo.state] : []);

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // When Next is clicked, open file dialog
//   const handleNext = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // reset for re-selection
//       fileInputRef.current.click();
//     }
//   };

//   // When file is selected, show the editor
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setShowEditor(true);
//     }
//   };

//   // If editor should be shown, render it
//   if (showEditor && selectedFile) {
//     return (
//       <DocumentEditor
//         onBack={() => setShowEditor(false)}
//         initialFile={selectedFile}
//       />
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SidebarProvider>
//         <Sidebar />  
//         <div className="w-full min-h-screen flex-1 flex-col">
//           <header className="bg-white py-3 px-4 border-b flex justify-end gap-2"></header>
//           <main className="flex-1 p-6 overflow-auto">
//             <div className="max-w-4xl mx-auto bg-white rounded-md shadow p-6">
//               <div className="flex items-center mb-6">
//                 <button onClick={() => navigate(-1)} className="mr-2 text-blue-600 hover:bg-blue-50 p-1 rounded">
//                   <ArrowLeft size={20} />
//                 </button>
//                 <span className="text-lg font-semibold">Create Document</span>
//               </div>
//               <div className="mb-8">
//                 <h2 className="text-base font-medium mb-4">Choose a Template</h2>
//                 {showMultipleStates && (
//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-600 mb-1">Select State</label>
//                     <div className="relative">
//                       <select
//                         className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700"
//                         value={selectedState}
//                         onChange={e => setSelectedState(e.target.value)}
//                       >
//                         <option value="">Select State</option>
//                         {stateOptions.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <ChevronDown size={16} className="text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className="mb-4">
//                   <label className="block text-sm text-gray-600 mb-1">Document type</label>
//                   <div className="relative">
//                     <select
//                       className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700"
//                       value={selectedDocType}
//                       onChange={e => setSelectedDocType(e.target.value)}
//                     >
//                       <option value="">Select Document type</option>
//                       <option value="Will">Will</option>
//                       {/* Add more types as needed */}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <ChevronDown size={16} className="text-gray-500" />
//                     </div>
//                   </div>
//                 </div>
//                 {/* Document cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//                   {documentTemplates
//                     .filter(doc => !selectedDocType || doc.type === selectedDocType)
//                     .map((doc) => (
//                       <div key={doc.name} className="border rounded p-4 flex flex-col items-center">
//                         <div className="text-4xl mb-2">📄</div>
//                         <div className="font-semibold">{doc.name}</div>
//                         <div className="text-xs text-gray-500">{doc.type}</div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
//                   onClick={handleNext}
//                 >
//                   Next
//                 </button>
//                 <input
//                   type="file"
//                   accept=".doc,.docx,.txt"
//                   ref={fileInputRef}
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>
//           </main>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// };

// export default CreateDocument;
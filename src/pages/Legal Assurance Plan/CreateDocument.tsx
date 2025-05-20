import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DocumentEditor from "@/pages/Upload Template/DocumentEditor";

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

const documentTemplates = [
  { name: "Simple Will", type: "Will" },
  { name: "Simplified Estate Planning", type: "Will" },
  { name: "Power of Attorney", type: "Will" },
];

const CreateDocument = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseInfo = cases.find((c) => c.id === id);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!caseInfo) return <div>Case not found</div>;

  const showMultipleStates = Array.isArray(caseInfo.states) && caseInfo.states.length > 1;
  const stateOptions = caseInfo.states || (caseInfo.state ? [caseInfo.state] : []);

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

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider>
        <Sidebar />  
        <div className="w-full min-h-screen flex-1 flex-col">
          <header className="bg-white py-3 px-4 border-b flex justify-end gap-2"></header>
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-md shadow p-6">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-2 text-blue-600 hover:bg-blue-50 p-1 rounded">
                  <ArrowLeft size={20} />
                </button>
                <span className="text-lg font-semibold">Create Document</span>
              </div>
              <div className="mb-8">
                <h2 className="text-base font-medium mb-4">Choose a Template</h2>
                {showMultipleStates && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Select State</label>
                    <div className="relative">
                      <select
                        className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700"
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
                )}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Document type</label>
                  <div className="relative">
                    <select
                      className="w-full border border-gray-300 rounded py-2 pl-3 pr-10 appearance-none bg-white text-gray-700"
                      value={selectedDocType}
                      onChange={e => setSelectedDocType(e.target.value)}
                    >
                      <option value="">Select Document type</option>
                      <option value="Will">Will</option>
                      {/* Add more types as needed */}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                {/* Document cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {documentTemplates
                    .filter(doc => !selectedDocType || doc.type === selectedDocType)
                    .map((doc) => (
                      <div key={doc.name} className="border rounded p-4 flex flex-col items-center">
                        <div className="text-4xl mb-2">📄</div>
                        <div className="font-semibold">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
                  onClick={handleNext}
                >
                  Next
                </button>
                <input
                  type="file"
                  accept=".doc,.docx,.txt"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CreateDocument;
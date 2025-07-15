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
import DocumentEditor from "../Personal/DocumentEditor";
const CreateDocument = () => {
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
  //   if (selectedState && selectedDocumentType) {
  //     console.log("Creating document with:", {
  //       state: selectedState,
  //       documentType: selectedDocumentType,
  //     });
  //     // Navigate to the next step or create the document
  //   }
  // };

  return (
    <Layout>
      <div className="">
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

                    {/* Document Type Cards *
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                      {documentTypes.map((type) => (
                        <DocumentTypeCard
                          key={type.id}
                          title={type.title}
                          isSelected={selectedDocumentType === type.id}
                          onClick={() => setSelectedDocumentType(type.id)}
                          icon={type.icon}
                        />
                      ))}
                    </div>*/}
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

export default CreateDocument;

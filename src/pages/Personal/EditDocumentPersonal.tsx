import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAttorneyStates } from "@/hooks/useStates";
import {
  useDocumentTypePersonal,
  usePrivateEditDocument,
} from "@/hooks/UseDocumentType";
import BackArrow from "../../asset/img/Group 37878.svg";
import TemplateList from "@/components/TemplateList";
import DocumentEditor from "./DocumentEditor";

const EditDocumentPersonal = () => {
  const { id: documentId } = useParams();
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { data: statesData } = useAttorneyStates();
  const { data: templateCardsData } = useDocumentTypePersonal(selectedState);
  const { data: privateDocData } = usePrivateEditDocument(documentId || "");

  useEffect(() => {
    if (privateDocData?.data) {
      setSelectedState(privateDocData.data.stateId);
      setSelectedDocumentType(privateDocData.data.document.id); // Set to document.id
    }
  }, [privateDocData]);

  // Pre-populate templateCardsDataV1 with privateDocData if available
  const templateCardsDataV1 = [
    ...(privateDocData?.data
      ? [
          {
            id: privateDocData.data.document.id,
            templateCardName: privateDocData.data.document.documentName,
            categories: [{ category: { templateName: "N/A" } }],
            stateName: privateDocData.data.stateName,
          },
        ]
      : []),
    ...(templateCardsData?.data?.map((item) => ({
      id: item.id || "",
      templateCardName: item.documentName || "",
      categories: [{ category: { templateName: item.categoryName || "N/A" } }],
      stateName: item.stateName || "",
    })) || []),
  ];

  const handleNext = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowEditor(true);
    }
  };

  if (showEditor && selectedFile) {
    return (
      <DocumentEditor
        onBack={() => setShowEditor(false)}
        initialFile={selectedFile}
      />
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <Card className="w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-4">
              <button
                className="flex items-center text-gray-600 hover:text-gray-800"
                onClick={() => navigate(-1)}
              >
                <img src={BackArrow} alt="Back" className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Edit Document
              </h1>
            </div>
            <div className="border-b border-gray-200"></div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Choose a Template
                </h2>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select State
                  </label>
                  <div className="max-w-xs">
                    <Select
                      value={selectedState}
                      onValueChange={(newState) => {
                        setSelectedState(newState);
                        setSelectedDocumentType(""); // Reset document type when state changes
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {statesData?.data?.map((state) => (
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

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Document Type
                  </label>
                  <div className="max-w-xs mb-4">
                    <Select
                      value={selectedDocumentType}
                      onValueChange={setSelectedDocumentType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {templateCardsDataV1.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.templateCardName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-5 bg-gray-50 border">
                  <TemplateList
                    templates={
                      !selectedDocumentType || selectedDocumentType === "all"
                        ? templateCardsDataV1
                        : templateCardsDataV1.filter(
                            (template) => template.id === selectedDocumentType
                          )
                    }
                    isLoading={false}
                    isError={false}
                    handleNavigate={() => {}}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleNext}
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
    </Layout>
  );
};

export default EditDocumentPersonal;

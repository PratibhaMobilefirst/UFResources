import { useState } from "react";
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

  const documentTypes = [
    {
      id: "simple-will",
      title: "Simple Will",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "simplified-estate-planning",
      title: "Simplified Estate Planning",
      icon: <ScrollText className="w-6 h-6" />,
    },
    {
      id: "power-of-attorney",
      title: "Power of Attorney",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  const handleNext = () => {
    if (selectedState && selectedDocumentType) {
      console.log("Creating document with:", {
        state: selectedState,
        documentType: selectedDocumentType,
      });
      // Navigate to the next step or create the document
    }
  };

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
                  <ArrowLeft className="w-5 h-5" />
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
                      Select State <span className="text-red-500">*</span>
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
                  <div className="mb-8">
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
                          {documentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Document Type Cards */}
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
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleNext}
                    disabled={!selectedState || !selectedDocumentType}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-medium"
                  >
                    Next
                  </Button>
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

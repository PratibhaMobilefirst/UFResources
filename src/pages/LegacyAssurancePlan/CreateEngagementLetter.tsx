import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Vector from "/lovable-uploads/Vector.svg";
import { useActiveStates } from "@/hooks/useStates";

const CreateEngagementLetter = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const navigate = useNavigate();
  const { data: statesData } = useActiveStates(1, 50);
  console.log(statesData, "statesData");

  const documentTypes = [
    "Simple Will",
    "Complex Will",
    "Trust Document",
    "Power of Attorney",
    "Healthcare Directive",
    "Living Will",
  ];

  const handleNext = () => {
    if (selectedState && selectedDocumentType) {
      console.log("Creating engagement letter with:", {
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
          <Card className="w-full p-8 h-[70vh]">
            <CardHeader>
              <div className="flex items-center ">
                <button
                  className=" flex items-center mr-2"
                  onClick={() => navigate(-1)}
                >
                  <img src={Vector} alt="" className="w-5 h-5" />
                </button>
                <span className="text-[22px] font-[500] ">
                  Create Engagement Letter
                </span>
              </div>
              <hr />
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4 w-96">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select State <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={selectedState}
                      onValueChange={setSelectedState}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ maxHeight: "40vh", overflowY: "scroll" }}
                      >
                        {/* {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="all">All States</SelectItem>
                        {statesData?.data?.data?.map((roleItem) => {
                          if (roleItem.stateName) {
                            return (
                              <SelectItem
                                key={roleItem.id}
                                value={roleItem.stateName}
                              >
                                {roleItem.stateName}
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className=" py-7">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document type
                    </label>
                    <Select
                      value={selectedDocumentType}
                      onValueChange={setSelectedDocumentType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleNext}
                    disabled={!selectedState || !selectedDocumentType}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
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

export default CreateEngagementLetter;

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
import { Input } from "@/components/ui/input";
import BackArrow from "../../asset/img/Group 37878.svg"
const CreateCase = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const navigate = useNavigate();

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

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
          <Card className="w-full p-8">
            <CardHeader>
              <div className="flex items-center ">
                <button
                  className=" flex items-center mr-2"
                  onClick={() => navigate(-1)}
                >
                  <img src={BackArrow} alt="" className="w-5 h-5" />
                </button>
                <span className="text-[22px] font-[500] ">Create Case</span>
              </div>
              <hr />
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4 w-96">
                  <div className="space-y-4 w-96">
                    <div className="space-y-2">
                      <label htmlFor="case" className="text-sm font-medium">
                        case name
                      </label>
                      <Input
                        id="case"
                        type="text"
                        name="case"
                        placeholder="Enter your case name"
                      />
                    </div>
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
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="client" className="text-sm font-medium">
                        Client Name
                      </label>
                      <Input
                        id="client"
                        type="text"
                        name="client"
                        placeholder="Enter your client name"
                      />
                    </div>

                    <div className=" py-7">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Select
                        value={selectedDocumentType}
                        onValueChange={setSelectedDocumentType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category type" />
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

                  <div className=" py-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select engagement letter Template
                    </label>
                    <Select
                      value={selectedDocumentType}
                      onValueChange={setSelectedDocumentType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select select the template" />
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
                    className="bg-[#00426E] hover:bg-[#00426E] text-white px-12 py-2 font-medium"
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

export default CreateCase;

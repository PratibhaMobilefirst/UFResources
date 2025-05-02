// src/pages/Campaign Management/CreateCampaign.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const CreateCampaign = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>(["New York", "California"]);
  const [selectedWill, setSelectedWill] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/create-campaign/questionnaire');
  };

  return (
    <Layout>
      <div className="bg-white rounded-lg p-6 m-6 min-h-[calc(100vh-7rem)] shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            className="p-0 hover:bg-transparent"
            onClick={handleBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Create Campaign</h1>
        </div>

        <div className="max-w-[600px] space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Campaign name</label>
            <Input 
              placeholder="Enter Campaign Name" 
              className="w-full border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Template Category</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Template Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="will">Will</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Selected Categories</label>
            <div className="flex gap-2">
              {selectedWill && (
                <div className="bg-[#E7F5FF] text-[#00426E] px-3 py-1 rounded-md flex items-center gap-2 text-sm">
                  Will
                  <button onClick={() => setSelectedWill(false)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Template Card</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Template Here" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="template1">Template 1</SelectItem>
                <SelectItem value="template2">Template 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select State</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Selected States</label>
            <div className="flex gap-2 flex-wrap">
              {selectedStates.map((state) => (
                <div key={state} className="bg-[#E7F5FF] text-[#00426E] px-3 py-1 rounded-md flex items-center gap-2 text-sm">
                  {state}
                  <button onClick={() => setSelectedStates(states => states.filter(s => s !== state))}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
             onClick={handleNext}
              className="bg-[#00426E] text-white hover:bg-[#003359] px-6"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCampaign;
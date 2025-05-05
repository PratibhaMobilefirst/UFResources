

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Client Information",
  "Case Overview",
  "Property and Asset Details",
  "Beneficiary Information",
  "Legal Provisions and Preferences",
  "Review"
];

const PersonalEngagementlette = ({ onClose }: { onClose?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [caseName, setCaseName] = useState("");
  const [state, setState] = useState("");
  const [clientName, setClientName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [engagementTemplate, setEngagementTemplate] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full ">
      {/* Header with back button */}
      <div className="flex items-center gap-[13%] mb-8">
      <img 
    src="/lovable-uploads/Logo.svg"
    alt="Legacy Assurance Plan Logo"
    className="h-20" 
  />

  <button 
    onClick={onClose}
    className="flex items-center text-gray-600 hover:text-gray-800"
  >
    <ArrowLeft className="h-4 w-4 mr-1" />
    <span className="text-lg ">Create Engagement Letter</span>
  </button>

 
</div>

            
      <div className="flex">
        {/* Sidebar Steps */}
        <div className="w-1/4 pr-8">
          <ul>
            {steps.map((step, idx) => (
              <li
                key={step}
                className={`mb-2 px-4 py-2 text-sm rounded cursor-pointer ${
                  currentStep === idx 
                    ? "bg-[#E7F5FF] text-[#00426E] font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentStep(idx)}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">

          <div className="mb-8">
            {/* Logo and section title */}

            {/* Current step content */}
            {currentStep === 0 && (
              <form className="space-y-6">
        <h3 className="text-lg font-medium">Details of the Client</h3>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                    className="w-full"
                  />
                </div>
              </form>
            )}
            
            {/* Other steps would be conditionally rendered here */}
          </div>
          
          {/* Next button */}
          <div className="flex justify-end mt-auto pt-6">
            <Button
              onClick={handleNext}
              className="bg-[#00426E] text-white px-8 py-2"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalEngagementlette;
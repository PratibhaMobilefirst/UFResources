import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import logo from "../../asset/img/logo.svg"
import BackArrow from "../../asset/img/Group 37878.svg"
const EngagementLetterCreation = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("client-information");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // Add other form fields as needed
  });
const stepTitles: Record<string, string> = {
  "client-information": "Details of the Client",
  "case-overview": "Case Overview",
  "property-asset-details": "Property and Asset Details",
  "beneficiary-information": "Beneficiary Information",
  "legal-provisions": "Legal Provisions and Preferences",
  "review": "Review",
};

  const sidebarItems = [
    { id: "client-information", label: "Client Information", active: true },
    { id: "case-overview", label: "Case Overview", active: false },
    { id: "property-asset-details", label: "Property and Asset Details", active: false },
    { id: "beneficiary-information", label: "Beneficiary Information", active: false },
    { id: "legal-provisions", label: "Legal Provisions and Preferences", active: false },
    { id: "review", label: "Review", active: false },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === "review") {
      setShowSuccessDialog(true);
    } else {
      // Navigate to next step logic
      const currentIndex = sidebarItems.findIndex(item => item.id === currentStep);
      if (currentIndex < sidebarItems.length - 1) {
        setCurrentStep(sidebarItems[currentIndex + 1].id);
      }
    }
  };

  const handleSuccessOk = () => {
    setShowSuccessDialog(false);
    navigate(`/personal-detail/${caseId}`);
  };

  const renderClientInformation = () => (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter First Name"
              className="max-w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter Last Name"
              className="max-w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

 const renderReview = () => (
  <div className="flex justify-center">
    <div className="bg-white max-w-[800px] min-h-[700px] p-10 border border-gray-300 rounded shadow-md">
     
      <h3 className="text-lg font-bold mb-6">Engagement Letter</h3>
      <div className="space-y-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          This engagement letter serves as a formal agreement between [Client Name] and [Law Firm Name] regarding legal representation. This document outlines the scope of legal services, fee structure, and terms of engagement for the proposed legal matter.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          The law firm agrees to provide legal counsel and representation as mutually agreed upon between the parties. The client agrees to provide all necessary information and documentation required for effective legal representation.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Our legal team will document in advance all services contemplated for the referenced matter and will clearly set the necessary limitations on services and costs. We believe this approach leads to a better legal experience through enhanced client satisfaction and cost effectiveness.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Attorney and any related firm members will represent the client's interests in accordance with case requirements. Attorney will provide the necessary legal guidance throughout the representation period.
        </p>
      </div>
    </div>
  </div>
);


  const renderCurrentStep = () => {
    switch (currentStep) {
      case "client-information":
        return renderClientInformation();
      case "review":
        return renderReview();
      default:
        return <div className="text-center text-gray-500">Step content coming soon...</div>;
    }
  };

  return (
    <div className=" bg-white border min-h-[800px]">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
             <img src={BackArrow} alt="img" className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Create Engagement Letter</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
             <img src={logo} alt="" />
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentStep(item.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    currentStep === item.id
                      ? "bg-blue-50 text-[#00426E] font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl">
          {stepTitles[currentStep] && (
  <h2 className="text-xl font-semibold mb-6">{stepTitles[currentStep]}</h2>
)}
            {renderCurrentStep()}
            
            <div className="flex justify-end mt-40">
              <Button 
                onClick={handleNext}
                className="bg-[#00426E] hover:bg-[#003058] px-8"
              >
                {currentStep === "review" ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Submitted Successfully</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleSuccessOk}
              className="bg-[#00426E] hover:bg-[#003058] px-8"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EngagementLetterCreation;
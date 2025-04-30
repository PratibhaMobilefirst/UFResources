import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const CreateTemplatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [templateName, setTemplateName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>([]);
  
  const handleSave = () => {
    if (!templateName) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedCategories.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one template category",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd save the template to the backend here
    toast({
      title: "Success",
      description: "Template created successfully",
    });
    navigate("/template-management");
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAttorneySelect = (attorney: string) => {
    if (selectedAttorneys.includes(attorney)) {
      setSelectedAttorneys(selectedAttorneys.filter(a => a !== attorney));
    } else {
      setSelectedAttorneys([...selectedAttorneys, attorney]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-4">
        <div className="bg-white p-6 rounded-lg shadow-[0_0_3px_rgba(0,0,0,0.1)] h-fit">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/template-management")}
              className="mr-4 p-0 hover:bg-transparent flex items-center gap-2"
            >
              <div className="bg-[#D4EDFF] p-1.5 rounded-full">
                <ChevronLeft className="h-4 w-4 text-[#00426E]" />
              </div>
              Create Template Card
            </Button>
          </div>
          
          <div className="max-w-[600px]">
            <div className="space-y-6">
              {/* Template Name */}
              <div>
                <label className="text-base font-medium block mb-2">
                  Enter Template Card Name
                </label>
                <Input
                  placeholder="Enter Here"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="h-10 border-gray-200"
                />
              </div>
              
              {/* Template Category */}
              <div>
                <label className="text-base font-medium block mb-2">
                  Select Template Category
                </label>
                <Select
                  onValueChange={(value) => handleCategorySelect(value)}
                >
                  <SelectTrigger className="h-10 border-gray-200">
                    <SelectValue placeholder="Search here" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Estate">Estate</SelectItem>
                    <SelectItem value="Will">Will</SelectItem>
                    <SelectItem value="Trust">Trust</SelectItem>
                    <SelectItem value="Agreement">Agreement</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="mt-2 bg-[#F8F9FA] rounded-md min-h-[60px] p-2">
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map(category => (
                        <Badge 
                          key={category} 
                          className="bg-white border border-[#00426E] text-[#00426E] hover:bg-white"
                        >
                          {category}
                          <button 
                            className="ml-2 text-xs hover:text-[#003058]"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategorySelect(category);
                            }}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Attorney Roles */}
              <div>
                <label className="text-base font-medium block mb-2">
                  Attorney role which can use this template
                </label>
                <Select
                  onValueChange={(value) => handleAttorneySelect(value)}
                >
                  <SelectTrigger className="h-10 border-gray-200">
                    <SelectValue placeholder="Search here" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead Attorney">Lead Attorney</SelectItem>
                    <SelectItem value="Associate">Associate</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="mt-2 bg-[#F8F9FA] rounded-md min-h-[60px] p-2">
                  {selectedAttorneys.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedAttorneys.map(attorney => (
                        <Badge 
                          key={attorney} 
                          className="bg-white border border-[#00426E] text-[#00426E] hover:bg-white"
                        >
                          {attorney}
                          <button 
                            className="ml-2 text-xs hover:text-[#003058]"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAttorneySelect(attorney);
                            }}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 px-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/template-management")}
              className="border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#00426E] hover:bg-[#003058]"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTemplatePage;

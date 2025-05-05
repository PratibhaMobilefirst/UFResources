import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate, useParams } from "react-router-dom";

const states = ["California", "Texas", "New York"];
const templateCategories = ["Trust", "Will", "Estate Plan"];
const engagementTemplates = ["Standard Engagement", "Custom Engagement"];

const CreateNewCasePersonal = ({ onClose }: { onClose?: () => void }) => {
    const navigate = useNavigate()
  const [caseName, setCaseName] = useState("");
  const [state, setState] = useState("");
  const [clientName, setClientName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [engagementTemplate, setEngagementTemplate] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const { id } = useParams();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsOpen(false);
    if (onClose) onClose();
  
    
    navigate(`/personal-case/001`);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <SidebarProvider>
         <Sidebar/>
    <div className="bg-white shadow-sm rounded-lg p-8 max-w-2xl w-full mx-auto">
       
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Create  test naaaa yaarrrr  New Case</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Case Name</label>
          <Input
            type="text"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            placeholder="Enter Case Name"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Client Name</label>
          <Input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter Client Name"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Template Category</label>
          <select
            value={templateCategory}
            onChange={(e) => setTemplateCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select Template Category</option>
            {templateCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Select Engagement Letter Template</label>
          <select
            value={engagementTemplate}
            onChange={(e) => setEngagementTemplate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select Template Here</option>
            {engagementTemplates.map((tpl) => (
              <option key={tpl} value={tpl}>{tpl}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#00426E] text-white px-6 py-2 rounded hover:bg-[#005999]"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
    </SidebarProvider>
  );
};

export default CreateNewCasePersonal;
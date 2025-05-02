import React, { useState, useRef } from 'react';
import { ChevronLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DocumentEditor from "./DocumentEditor";

// Add the interface for props
interface AddTemplateFormProps {
  onBack: () => void;
}

const AddTemplateForm = ({ onBack }: AddTemplateFormProps) => {
  const [selectedStates, setSelectedStates] = useState(["California", "New York"]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleStateSelect = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter(s => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowEditor(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const STATES = ["California", "New York", "Chicago", "Colorado"];
  
  if (showEditor) {
    return <DocumentEditor onBack={() => setShowEditor(false)} initialFile={selectedFile} />;
  }

  return (
    <div className="bg-white min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-4 flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg text-blue-600 font-medium">Add New Template</span>
        </div>

        {/* Form Content */}
        <div className="p-4 pt-0">
          {/* Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Upload Word File</label>
            <div
              className="border border-gray-200 border-dashed rounded-md bg-gray-50 p-6 flex flex-col items-center text-center cursor-pointer hover:bg-blue-50 transition"
              onClick={handleUploadClick}
            >
              <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">
                Drag File here or <span className="text-blue-600 cursor-pointer">Browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Upload your document in word format
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".doc,.docx"
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Template Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Select Template Category</label>
              <div className="relative">
                <div 
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 flex justify-between items-center cursor-pointer text-sm"
                  onClick={() => setShowDropdown(showDropdown === 'category' ? null : 'category')}
                >
                  <span className="text-gray-500">Select category</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showDropdown === 'category' && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg">
                    <div className="py-1">
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Will</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Trust</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Agreement</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Select Type</label>
              <div className="relative">
                <div 
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 flex justify-between items-center cursor-pointer text-sm"
                  onClick={() => setShowDropdown(showDropdown === 'type' ? null : 'type')}
                >
                  <span className="text-gray-500">Select role</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showDropdown === 'type' && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg">
                    <div className="py-1">
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Network Attorney</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Campaign</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Attorney Specific - Lead Attorney</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Template Card */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Select Template Card</label>
              <div className="relative">
                <div 
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 flex justify-between items-center cursor-pointer text-sm"
                  onClick={() => setShowDropdown(showDropdown === 'template' ? null : 'template')}
                >
                  <span className="text-gray-500">Select</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showDropdown === 'template' && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg">
                    <div className="py-1">
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Simple Will</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Simple Power of Attorney</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">Simple Trust Agreement</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* States */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Select State</label>
              <div className="relative">
                <div className="w-full bg-white border border-gray-200 rounded px-2 py-1 flex flex-wrap items-center min-h-10">
                  {selectedStates.map(state => (
                    <span
                      key={state}
                      className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-medium flex items-center gap-1 m-1"
                    >
                      {state}
                      <button
                        type="button"
                        className="ml-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleStateSelect(state)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <div 
                    className="flex-1 min-w-[120px] h-8 flex items-center cursor-pointer"
                    onClick={() => setShowDropdown(showDropdown === 'state' ? null : 'state')}
                  >
                    <span className="text-gray-500 text-sm">{selectedStates.length ? '' : 'Select here'}</span>
                  </div>
                </div>
                {showDropdown === 'state' && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg">
                    <div className="py-1">
                      {STATES.filter(s => !selectedStates.includes(s)).map(state => (
                        <div 
                          key={state} 
                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                          onClick={() => handleStateSelect(state)}
                        >
                          {state}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Update Version */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Update Version</label>
              <div className="relative">
                <div 
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 flex justify-between items-center cursor-pointer text-sm"
                  onClick={() => setShowDropdown(showDropdown === 'version' ? null : 'version')}
                >
                  <span>Yes</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showDropdown === 'version' && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg">
                    <div className="py-1">
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm bg-blue-50 text-blue-600">Yes</div>
                      <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">NO</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-8 mb-2">
            <button 
              className="px-6 py-2 text-sm border border-gray-300 bg-white rounded hover:bg-gray-50"
              onClick={onBack}
            >
              Cancel
            </button>
            <button 
              className="px-6 py-2 text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Go to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplateForm;
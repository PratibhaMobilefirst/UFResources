import React, { useRef } from 'react';
import { Image as ImageIcon, MousePointer, Bold, Italic, Type } from 'lucide-react';

export type ToolType = 'text' | 'placeholder' | 'image' | 'arrow';

interface ToolbarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  onImageUpload: (file: File) => void;
}

const TOOLBAR_OPTIONS: { key: ToolType; label: string; icon: React.ReactNode }[] = [
  { key: 'text', label: 'T', icon: <Type className="w-5 h-5" /> },
  { key: 'placeholder', label: 'PH', icon: <Bold className="w-5 h-5" /> },
  { key: 'image', label: '', icon: <ImageIcon className="w-5 h-5" /> },
  { key: 'arrow', label: '', icon: <MousePointer className="w-5 h-5" /> },
];

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onToolSelect, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className="flex gap-2  p-2  mb-2">
      {TOOLBAR_OPTIONS.map((tool) => (
        <button
          key={tool.key}
          className={`w-10 h-10 rounded flex items-center justify-center border transition-colors ${
            activeTool === tool.key
              ? 'bg-blue-100 border-blue-700'
              : 'bg-white border-gray-200'
          }`}
          onClick={() => {
             if (tool.key === 'image') {
    onToolSelect('image');
    handleImageClick();
  } else {
    onToolSelect(tool.key);
  }

          }}
          title={tool.key.charAt(0).toUpperCase() + tool.key.slice(1)}
        >
          {tool.icon || (
            <span className="font-bold text-lg">{tool.label}</span>
          )}
        </button>
      ))}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Toolbar; 
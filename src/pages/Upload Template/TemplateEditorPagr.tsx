import React, { useRef } from 'react';
import DocumentEditor from './DocumentEditor';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const TemplateEditorPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  // Open file dialog on mount if no file selected
  React.useEffect(() => {
    if (!selectedFile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <DocumentEditor onBack={() => navigate(-1)} initialFile={selectedFile} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TemplateEditorPage;

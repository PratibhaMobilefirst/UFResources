import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { renderAsync } from "docx-preview";

// Define CLAUSES and PLACEHOLDERS at the top
const CLAUSES = [
  { title: "Suggested by AI", content: "Lorem ipsum dolor sit amet..." },
  { title: "Clause A", content: "Clause A content..." },
  { title: "Clause B", content: "Clause B content..." },
  { title: "Clause C", content: "Clause C content..." },
];

const PLACEHOLDERS = [
  "Placeholder 1",
  "Placeholder 2",
  "Placeholder 3",
  "Placeholder 4",
  "Placeholder 5",
  "Placeholder 6",
];

interface DocumentEditorProps {
  onBack: () => void;
  initialFile?: File | null;
}

const DocumentEditorPage = ({ onBack, initialFile }: DocumentEditorProps) => {
  const navigate = useRef(() => window.history.back());
  const routerNavigate = useNavigate();
  const { id } = useParams();
  const [selectedClause, setSelectedClause] = useState(0);
  const [docTitle, setDocTitle] = useState("Engagement Letter");
  const [docContent, setDocContent] = useState<string | null>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialFile) {
      setDocTitle(initialFile.name);
      if (initialFile.name.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result;
          if (arrayBuffer && docxContainerRef.current) {
            docxContainerRef.current.innerHTML = '';
            await renderAsync(arrayBuffer as ArrayBuffer, docxContainerRef.current, undefined, {
              className: 'docx-preview',
              inWrapper: false,
            });
            setDocContent(null); // We use the rendered HTML
          }
        };
        reader.readAsArrayBuffer(initialFile);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setDocContent(text || "");
        };
        reader.readAsText(initialFile);
      }
    }
  }, [initialFile]);

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fa]">
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <div className="flex items-center justify-between bg-white border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate.current()}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-lg">Document Editor</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-900 text-white px-4 py-2 rounded">Edit Document</button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={() => routerNavigate(`/case/${id}`)}
            >
              Mark as Finished
            </button>
            <button className="bg-blue-900 text-white px-4 py-2 rounded">Save as Draft</button>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-1 w-full" style={{ minHeight: 0 }}>
          {/* Left Sidebar */}
          <div className="w-64 bg-white border-r flex flex-col" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="p-4 border-b">
              <div className="font-semibold text-sm mb-2">Case Name</div>
              <div className="text-base font-medium mb-4">Anderson Trust Creation</div>
              <div className="font-semibold text-sm mb-2">Documents</div>
              <div className="bg-[#E7F5FF] text-[#00426E] rounded px-3 py-2 font-medium mb-4 cursor-pointer">
                {docTitle}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {CLAUSES.map((clause, idx) => (
                <div
                  key={clause.title}
                  className={`mb-3 p-3 rounded border cursor-pointer ${
                    idx === selectedClause
                      ? "bg-[#FFF9E5] border-[#FFD600]"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedClause(idx)}
                >
                  <div className="font-semibold text-sm mb-1">{clause.title}</div>
                  <div className="text-xs text-gray-600">{clause.content}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Main Editor */}
          <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] p-8 relative" style={{ minWidth: 0 }}>
            {/* Toolbar */}
            <div className="flex gap-2 mb-4">
              <button className="w-8 h-8 rounded bg-white border text-gray-700 font-bold">T</button>
              <button className="w-8 h-8 rounded bg-white border text-gray-700 font-bold">B</button>
              <button className="w-8 h-8 rounded bg-white border text-gray-700 font-bold">U</button>
              <button className="w-8 h-8 rounded bg-white border text-gray-700 font-bold">I</button>
            </div>
            {/* Document Preview (scrollable) */}
            <div className="bg-white rounded-lg shadow w-full max-w-2xl min-h-[400px] mb-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
              <h2 className="text-center text-xl font-bold mb-4">{docTitle}</h2>
              {docContent !== null ? (
                <p className="text-gray-700 text-base" style={{whiteSpace: 'pre-wrap'}}>
                  {docContent}
                </p>
              ) : (
                <div ref={docxContainerRef} className="docx-preview text-gray-700 text-base px-2" />
              )}
            </div>
            {/* Page Thumbnails (fixed to bottom of main editor area) */}
            <div className="flex gap-2 mt-2 absolute left-0 right-0 bottom-4 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="w-16 h-20 bg-white border rounded flex items-center justify-center text-gray-500 text-xs shadow"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
          {/* Right Sidebar */}
          <div className="w-72 bg-white border-l flex flex-col p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="font-semibold mb-4">Place Holders</div>
            <div className="flex flex-col gap-2 mb-4">
              {PLACEHOLDERS.map((ph, idx) => (
                <input
                  key={ph}
                  className="border rounded px-3 py-2 text-sm"
                  placeholder={ph}
                />
              ))}
            </div>
            <button className="bg-blue-900 text-white px-4 py-2 rounded mt-auto">
              Auto Detect Placeholder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditorPage;
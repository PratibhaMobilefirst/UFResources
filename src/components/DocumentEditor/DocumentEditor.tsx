import React, { useRef, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import html2canvas from 'html2canvas';
import { renderAsync } from 'docx-preview';
import Toolbar, { ToolType } from './Toolbar';
import PlaceholderPanel, { PlaceholderMeta } from './PlaceholderPanel';
import ThumbnailStrip from './ThumbnailStrip';
import PlaceholderExtension from './PlaceholderExtension';
// @ts-ignore: No types for mammoth
import mammoth from 'mammoth';
import Layout from '../Layout';
// import Underline from '@tiptap/extension-underline';
// @ts-ignore: No types for draggable
// import Draggable from '@tiptap/extension-draggable';
import BackArrow from "../../asset/img/Group 37878.svg"
import Eyeicon from "../../asset/img/eye.svg"
import { ChevronLeft } from 'lucide-react';
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const DocumentEditor: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('arrow');
  const [placeholders, setPlaceholders] = useState<PlaceholderMeta[]>([]);
  const [images, setImages] = useState<{ id: string; src: string }[]>([]);
  const [docTitle, setDocTitle] = useState('Untitled Document');
  const [docContent, setDocContent] = useState<string | null>(null);
  const [pageThumbnails, setPageThumbnails] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputBoxValue, setInputBoxValue] = useState('');
  const [inputBoxPosition, setInputBoxPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      PlaceholderExtension,
    //   Underline,
    //   Draggable,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      // Update placeholders on every change
      const phs: PlaceholderMeta[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'placeholder') {
          phs.push({
            id: `${pos}-${node.attrs.value}`,
            value: node.attrs.value,
            page: 1, // TODO: Calculate page number if needed
            pos,
          });
        }
      });
      setPlaceholders(phs);
    },
  });

  // NOTE: TipTap does not have an official image resize extension. For resizing, use CSS or a custom extension if needed.

  // File loading (txt/docx)
  useEffect(() => {
    if (!file) return;
    setDocTitle(file.name);
    if (file.name.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
          // Use mammoth to convert docx to HTML
          const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
          setDocContent(html);
          if (editor) editor.commands.setContent(html);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        const textContent = typeof result === 'string' ? result : '';
        setDocContent(textContent);
        if (editor) editor.commands.setContent(textContent);
      };
      reader.readAsText(file);
    }
  }, [file, editor]);

  // Generate thumbnails from docx-preview
  const generatePageThumbnails = async () => {
    if (!docxContainerRef.current) return;
    const pages = docxContainerRef.current.querySelectorAll('.docx-preview');
    const thumbnails: string[] = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;
      try {
        const canvas = await html2canvas(page, { scale: 0.2, useCORS: true, logging: false });
        thumbnails.push(canvas.toDataURL('image/png'));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating thumbnail:', error);
      }
    }
    setPageThumbnails(thumbnails);
  };

  // Tool actions
  const handleToolSelect = (tool: ToolType) => {
    setActiveTool(tool);
    if (editor) editor.commands.focus();
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImages((prev) => [...prev, { id: `img-${Date.now()}`, src: imageUrl }]);
      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    };
    reader.readAsDataURL(file);
  };
  // Add image resize handler
  const handleImageResize = (id: string, width: number, height: number) => {
    setImages((prev) => prev.map(img => img.id === id ? { ...img, width, height } : img));
    if (editor) {
      // Update the image node in the editor (find by src)
      editor.commands.command(({ tr, state }) => {
        let updated = false;
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'image' && node.attrs.src && node.attrs.src.includes(id)) {
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, width, height });
            updated = true;
          }
        });
        if (updated) {
          editor.view.dispatch(tr);
        }
        return true;
      });
    }
  };
  // Placeholder edit/delete
  const handlePlaceholderEdit = (id: string, newValue: string) => {
    if (!editor) return;
    const ph = placeholders.find((p) => p.id === id);
    if (ph) {
      editor.chain().focus().setNodeSelection(ph.pos).updateAttributes('placeholder', { value: newValue }).run();
    }
  };
  const handlePlaceholderDelete = (id: string) => {
    if (!editor) return;
    const ph = placeholders.find((p) => p.id === id);
    if (ph) {
      editor.chain().focus().deleteRange({ from: ph.pos, to: ph.pos + 1 }).run();
    }
  };

  // File input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  // Show input box at cursor for text/placeholder
  const showInputAtCursor = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left || window.innerWidth / 2;
    const y = rect.bottom || window.innerHeight / 2;
    setInputBoxPosition({ x, y: y + window.scrollY });
    setShowInputBox(true);
    setInputBoxValue('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Insert text or placeholder at cursor
  const handleEditorClick = (e: React.MouseEvent) => {
    if (!editor) return;
    if (activeTool === 'text' || activeTool === 'placeholder') {
      showInputAtCursor();
    }
  };

  // Handle input box submit
  const handleInputBoxSubmit = () => {
    if (!editor) return;
    if (inputBoxValue.trim()) {
      if (activeTool === 'text') {
        editor.chain().focus().insertContent(inputBoxValue).run();
      } else if (activeTool === 'placeholder') {
        editor.chain().focus().insertContent({ type: 'placeholder', attrs: { value: inputBoxValue } }).run();
      }
    }
    setShowInputBox(false);
    setInputBoxValue('');
  };

  // Placeholder auto-detect (stub: insert a sample placeholder)
  const handleAutoDetectPlaceholder = () => {
    if (!editor) return;
    editor.chain().focus().insertContent({ type: 'placeholder', attrs: { value: 'Auto-Detected Placeholder' } }).run();
  };

  // Page navigation
  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
    // Optionally scroll to page in docx preview
  };
 const navigate = useRef(() => window.history.back());
// thumbnail 
  const [visiblePages, setVisiblePages] = useState(4); // Number of thumbnails visible at once
  const [currentStartIndex, setCurrentStartIndex] = useState(0); // Start index for visible thumbnails
  const thumbnailContainerRef = useRef(null);
 const jumpToPage = (pageNumber: number) => {
    if (!fileInputRef.current) return;
    
    const pages = fileInputRef.current.querySelectorAll('.docx-preview');
    if (pageNumber >= 1 && pageNumber <= pages.length) {
      const targetPage = pages[pageNumber - 1] as HTMLElement;
      targetPage.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(pageNumber);
    }
  };
  console.log(file, "file");
  
  return (
    <Layout>
    <div className="flex min-h-screen w-full bg-[#f8f9fa]">
       <div className="flex flex-col flex-1 w-full">
 
        {/* Header */}
 
        <div className="flex items-center justify-between bg-white border-b px-6 py-3">
 
          <div className="flex items-center gap-2">
 
            <button
 
              onClick={() => navigate.current()}
 
              className="hover:bg-gray-100 p-1 rounded"
 
            >
 
             <img src={BackArrow} className="w-5 h-5" />
 
            </button>
 
            <span className="font-semibold text-lg">Document Editor</span>
 
          </div>
             <Toolbar activeTool={activeTool} onToolSelect={setActiveTool} onImageUpload={handleImageUpload} />


 
          <div className="flex gap-2">
 
           <div className="flex items-center bg-gray-200 rounded-full p-1 w-fit">
  <button
    className="bg-[#00426E] text-white px-4 py-1.5 rounded-full font-medium"
  >
    Edit Document
  </button>
 
  <button
    className="text-gray-700 px-4 py-1.5 rounded-full font-medium"
    // onClick={() => routerNavigate(/case/${id})}
  >
    Mark as Finished
  </button>
</div>
 
            <button className="bg-[#00426E] text-white px-4 py-2 rounded"
            // onClick={() => routerNavigate(/case/${id})}
            >Save as Draft</button>
 
          </div>
 
        </div>
         <div className="flex min-h-screen w-full bg-[#f8f9fa]">
     {/* Left Sidebar */}
<div className="w-72 bg-white border-r flex flex-col">
  {/* Header & File Upload */}
  <div className="p-4 border-b">
    <div className="font-semibold text-sm mb-2">Case Name</div>
    <div className="text-base font-medium mb-4">Anderson Trust Creation</div>
    <div className="font-semibold text-sm mb-2">Documents</div>
    <div className="bg-[#E7F5FF] text-[#00426E] rounded px-3 py-2 font-medium mb-4 cursor-pointer">
      {docTitle}
    </div>
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      accept=".txt,.docx"
      onChange={handleFileChange}
    />
    <button
      className="bg-blue-100 text-blue-900 px-3 py-1 rounded"
      onClick={() => fileInputRef.current?.click()}
    >
      Upload Document
    </button>
  </div>

  {/* Suggested By AI Panel */}
  <div className="flex-1 overflow-y-auto p-4 bg-[#FFF9E6]">
    <div className="font-semibold text-sm text-[#444] mb-3 flex items-center gap-2 bg-[#FFF9E6]">
      <span className="text-[#FFFDE7]">✨</span> Suggested By AI
    </div>

    {[1, 2, 3, 4].map((_, idx) => (
      <div
        key={idx}
        className="bg-white rounded-lg p-3 shadow-sm border mb-4 flex flex-col gap-2"
      >
        <div className="text-[11px] text-gray-600 leading-snug max-h-[100px] overflow-hidden">
          Lorem [text] (a) [01] Example: Lorem, Springfield, sample city, deeds,
          and bequests. This shall include property clause for AI review.
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
          No Clauses Added
          <div className="flex gap-2">
            <button className="hover:text-blue-700">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="hover:text-blue-700">
              <img src={Eyeicon} alt="" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

 {/* Main Editor */}
<div className="flex-1 bg-[#f8f9fa] relative overflow-hidden">
  <div className="h-full overflow-y-auto px-4 pt-4 pb-10 flex flex-col items-center gap-6">
    
    {/* Input Box Overlay for Text/Placeholder */}
    {showInputBox && (
      <div
        className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex items-center gap-2"
        style={{ left: inputBoxPosition.x, top: inputBoxPosition.y }}
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputBoxValue}
          onChange={e => setInputBoxValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleInputBoxSubmit();
            else if (e.key === 'Escape') setShowInputBox(false);
          }}
          className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px]"
          autoFocus
        />
        <button
          onClick={handleInputBoxSubmit}
          className="p-1 hover:bg-green-50 rounded-full"
        >
          ✓
        </button>
        <button
          onClick={() => setShowInputBox(false)}
          className="p-1 hover:bg-red-50 rounded-full"
        >
          ✗
        </button>
      </div>
    )}

    {/* A4 Page Styled Editor */}
    <div
      className="bg-white shadow-md rounded-md border max-w-[794px] w-full"
      style={{
        height: `${A4_HEIGHT}px`,        // A4 height = 1123px
        padding: '48px',
        boxSizing: 'border-box',
        overflow: 'auto'                 // scroll inside page if content overflows
      }}
      onClick={handleEditorClick}
    >
      {editor && <EditorContent editor={editor} />}
    </div>

    {/* Thumbnails Below */}
    {/* Page Thumbnails */}
            <div className="fixed  w-[65%] h-[20%] bottom-4 left-[49%] transform -translate-x-1/2 flex items-center bg-[#FAFAFA] p-2 rounded-lg shadow-lg">
              {/* Left Arrow */}
              <button
                className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
                onClick={() => setCurrentStartIndex(i => Math.max(i - visiblePages, 0))}
                disabled={currentStartIndex === 0}
                aria-label="Scroll left"
              >
                <ChevronLeft />
              </button>
              {/* Thumbnails */}
              <div
                className="flex gap-2 overflow-x-hidden"
                style={{ width: 120 * visiblePages + 8 * (visiblePages - 1) }} // 4 thumbnails + 3 gaps
              >
                {pageThumbnails
                  .slice(currentStartIndex, currentStartIndex + visiblePages)
                  .map((thumbnail, index) => (
                    <div
                      key={currentStartIndex + index}
                      className={`w-36 h-20 bg-white border rounded cursor-pointer transition-all relative ${
                        currentPage === currentStartIndex + index + 1 ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => jumpToPage(currentStartIndex + index + 1)}
                    >
                      <img
                        src={thumbnail}
                        alt={`Page ${currentStartIndex + index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">
                        {currentStartIndex + index + 1}
                      </div>
                    </div>
                  ))}
              </div>
              {/* Right Arrow */}
              <button
                className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
                onClick={() =>
                  setCurrentStartIndex(i =>
                    Math.min(i + visiblePages, Math.max(pageThumbnails.length - visiblePages, 0))
                  )
                }
                disabled={currentStartIndex + visiblePages >= pageThumbnails.length}
                aria-label="Scroll right"
              >
                <ChevronLeft className="rotate-180" />
              </button>
            </div>
  </div>
</div>

      {/* Right Sidebar */}
      <div className="w-72 bg-white border-l flex flex-col p-4">

         <div className="font-semibold mb-4">Images</div>
      {images.length === 0 && (
  <div className="text-gray-400 text-sm mb-4">No images added yet.</div>
)}

{images.map((img, index) => (
  <div
    key={img.id}
    className="relative mb-4 p-3 bg-white rounded-lg border shadow-sm flex flex-col items-center"
  >
    {/* Top Right Actions */}
    <div className="absolute top-2 right-2 flex gap-2 text-gray-500 text-sm">
      <button className="hover:text-blue-600">+</button>
      <button className="hover:text-blue-600">👁</button>
      <button
        className="hover:text-red-600"
        onClick={() => {
          setImages(prev => prev.filter(i => i.id !== img.id));
        }}
      >
        X
      </button>
    </div>

    {/* Image Preview */}
    <div className="w-24 h-24 bg-gray-100 border flex items-center justify-center rounded mb-2 overflow-hidden">
      {img.src ? (
        <img
          src={img.src}
          alt={`Image ${index + 1}`}
          style={{ width: img.width, height: img.height }}
          className="object-contain"
        />
      ) : (
        <span className="text-gray-400 text-xs">No Preview</span>
      )}
    </div>

    {/* Label */}
    <div className="w-full text-center text-xs font-medium text-gray-700 border-t pt-1">
      Image {index + 1}
    </div>
  </div>
))}


        <div className="font-semibold mb-4">Placeholders</div>
        <button
          className="mb-4 bg-blue-100 text-blue-900 px-3 py-1 rounded"
          onClick={handleAutoDetectPlaceholder}
        >
          Auto-Detect Placeholder
        </button>
        <PlaceholderPanel
          placeholders={placeholders}
          onEdit={handlePlaceholderEdit}
          onDelete={handlePlaceholderDelete}
        />
      </div>
      </div>
      </div>
    </div>
    </Layout>
  );
};

export default DocumentEditor; 
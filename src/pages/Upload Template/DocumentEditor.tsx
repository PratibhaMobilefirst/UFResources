import React, { useRef, useState, useEffect } from "react";

import {

  ChevronLeft,

  Image as ImageIcon,

  AlignLeft,

  Send,

  Save,

  Eraser,

  MousePointer,

  Bold,

  Italic,

  Underline,

  AlignCenter,

  AlignRight,

  Check,

  X

} from 'lucide-react';

import Sidebar from "@/components/Sidebar";

import { useNavigate, useParams } from "react-router-dom";

import { renderAsync } from "docx-preview";

import { SidebarProvider } from "@/components/ui/sidebar";

import { useEditor, EditorContent } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

import Image from '@tiptap/extension-image';

import PlaceholderExtension from './PlaceholderExtension'; // your custom extension



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



const TOOLBAR_OPTIONS = [

  { key: 'text', label: 'T', icon: null },

  { key: 'image', label: '', icon: ImageIcon },

  { key: 'list', label: '', icon: AlignLeft }, // Use AlignLeft as a placeholder for list

  { key: 'pointer', label: '', icon: MousePointer }, // Use MousePointer as a placeholder for pointer

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

  const [activeTool, setActiveTool] = useState<string | null>(null);

  const [showInputBox, setShowInputBox] = useState(false);

  const [inputBoxValue, setInputBoxValue] = useState('');

  const [inputBoxPosition, setInputBoxPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);

  const [placeholders, setPlaceholders] = useState<{ value: string, pos: number }[]>([]);

  const [editingPlaceholder, setEditingPlaceholder] = useState<{ pos: number, value: string, coords: { x: number, y: number } } | null>(null);

  const [placeholderCoords, setPlaceholderCoords] = useState<{ [pos: number]: { x: number, y: number } }>({});

  const [isImageUploading, setIsImageUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [insertedImages, setInsertedImages] = useState<{ id: string; src: string }[]>([]);



  const editor = useEditor({

    extensions: [

      StarterKit,

      PlaceholderExtension,

      Image

    ],

    content: '', // initial content

  });



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



  useEffect(() => {

    if (!editor) return;



    const updatePlaceholders = () => {

      const phs: { value: string, pos: number }[] = [];

      editor.state.doc.descendants((node, pos) => {

        if (node.type.name === 'placeholder') {

          phs.push({ value: node.attrs.value, pos });

        }

      });

      setPlaceholders(phs);

    };

    updatePlaceholders();

    editor.on('update', updatePlaceholders);



    // Cleanup: remove the listener

    return () => {

      editor.off('update', updatePlaceholders);

    };

  }, [editor]);



  // Add cursor position handler

  const handleCursorPosition = () => {

    const selection = window.getSelection();

    if (!selection || !selection.rangeCount) return;



    const range = selection.getRangeAt(0);

    const node = range.startContainer;



    // Check if cursor is in an image

    const isInImage = node.nodeType === Node.ELEMENT_NODE && 

      (node as Element).tagName === 'IMG' || 

      (node as Element).closest('img');



    // Check if cursor is in a placeholder

    const isInPlaceholder = node.nodeType === Node.ELEMENT_NODE && 

      (node as Element).classList.contains('placeholder');



    if (isInImage) {

      setActiveTool('image');

    } else if (isInPlaceholder) {

      setActiveTool('list');

    } else {

      setActiveTool('text');

    }

  };



  // Add event listeners for cursor position

  useEffect(() => {

    const docContainer = docxContainerRef.current;

    if (!docContainer) return;



    const handleMouseUp = () => {

      handleCursorPosition();

    };



    const handleKeyUp = () => {

      handleCursorPosition();

    };



    docContainer.addEventListener('mouseup', handleMouseUp);

    docContainer.addEventListener('keyup', handleKeyUp);



    return () => {

      docContainer.removeEventListener('mouseup', handleMouseUp);

      docContainer.removeEventListener('keyup', handleKeyUp);

    };

  }, []);



  // Modify image upload handler

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (!file) return;



    const reader = new FileReader();

    reader.onload = (e) => {

      const imageUrl = e.target?.result as string;

      const imageId = `img-${Date.now()}`;
      
      setInsertedImages(prev => [...prev, {

        id: imageId,

        src: imageUrl

      }]);



      if (docxContainerRef.current) {

        const img = document.createElement('img');

        img.src = imageUrl;

        img.className = 'inserted-image max-w-full h-auto my-4';

        img.id = imageId;
        
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {

          const range = selection.getRangeAt(0);

          range.insertNode(img);

          const br = document.createElement('br');

          range.insertNode(br);

          setActiveTool('image'); // Set active tool to image after insertion

        } else {

          docxContainerRef.current.appendChild(img);

          docxContainerRef.current.appendChild(document.createElement('br'));

          setActiveTool('image'); // Set active tool to image after insertion

        }

      }



      setIsImageUploading(false);

    };



    reader.readAsDataURL(file);

  };



  // Modify placeholder insertion

  const showInputAtCursor = () => {

    if (!editor) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;



    const range = selection.getRangeAt(0);

    const rect = range.getBoundingClientRect();

    const x = rect.left || window.innerWidth / 2;

    const y = rect.bottom || window.innerHeight / 2;



    setInputBoxPosition({ x, y: y + window.scrollY });

    setShowInputBox(true);

    setInputBoxValue('');

    setActiveTool('list'); // Set active tool to list when showing placeholder input

    setTimeout(() => {

      inputRef.current?.focus();

    }, 0);

  };



  const showInputAtPlaceholder = (ph: { pos: number, value: string }) => {

    const coords = placeholderCoords[ph.pos];

    if (!coords) return; // fallback if not found

    setEditingPlaceholder({

      pos: ph.pos,

      value: ph.value,

      coords

    });

    setTimeout(() => {

      inputRef.current?.focus();

    }, 0);

  };



  return (

   

   

      <div className="flex min-h-screen w-full bg-[#f8f9fa]">

      {/* Add hidden file input */}

      <input

        type="file"

        ref={fileInputRef}

        className="hidden"

        accept="image/*"

        onChange={handleImageUpload}

      />

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

            <button className="bg-blue-900 text-white px-4 py-2 rounded" onClick={() => routerNavigate(`/case/${id}`)}>Save as Draft</button>

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

            <div className="flex gap-4 mb-4 bg-white p-2 rounded-lg shadow-sm">

              {TOOLBAR_OPTIONS.map((tool) => (

                <button

                  key={tool.key}

                  className={`w-10 h-10 rounded flex items-center justify-center border transition-colors ${

                    activeTool === tool.key

                      ? 'bg-blue-100 border-blue-700'

                      : 'bg-white border-gray-200'

                  }`}

                  onClick={async () => {

                    if (tool.key === 'list' && editor) {

                      showInputAtCursor();

                    } else if (tool.key === 'image') {

                      fileInputRef.current?.click();

                      setIsImageUploading(true);

                    }

                  }}

                  title={tool.key.charAt(0).toUpperCase() + tool.key.slice(1)}

                >

                  {tool.icon ? (

                    <tool.icon className={`w-5 h-5 ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}`} />

                  ) : (

                    <span className={`font-bold text-lg ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}`}>{tool.label}</span>

                  )}

                </button>

              ))}

            </div>

            {/* Input Box for Placeholder */}

            {showInputBox && (

              <div

                className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex items-center gap-2"

                style={{

                  left: inputBoxPosition.x,

                  top: inputBoxPosition.y,

                }}

                onClick={e => e.stopPropagation()}

              >

                <input

                  ref={inputRef}

                  type="text"

                  value={inputBoxValue}

                  onChange={e => setInputBoxValue(e.target.value)}

                  onKeyDown={e => {

                    if (e.key === 'Enter') {

                      if (inputBoxValue.trim() && editor) {

                        editor.chain().focus().insertContent({

                          type: 'placeholder',

                          attrs: { value: inputBoxValue }

                        }).run();



                        let lastPos = -1;

                        editor.state.doc.descendants((node, pos) => {

                          if (node.type.name === 'placeholder' && node.attrs.value === inputBoxValue) {

                            lastPos = pos;

                          }

                        });



                        if (lastPos !== -1) {

                          setPlaceholderCoords(prev => ({

                            ...prev,

                            [lastPos]: { ...inputBoxPosition }

                          }));

                        }



                        setShowInputBox(false);

                        setInputBoxValue('');

                      }

                    } else if (e.key === 'Escape') {

                      setShowInputBox(false);

                      setInputBoxValue('');

                    }

                  }}

                  className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px]"

                  autoFocus

                />

                <button

                  onClick={() => {

                    if (inputBoxValue.trim() && editor) {

                      editor.chain().focus().insertContent({

                        type: 'placeholder',

                        attrs: { value: inputBoxValue }

                      }).run();



                      let lastPos = -1;

                      editor.state.doc.descendants((node, pos) => {

                        if (node.type.name === 'placeholder' && node.attrs.value === inputBoxValue) {

                          lastPos = pos;

                        }

                      });



                      if (lastPos !== -1) {

                        setPlaceholderCoords(prev => ({

                          ...prev,

                          [lastPos]: { ...inputBoxPosition }

                        }));

                      }



                      setShowInputBox(false);

                      setInputBoxValue('');

                    }

                  }}

                  className="p-1 hover:bg-green-50 rounded-full"

                >

                  <Check className="w-4 h-4 text-green-600" />

                </button>

                <button

                  onClick={() => {

                    setShowInputBox(false);

                    setInputBoxValue('');

                  }}

                  className="p-1 hover:bg-red-50 rounded-full"

                >

                  <X className="w-4 h-4 text-red-600" />

                </button>

              </div>

            )}

            {editingPlaceholder && (

              <div

                className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex items-center gap-2"

                style={{

                  left: editingPlaceholder.coords.x,

                  top: editingPlaceholder.coords.y,

                }}

                onClick={e => e.stopPropagation()}

              >

                <input

                  ref={inputRef}

                  type="text"

                  value={editingPlaceholder.value}

                  onChange={e => setEditingPlaceholder(editingPlaceholder => editingPlaceholder ? { ...editingPlaceholder, value: e.target.value } : null)}

                  onKeyDown={e => {

                    if (e.key === 'Enter') {

                      if (editingPlaceholder.value.trim() && editor) {

                        editor.chain().focus().setNodeSelection(editingPlaceholder.pos).updateAttributes('placeholder', { value: editingPlaceholder.value }).run();

                        setEditingPlaceholder(null);

                      }

                    } else if (e.key === 'Escape') {

                      setEditingPlaceholder(null);

                    }

                  }}

                  className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px]"

                  autoFocus

                />

                <button

                  onClick={() => {

                    if (editingPlaceholder.value.trim() && editor) {

                      editor.chain().focus().setNodeSelection(editingPlaceholder.pos).updateAttributes('placeholder', { value: editingPlaceholder.value }).run();

                      setEditingPlaceholder(null);

                    }

                  }}

                  className="p-1 hover:bg-green-50 rounded-full"

                >

                  <Check className="w-4 h-4 text-green-600" />

                </button>

                <button

                  onClick={() => setEditingPlaceholder(null)}

                  className="p-1 hover:bg-red-50 rounded-full"

                >

                  <X className="w-4 h-4 text-red-600" />

                </button>

              </div>

            )}

            {/* Document Preview (scrollable) */}

            <div 
              className="bg-white rounded-lg shadow w-full max-w-2xl min-h-[400px] mb-20 overflow-y-auto p-4" 
              style={{ maxHeight: '400px' }}
              ref={docxContainerRef}
              contentEditable={true}
              onFocus={() => setActiveTool('text')}
            >
              {docContent !== null ? (
                <div className="text-gray-700 text-base" style={{whiteSpace: 'pre-wrap'}}>
                  {docContent}
                </div>
              ) : (
                <div className="docx-preview text-gray-700 text-base" />
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

            {placeholders.length === 0 && (

              <div className="text-gray-400 text-sm mb-4">No placeholders added yet.</div>

            )}

            {placeholders.map((ph, idx) => (

              <div key={ph.pos} className="mb-6 p-4 bg-[#F8FAFC] rounded-lg border border-gray-200 relative">

                <div className="flex items-center justify-between mb-2">

                  <span

                    className="font-medium text-gray-800 cursor-pointer hover:underline"

                    onClick={() => showInputAtPlaceholder(ph)}

                  >

                    {ph.value}

                  </span>

                  <button

                    className="text-gray-400 hover:text-red-500"

                    onClick={() => {

                      editor.chain().focus().deleteRange({ from: ph.pos, to: ph.pos + 1 }).run();

                    }}

                  >

                    <X className="w-4 h-4" />

                  </button>

                </div>

                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">

                  Located at: <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Page 1</span>

                </div>

                <div className="mb-2">

                  <label className="block text-xs text-gray-500 mb-1">Placeholder Name</label>

                  <input

                    className="border rounded px-3 py-2 text-sm w-full"

                    value={ph.value}

                    onChange={e => {

                      editor.chain().focus().setNodeSelection(ph.pos).updateAttributes('placeholder', { value: e.target.value }).run();

                    }}

                  />

                </div>

                <button

                  className="bg-blue-900 text-white px-4 py-1 rounded text-sm"

                  onClick={() => {

                    // Save is handled by the input's onChange above, but you can add extra logic if needed

                  }}

                >

                  Save

                </button>

              </div>

            ))}

            <button

              className="mt-auto bg-blue-900 text-white px-4 py-2 rounded"

              onClick={() => {

                // Optionally, trigger the input box for a new placeholder

                setActiveTool('list');

                showInputAtCursor();

              }}

            >

              Auto Detect Placeholder

            </button>

          </div>

        </div>

      </div>

    </div>



   

  );

};



export default DocumentEditorPage;



// currently working fine placeholeder viceversa inputboox oen hoteoey image insert hoties and text pn
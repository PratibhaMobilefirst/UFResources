
// import React, { useRef, useState, useEffect } from "react";
// import BackArrow from "../../asset/img/Group 37878.svg"
// import {

//   ChevronLeft,

//   Image as ImageIcon,

//   AlignLeft,

//   Send,

//   Save,

//   Eraser,

//   MousePointer,

//   Bold,

//   Italic,

//   Underline,

//   AlignCenter,

//   AlignRight,

//   Check,

//   X

// } from 'lucide-react';

// import Sidebar from "@/components/Sidebar";

// import { useNavigate, useParams } from "react-router-dom";

// import { renderAsync } from "docx-preview";

// import { SidebarProvider } from "@/components/ui/sidebar";

// import { useEditor, EditorContent } from '@tiptap/react';

// import StarterKit from '@tiptap/starter-kit';

// import Image from '@tiptap/extension-image';



// import html2canvas from 'html2canvas'; // Add this import
// import PlaceholderExtension from './PlaceholderExtension'; // your custom extension


// // Define CLAUSES and PLACEHOLDERS at the top

// const CLAUSES = [

//   { title: "Suggested by AI", content: "Lorem ipsum dolor sit amet..." },

//   { title: "Clause A", content: "Clause A content..." },

//   { title: "Clause B", content: "Clause B content..." },

//   { title: "Clause C", content: "Clause C content..." },

// ];



// const PLACEHOLDERS = [

//   "Placeholder 1",

//   "Placeholder 2",

//   "Placeholder 3",

//   "Placeholder 4",

//   "Placeholder 5",

//   "Placeholder 6",

// ];



// const TOOLBAR_OPTIONS = [

//   { key: 'text', label: 'T', icon: null },

//   { key: 'image', label: '', icon: ImageIcon },

//   { key: 'list', label: '', icon: AlignLeft }, // Use AlignLeft as a placeholder for list

//   { key: 'pointer', label: '', icon: MousePointer }, // Use MousePointer as a placeholder for pointer

// ];



// interface DocumentEditorProps {

//   onBack: () => void;

//   initialFile?: File | null;

// }



// const DocumentEditor = ({ onBack, initialFile }: DocumentEditorProps) => {

//   const navigate = useRef(() => window.history.back());



//   const routerNavigate = useNavigate();

//   const { id } = useParams();

//   const [selectedClause, setSelectedClause] = useState(0);

//   const [docTitle, setDocTitle] = useState("Engagement Letter");

//   const [docContent, setDocContent] = useState<string | null>(null);

//   const docxContainerRef = useRef<HTMLDivElement>(null);

//   const [activeTool, setActiveTool] = useState('');

//   const [showInputBox, setShowInputBox] = useState(false);

//   const [inputBoxValue, setInputBoxValue] = useState('');

//   const [inputBoxPosition, setInputBoxPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

//   const inputRef = useRef<HTMLInputElement>(null);

//   const [placeholders, setPlaceholders] = useState<{ value: string, pos: number }[]>([]);

//   const [editingPlaceholder, setEditingPlaceholder] = useState<{ pos: number, value: string, coords: { x: number, y: number } } | null>(null);

//   const [placeholderCoords, setPlaceholderCoords] = useState<{ [pos: number]: { x: number, y: number } }>({});

//   const [isImageUploading, setIsImageUploading] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [insertedImages, setInsertedImages] = useState<{ id: string; src: string }[]>([]);

//   const [pageThumbnails, setPageThumbnails] = useState<string[]>([]);

//   const [currentPage, setCurrentPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(0);

//   const [visiblePages, setVisiblePages] = useState(4); // Number of thumbnails visible at once
//   const [currentStartIndex, setCurrentStartIndex] = useState(0); // Start index for visible thumbnails
//   const thumbnailContainerRef = useRef(null);
// useEffect(() => {
//   if (!docxContainerRef.current) return;

//   const pages = docxContainerRef.current.querySelectorAll('.docx');

//   pages.forEach((page, index) => {
//     const el = page as HTMLElement;

//     el.classList.add('snap-start'); // 💡 NEW

//     el.style.maxWidth = '794px';
//     el.style.minHeight = '1123px';
//     el.style.backgroundColor = 'white';
//     el.style.padding = '40px';
//     el.style.margin = 'auto';
//     el.style.marginBottom = '20px';
//     el.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     el.style.border = '1px solid #e2e8f0';
//     el.style.borderRadius = '8px';

//     // Add page label
//     const existingLabel = el.querySelector('.page-number-label');
//     if (!existingLabel) {
//       const label = document.createElement('div');
//       label.className = 'page-number-label';
//       label.innerText = Page ${index + 1};
//       Object.assign(label.style, {
//         position: 'absolute',
//         top: '-30px',
//         right: '0',
//         fontSize: '12px',
//         color: '#4B5563',
//         fontWeight: '500',
//         backgroundColor: '#F3F4F6',
//         padding: '2px 8px',
//         borderRadius: '4px',
//       });
//       el.insertBefore(label, el.firstChild);
//     }
//   });
// }, [docContent]);



//   const editor = useEditor({

//     extensions: [

//       StarterKit,

//       PlaceholderExtension,

//       Image

//     ],

//     content: '', // initial content

//   });



//   useEffect(() => {

//     if (initialFile) {

//       setDocTitle(initialFile.name);

//       if (initialFile.name.endsWith('.docx')) {

//         const reader = new FileReader();

//         reader.onload = async (e) => {

//           const arrayBuffer = e.target?.result;

//           if (arrayBuffer && docxContainerRef.current) {

//             docxContainerRef.current.innerHTML = '';

//             await renderAsync(arrayBuffer as ArrayBuffer, docxContainerRef.current, undefined, {

//               className: 'docx-preview',

//               inWrapper: false,

//             });

//             setDocContent(null); // We use the rendered HTML
            
//             // Generate thumbnails after document is rendered
//             generatePageThumbnails();

//           }

//         };

//         reader.readAsArrayBuffer(initialFile);

//       } else {

//         const reader = new FileReader();

//         reader.onload = (e) => {

//           const text = e.target?.result as string;

//           setDocContent(text || "");

//         };

//         reader.readAsText(initialFile);

//       }

//     }

//   }, [initialFile]);



//   useEffect(() => {

//     if (!editor) return;



//     const updatePlaceholders = () => {

//       const phs: { value: string, pos: number }[] = [];

//       editor.state.doc.descendants((node, pos) => {

//         if (node.type.name === 'placeholder') {

//           phs.push({ value: node.attrs.value, pos });

//         }

//       });

//       setPlaceholders(phs);

//     };

//     updatePlaceholders();

//     editor.on('update', updatePlaceholders);



//     // Cleanup: remove the listener

//     return () => {

//       editor.off('update', updatePlaceholders);

//     };

//   }, [editor]);



 

//   // Function to handle the scroll event and increase thumbnail size after scrolling
//   const handleScroll = () => {
//     const container = thumbnailContainerRef.current;
//     const isAtEnd = container.scrollWidth - container.scrollLeft === container.clientWidth;

//     if (isAtEnd) {
//       setVisiblePages((prev) => prev + 4); // Add next 4 pages as you scroll
//     }
//   };

//   // Helper to get cursor position in the editor

// const showInputAtCursor = () => {
//   if (!editor) return;

//   const selection = window.getSelection();
//   if (!selection || selection.rangeCount === 0) return;

//   const range = selection.getRangeAt(0);
//   const rect = range.getBoundingClientRect();

//   const x = rect.left || window.innerWidth / 2;
//   const y = rect.bottom || window.innerHeight / 2;

//   setInputBoxPosition({ x, y: y + window.scrollY });
//   setShowInputBox(true);
//   setInputBoxValue('');

//   setTimeout(() => {
//     inputRef.current?.focus();
//   }, 0);
// };



//   const showInputAtPlaceholder = (ph: { pos: number, value: string }) => {

//     const coords = placeholderCoords[ph.pos];

//     if (!coords) return; // fallback if not found

//     setEditingPlaceholder({

//       pos: ph.pos,

//       value: ph.value,

//       coords

//     });

//     setTimeout(() => {

//       inputRef.current?.focus();

//     }, 0);

//   };



//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

//     const file = event.target.files?.[0];

//     if (!file) return;



//     const reader = new FileReader();

//     reader.onload = (e) => {

//       const imageUrl = e.target?.result as string;

//       const imageId = img-${Date.now()};
      
//       // Add the image to our state
//       setInsertedImages(prev => [...prev, {
//         id: imageId,
//         src: imageUrl
//       }]);

//       // Create and insert the image element
//       if (docxContainerRef.current) {
//         const img = document.createElement('img');
//         img.src = imageUrl;
//         img.className = 'inserted-image max-w-full h-auto my-4';
//         img.id = imageId;
        
//         // Insert at cursor position or at the end
//         const selection = window.getSelection();
//         if (selection && selection.rangeCount > 0) {
//           const range = selection.getRangeAt(0);
//           range.insertNode(img);
//           // Add a line break after the image
//           const br = document.createElement('br');
//           range.insertNode(br);
//         } else {
//           docxContainerRef.current.appendChild(img);
//           docxContainerRef.current.appendChild(document.createElement('br'));
//         }
//       }

//       setIsImageUploading(false);

//     };

//     reader.readAsDataURL(file);

//   };



//   // Add function to generate thumbnails
//   const generatePageThumbnails = async () => {
//     if (!docxContainerRef.current) return;

//     const pages = docxContainerRef.current.querySelectorAll('.docx-preview');
//     setTotalPages(pages.length);
    
//     const thumbnails: string[] = [];
    
//     for (let i = 0; i < pages.length; i++) {
//       const page = pages[i] as HTMLElement;
//       try {
//         const canvas = await html2canvas(page, {
//           scale: 0.2, // Scale down for thumbnail
//           useCORS: true,
//           logging: false,
//         });
//         thumbnails.push(canvas.toDataURL('image/png'));
//       } catch (error) {
//         console.error('Error generating thumbnail:', error);
//       }
//     }
    
//     setPageThumbnails(thumbnails);
//   };

//   // Add function to jump to specific page
//   const jumpToPage = (pageNumber: number) => {
//     if (!docxContainerRef.current) return;
    
//     const pages = docxContainerRef.current.querySelectorAll('.docx-preview');
//     if (pageNumber >= 1 && pageNumber <= pages.length) {
//       const targetPage = pages[pageNumber - 1] as HTMLElement;
//       targetPage.scrollIntoView({ behavior: 'smooth' });
//       setCurrentPage(pageNumber);
//     }
//   };



//   return (

   

   

//       <div className="flex min-h-screen w-full bg-[#f8f9fa]">

//       {/* Add hidden file input */}

//       <input

//         type="file"

//         ref={fileInputRef}

//         className="hidden"

//         accept="image/*"

//         onChange={handleImageUpload}

//       />

//       {/* Main Content */}

//       <div className="flex flex-col flex-1 w-full">

//         {/* Header */}

//         <div className="flex items-center justify-between bg-white border-b px-6 py-3">

//           <div className="flex items-center gap-2">

//             <button

//               onClick={() => navigate.current()}

//               className="hover:bg-gray-100 p-1 rounded"

//             >

//              <img src={BackArrow} className="w-5 h-5" />

//             </button>

//             <span className="font-semibold text-lg">Document Editor</span>

//           </div>
//  {/* Toolbar */}

//             <div className="flex gap-4 mb-4 mt-2 p-2">

//               {TOOLBAR_OPTIONS.map((tool) => (

//                 <button

//                   key={tool.key}

//                   className={w-10 h-10 rounded flex items-center justify-center border transition-colors ${

//                     activeTool === tool.key

//                       ? 'bg-blue-100 border-blue-700'

//                       : 'bg-white border-gray-200'

//                   }}

//                   onClick={async () => {

//                     setActiveTool(tool.key);

//                   if (tool.key === 'text' && editor) {
//   showInputAtCursor(); // 💡 trigger input popup
// } else if (tool.key === 'list' && editor) {
//   showInputAtCursor(); // optional: same behavior
// } else if (tool.key === 'image') {
//   fileInputRef.current?.click();
//   setIsImageUploading(true);
// }

//                   }}

//                   title={tool.key.charAt(0).toUpperCase() + tool.key.slice(1)}

//                 >

//                   {tool.icon ? (

//                     <tool.icon className={w-5 h-5 ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}} />

//                   ) : (

//                     <span className={font-bold text-lg ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}}>{tool.label}</span>

//                   )}

//                 </button>

//               ))}

//             </div>
//           <div className="flex gap-2">

//            <div className="flex items-center bg-gray-200 rounded-full p-1 w-fit">
//   <button
//     className="bg-[#00426E] text-white px-4 py-1.5 rounded-full font-medium"
//   >
//     Edit Document
//   </button>

//   <button
//     className="text-gray-700 px-4 py-1.5 rounded-full font-medium"
//     onClick={() => routerNavigate(/case/${id})}
//   >
//     Mark as Finished
//   </button>
// </div>

//             <button className="bg-[#00426E] text-white px-4 py-2 rounded" onClick={() => routerNavigate(/case/${id})}>Save as Draft</button>

//           </div>

//         </div>

//         {/* Content */}

//         <div className="flex flex-1 w-full" style={{ minHeight: 100}}>

//           {/* Left Sidebar */}

//           <div className="w-64 bg-white border-r flex flex-col" style={{ minHeight: "calc(100vh - 56px)" }}>

//             <div className="p-4 border-b">

//               <div className="font-semibold text-sm mb-2">Case Name</div>

//               <div className="text-base font-medium mb-4">Anderson Trust Creation</div>

//               <div className="font-semibold text-sm mb-2">Documents</div>

//               <div className="bg-[#E7F5FF] text-[#00426E] rounded px-3 py-2 font-medium mb-4 cursor-pointer">

//                 {docTitle}

//               </div>

//             </div>

//             <div className="flex-1 overflow-y-auto p-4">

//               {CLAUSES.map((clause, idx) => (

//                 <div

//                   key={clause.title}

//                   className={mb-3 p-3 rounded border cursor-pointer ${

//                     idx === selectedClause

//                       ? "bg-[#FFF9E5] border-[#FFD600]"

//                       : "bg-white border-gray-200"

//                   }}

//                   onClick={() => setSelectedClause(idx)}

//                 >

//                   <div className="font-semibold text-sm mb-1">{clause.title}</div>

//                   <div className="text-xs text-gray-600">{clause.content}</div>

//                 </div>

//               ))}

//             </div>

//           </div>

//           {/* Main Editor */}

//           <div className="flex-1 flex flex-col items-center bg-[#f8f9fa] relative">

//             {/* Toolbar */}

//             {/* <div className="flex gap-4 mb-4 mt-2 bg-white p-2 rounded-lg shadow-sm">

//               {TOOLBAR_OPTIONS.map((tool) => (

//                 <button

//                   key={tool.key}

//                   className={w-10 h-10 rounded flex items-center justify-center border transition-colors ${

//                     activeTool === tool.key

//                       ? 'bg-blue-100 border-blue-700'

//                       : 'bg-white border-gray-200'

//                   }}

//                   onClick={async () => {

//                     setActiveTool(tool.key);

//                     if (tool.key === 'list' && editor) {

//                       showInputAtCursor();

//                     } else if (tool.key === 'image') {

//                       fileInputRef.current?.click();

//                       setIsImageUploading(true);

//                     }

//                   }}

//                   title={tool.key.charAt(0).toUpperCase() + tool.key.slice(1)}

//                 >

//                   {tool.icon ? (

//                     <tool.icon className={w-5 h-5 ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}} />

//                   ) : (

//                     <span className={font-bold text-lg ${activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'}}>{tool.label}</span>

//                   )}

//                 </button>

//               ))}

//             </div> */}

//             {/* Input Box for Placeholder */}

//             {showInputBox && (

//               <div

//                 className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex items-center gap-2"

//                 style={{

//                   left: inputBoxPosition.x,

//                   top: inputBoxPosition.y,

//                 }}

//                 onClick={e => e.stopPropagation()}

//               >

//                <input
//   ref={inputRef}
//   type="text"
//   value={inputBoxValue}
//   onChange={(e) => setInputBoxValue(e.target.value)}
//   onKeyDown={(e) => {
//     if (e.key === 'Enter') {
//       if (inputBoxValue.trim() && editor) {
//         if (activeTool === 'text') {
//           editor.chain().focus().insertContent(inputBoxValue).run();
//         } else {
//           editor.chain().focus().insertContent({
//             type: 'placeholder',
//             attrs: { value: inputBoxValue }
//           }).run();
//         }

//         setShowInputBox(false);
//         setInputBoxValue('');
//       }
//     } else if (e.key === 'Escape') {
//       setShowInputBox(false);
//       setInputBoxValue('');
//     }
//   }}
//   className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px]"
//   autoFocus
// />


//                 <button

//                   onClick={() => {

//                     if (inputBoxValue.trim() && editor) {

//                       editor.chain().focus().insertContent({

//                         type: 'placeholder',

//                         attrs: { value: inputBoxValue }

//                       }).run();



//                       let lastPos = -1;

//                       editor.state.doc.descendants((node, pos) => {

//                         if (node.type.name === 'placeholder' && node.attrs.value === inputBoxValue) {

//                           lastPos = pos;

//                         }

//                       });



//                       if (lastPos !== -1) {

//                         setPlaceholderCoords(prev => ({

//                           ...prev,

//                           [lastPos]: { ...inputBoxPosition }

//                         }));

//                       }



//                       setShowInputBox(false);

//                       setInputBoxValue('');

//                     }

//                   }}

//                   className="p-1 hover:bg-green-50 rounded-full"

//                 >

//                   <Check className="w-4 h-4 text-green-600" />

//                 </button>

//                 <button

//                   onClick={() => {

//                     setShowInputBox(false);

//                     setInputBoxValue('');

//                   }}

//                   className="p-1 hover:bg-red-50 rounded-full"

//                 >

//                   <X className="w-4 h-4 text-red-600" />

//                 </button>

//               </div>

//             )}

//             {editingPlaceholder && (

//               <div

//                 className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex items-center gap-2"

//                 style={{

//                   left: editingPlaceholder.coords.x,

//                   top: editingPlaceholder.coords.y,

//                 }}

//                 onClick={e => e.stopPropagation()}

//               >

//                 <input

//                   ref={inputRef}

//                   type="text"

//                   value={editingPlaceholder.value}

//                   onChange={e => setEditingPlaceholder(editingPlaceholder => editingPlaceholder ? { ...editingPlaceholder, value: e.target.value } : null)}

//                   onKeyDown={e => {

//                     if (e.key === 'Enter') {

//                       if (editingPlaceholder.value.trim() && editor) {

//                         editor.chain().focus().setNodeSelection(editingPlaceholder.pos).updateAttributes('placeholder', { value: editingPlaceholder.value }).run();

//                         setEditingPlaceholder(null);

//                       }

//                     } else if (e.key === 'Escape') {

//                       setEditingPlaceholder(null);

//                     }

//                   }}

//                   className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px]"

//                   autoFocus

//                 />

//                 <button

//                   onClick={() => {

//                     if (editingPlaceholder.value.trim() && editor) {

//                       editor.chain().focus().setNodeSelection(editingPlaceholder.pos).updateAttributes('placeholder', { value: editingPlaceholder.value }).run();

//                       setEditingPlaceholder(null);

//                     }

//                   }}

//                   className="p-1 hover:bg-green-50 rounded-full"

//                 >

//                   <Check className="w-4 h-4 text-green-600" />

//                 </button>

//                 <button

//                   onClick={() => setEditingPlaceholder(null)}

//                   className="p-1 hover:bg-red-50 rounded-full"

//                 >

//                   <X className="w-4 h-4 text-red-600" />

//                 </button>

//               </div>

//             )}

//             {/* Document Preview (scrollable) */}

            

//             {/* <div 
//   className="bg-white rounded-lg shadow w-full max-w-2xl min-h-[350px] overflow-y-auto overflow-x-hidden scrollbar-hide" 
//   style={{ maxHeight: '350px' }}


//               ref={docxContainerRef}
//               contentEditable={true}
//             >
//                 {docContent !== null ? (
//                 <div className="text-gray-700 bg-red-500 text-base " style={{whiteSpace: 'pre-wrap'}}>
//                   {docContent}
//                 </div>
//               ) : (
//                 <div className="docx-preview text-gray-700 text-base" />
//               )}
            
//             </div> */}
// {/* <div 
//   className="bg-white mt-5 rounded-lg shadow mx-auto max-w-2xl min-h-[0px] overflow-y-auto overflow-x-hidden scrollbar-hide p-8 flex flex-col items-center justify-center"
//   style={{ maxHeight: '500px' }}
//   ref={docxContainerRef}
//   contentEditable={true}
//   tabIndex={0}
//   onFocus={() => setActiveTool('text')}
// >
//   {docContent !== null ? (
//     <div 
//       className="text-gray-700 text-base break-words whitespace-pre-wrap w-full" 
//     >
//       {docContent}
//     </div>
//   ) : (
//     <div className="docx-preview text-gray-700 text-base w-full" />
//   )}
// </div> */}
// <div
//   className="mt-5 mx-auto max-w-4xl overflow-y-auto p-6 bg-[#f8f9fa]"
//   style={{ maxHeight: '600px' }}
// >
//   <div
//     ref={docxContainerRef}
//     className="flex flex-col items-center gap-12 bg-white"
//   />
// </div>

//             {/* Page Thumbnails */}
//             <div className="fixed  w-[65%] h-[20%] bottom-4 left-[49%] transform -translate-x-1/2 flex items-center bg-[#FAFAFA] p-2 rounded-lg shadow-lg">
//               {/* Left Arrow */}
//               <button
//                 className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
//                 onClick={() => setCurrentStartIndex(i => Math.max(i - visiblePages, 0))}
//                 disabled={currentStartIndex === 0}
//                 aria-label="Scroll left"
//               >
//                 <ChevronLeft />
//               </button>
//               {/* Thumbnails */}
//               <div
//                 className="flex gap-2 overflow-x-hidden"
//                 style={{ width: 120 * visiblePages + 8 * (visiblePages - 1) }} // 4 thumbnails + 3 gaps
//               >
//                 {pageThumbnails
//                   .slice(currentStartIndex, currentStartIndex + visiblePages)
//                   .map((thumbnail, index) => (
//                     <div
//                       key={currentStartIndex + index}
//                       className={w-36 h-20 bg-white border rounded cursor-pointer transition-all relative ${
//                         currentPage === currentStartIndex + index + 1 ? 'ring-2 ring-blue-500' : ''
//                       }}
//                       onClick={() => jumpToPage(currentStartIndex + index + 1)}
//                     >
//                       <img
//                         src={thumbnail}
//                         alt={Page ${currentStartIndex + index + 1}}
//                         className="w-full h-full object-cover rounded"
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">
//                         {currentStartIndex + index + 1}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//               {/* Right Arrow */}
//               <button
//                 className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
//                 onClick={() =>
//                   setCurrentStartIndex(i =>
//                     Math.min(i + visiblePages, Math.max(pageThumbnails.length - visiblePages, 0))
//                   )
//                 }
//                 disabled={currentStartIndex + visiblePages >= pageThumbnails.length}
//                 aria-label="Scroll right"
//               >
//                 <ChevronLeft className="rotate-180" />
//               </button>
//             </div>

//           </div>

//           {/* Right Sidebar */}

//           <div className="w-72 bg-white border-l flex flex-col p-4" style={{ minHeight: "calc(100vh - 56px)" }}>

//             <div className="font-semibold mb-4">Place Holders</div>

//             {placeholders.length === 0 && (

//               <div className="text-gray-400 text-sm mb-4">No placeholders added yet.</div>

//             )}

//             {placeholders.map((ph, idx) => (

//               <div key={ph.pos} className="mb-6 p-4 bg-[#F8FAFC] rounded-lg border border-gray-200 relative">

//                 <div className="flex items-center justify-between mb-2">

//                   <span

//                     className="font-medium text-gray-800 cursor-pointer hover:underline"

//                     onClick={() => showInputAtPlaceholder(ph)}

//                   >

//                     {ph.value}

//                   </span>

//                   <button

//                     className="text-gray-400 hover:text-red-500"

//                     onClick={() => {

//                       editor.chain().focus().deleteRange({ from: ph.pos, to: ph.pos + 1 }).run();

//                     }}

//                   >

//                     <X className="w-4 h-4" />

//                   </button>

//                 </div>

//                 <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">

//                   Located at: <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Page 1</span>

//                 </div>

//                 <div className="mb-2">

//                   <label className="block text-xs text-gray-500 mb-1">Placeholder Name</label>

//                   <input

//                     className="border rounded px-3 py-2 text-sm w-full"

//                     value={ph.value}

//                     onChange={e => {

//                       editor.chain().focus().setNodeSelection(ph.pos).updateAttributes('placeholder', { value: e.target.value }).run();

//                     }}

//                   />

//                 </div>

                

//               </div>

//             ))}

//             <button

//               className="mt-auto bg-[#00426E] text-white px-4 py-2 rounded"

//               onClick={() => {

//                 // Optionally, trigger the input box for a new placeholder

//                 setActiveTool('list');

//                 showInputAtCursor();

//               }}

//             >

//               Auto Detect Placeholder

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>



   

//   );

// };



// export default DocumentEditor; 
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
import { useNavigate } from 'react-router-dom';
const A4_WIDTH = 794;
const A4_HEIGHT = 800;
 
const DocumentEditor: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('arrow');
  const [placeholders, setPlaceholders] = useState<PlaceholderMeta[]>([]);
  const [images, setImages] = useState<{ id: string; src: string; width?: number; height?: number }[]>([]);
  const [docTitle, setDocTitle] = useState('Untitled Document');
  const [docContent, setDocContent] = useState<string | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageThumbnails, setPageThumbnails] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputBoxValue, setInputBoxValue] = useState('');
  const [inputBoxPosition, setInputBoxPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useRef(() => window.history.back());
  const routerNavigate = useNavigate();
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
          // Render docx visually using docx-preview
          if (docxContainerRef.current) {
            docxContainerRef.current.innerHTML = '';
            await renderAsync(arrayBuffer, docxContainerRef.current, undefined, {
              className: 'docx-preview',
              inWrapper: false,
            });
            // Each .docx page is rendered as a .docx-preview element
            const pageEls = Array.from(docxContainerRef.current.querySelectorAll('.docx-preview')) as HTMLElement[];
            const pageHtmls = pageEls.map(el => el.outerHTML);
            setPages(pageHtmls);
            setCurrentPage(0);
            setDocContent(pageHtmls[0] || '');
            if (editor) editor.commands.setContent(pageHtmls[0] || '');
            setTimeout(() => generatePageThumbnails(pageEls), 100);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        const textContent = typeof result === 'string' ? result : '';
        setPages([textContent]);
        setCurrentPage(0);
        setDocContent(textContent);
        if (editor) editor.commands.setContent(textContent);
        setTimeout(() => generatePageThumbnails([textContent]), 100);
      };
      reader.readAsText(file);
    }
  }, [file, editor]);
 
  // Generate thumbnails for each page (from docx-preview elements)
  const generatePageThumbnails = async (pageEls: HTMLElement[] | string[]) => {
    const thumbnails: string[] = [];
    for (let i = 0; i < pageEls.length; i++) {
      let el: HTMLElement;
      if (typeof pageEls[i] === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = pageEls[i] as string;
        tempDiv.style.width = '794px';
        tempDiv.style.height = '1123px';
        tempDiv.style.background = 'white';
        tempDiv.style.padding = '40px';
        tempDiv.style.overflow = 'hidden';
        document.body.appendChild(tempDiv);
        el = tempDiv;
      } else {
        el = pageEls[i] as HTMLElement;
      }
      try {
        const canvas = await html2canvas(el, { scale: 0.15, useCORS: true, logging: false });
        thumbnails.push(canvas.toDataURL('image/png'));
      } catch (error) {
        thumbnails.push('');
      }
      if (typeof pageEls[i] === 'string') {
        document.body.removeChild(el);
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
      const imageId = `img-${Date.now()}`;
      setImages((prev) => [...prev, { id: imageId, src: imageUrl, width: 300, height: 200 }]);
      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl, width: 300, height: 200 }).run();
      }
    };
    reader.readAsDataURL(file);
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
    // Get current content as HTML
    const html = editor.getHTML();
    // Find all {{...}} and [PLACEHOLDER] patterns
    const regex = /({{([^}]+)}}|\[([^[\]]+)\])/g;
    let match;
    let newContent = html;
    let offset = 0;
    const matches: { value: string; index: number; length: number }[] = [];
    while ((match = regex.exec(html)) !== null) {
      const value = match[2] || match[3] || 'Placeholder';
      matches.push({ value, index: match.index, length: match[0].length });
    }
    if (matches.length === 0) return;
    // Replace all matches with placeholder nodes using TipTap's insertContent
    let pos = 0;
    editor.commands.setContent(''); // Clear editor
    for (let i = 0; i < matches.length; i++) {
      const before = html.slice(pos, matches[i].index);
      if (before) editor.commands.insertContent(before);
      editor.commands.insertContent({ type: 'placeholder', attrs: { value: matches[i].value } });
      pos = matches[i].index + matches[i].length;
    }
    // Insert any remaining text
    if (pos < html.length) {
      editor.commands.insertContent(html.slice(pos));
    }
  };
 
  // Handle page change
  const handlePageSelect = (pageIdx: number) => {
    setCurrentPage(pageIdx);
    setDocContent(pages[pageIdx] || '');
    if (editor) editor.commands.setContent(pages[pageIdx] || '');
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
const [currentStartIndex, setCurrentStartIndex] = useState(0);
const visiblePages = 15; // Number of thumbnails shown at a time
const jumpToPage = (pageIndex: number) => {
  handlePageSelect(pageIndex);
};
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
 {/* Toolbar */}
 
          {/* <div className="flex gap-4 mb-4 mt-2 p-2">
  {TOOLBAR_OPTIONS.map((tool) => (
    <button
      key={tool.key}
      className={`w-10 h-10 rounded flex items-center justify-center border transition-colors ${
        activeTool === tool.key
          ? 'bg-blue-100 border-blue-700'
          : 'bg-white border-gray-200'
      }`}
      onClick={async () => {
        setActiveTool(tool.key);
        if (tool.key === 'text' && editor) {
          showInputAtCursor();
        } else if (tool.key === 'list' && editor) {
          showInputAtCursor();
        } else if (tool.key === 'image') {
          fileInputRef.current?.click();
          setIsImageUploading(true);
        }
      }}
      title={tool.key.charAt(0).toUpperCase() + tool.key.slice(1)}
    >
      {tool.icon ? (
        <tool.icon
          className={`w-5 h-5 ${
            activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'
          }`}
        />
      ) : (
        <span
          className={`font-bold text-lg ${
            activeTool === tool.key ? 'text-blue-900' : 'text-gray-700'
          }`}
        >
          {tool.label}
        </span>
      )}
    </button>
  ))}
</div> */}
 
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
      {/* Hidden docx-preview container for rendering pages */}
      <div ref={docxContainerRef} style={{ display: 'none' }} />
      <div className="flex min-h-screen w-full bg-[#f8f9fa]">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="font-semibold text-sm mb-2">Case Name</div>
          <div className="text-base font-medium mb-4">Anderson Trust Creation</div>
          <div className="font-semibold text-sm mb-2">Documents</div>
          <div className="bg-[#E7F5FF] text-[#00426E] rounded px-3 py-2 font-medium mb-4 cursor-pointer">
            {docTitle}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept=".txt,.docx" onChange={handleFileChange} />
          <button className="bg-blue-100 text-blue-900 px-3 py-1 rounded" onClick={() => fileInputRef.current?.click()}>
            Upload Document
          </button>
        </div>
        {/* Clause List (example) */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="font-semibold text-sm mb-2">Clauses</div>
          <div className="mb-3 p-3 rounded border bg-white border-gray-200 cursor-pointer">
            <div className="font-semibold text-sm mb-1">Clause A</div>
            <div className="text-xs text-gray-600">Clause A content...</div>
          </div>
          {/* Add more clauses as needed */}
        </div>
      </div>
      {/* Main Editor */}
      <div className="flex-1 flex flex-col items-center bg-[#f8f9fa] relative">
     
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
              className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[200px] min-h-[600px]"
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
        <div
          className="prose bg-white p-6 rounded-lg shadow max-w-3xl w-full min-h-[400px] mt-4"
          style={{ minHeight: `${A4_HEIGHT / 2}px`, maxWidth: `${A4_WIDTH}px` }}
        >
          {editor && <EditorContent editor={editor} />}
        </div>
        {/* Thumbnails at the bottom */}
  <div className="fixed w-[65%] h-[120px] bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between bg-[#FAFAFA] px-4 py-2 rounded-lg shadow-lg z-50">
  {/* Left Arrow */}
  <button
    className="w-8 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
    onClick={() => setCurrentStartIndex(i => Math.max(i - visiblePages, 0))}
    disabled={currentStartIndex === 0}
    aria-label="Scroll left"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
 
  {/* Thumbnail Strip */}
  <div
    className="flex gap-3 overflow-hidden"
    style={{
      width: `${120 * visiblePages + 12 * (visiblePages - 1)}px`,
    }}
  >
    {pageThumbnails
      .slice(currentStartIndex, currentStartIndex + visiblePages)
      .map((thumbnail, index) => {
        const pageIndex = currentStartIndex + index;
        return (
          <div
            key={pageIndex}
            className={`w-[120px] h-[80px] bg-white border rounded cursor-pointer transition-all relative ${
              currentPage === pageIndex ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => jumpToPage(pageIndex)}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`Page ${pageIndex + 1}`}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-100 rounded">
                No Preview
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">
              {pageIndex + 1}
            </div>
          </div>
        );
      })}
  </div>
 
  {/* Right Arrow */}
  <button
    className="w-8 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
    onClick={() =>
      setCurrentStartIndex(i =>
        Math.min(i + visiblePages, Math.max(pageThumbnails.length - visiblePages, 0))
      )
    }
    disabled={currentStartIndex + visiblePages >= pageThumbnails.length}
    aria-label="Scroll right"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
</div>
 
 
      </div>
      {/* Right Sidebar */}
      <div className="w-72 bg-white border-l flex flex-col p-4">
        <div className="font-semibold mb-4">Images</div>
        {images.length === 0 && <div className="text-gray-400 text-sm mb-4">No images added yet.</div>}
        {images.map((img) => (
          <div key={img.id} className="mb-4 p-2 bg-gray-50 rounded border flex flex-col items-center">
            <img src={img.src} alt="Inserted" className="w-20 h-20 object-contain mb-2 border" style={{ width: img.width, height: img.height }} />
            <div className="text-xs text-gray-600 mb-1">Image</div>
            <div className="flex gap-2 items-center mb-1">
              <label className="text-xs">W:</label>
              <input type="number" value={img.width || 100} min={50} max={800} className="w-12 border rounded px-1 text-xs" onChange={e => handleImageResize(img.id, Number(e.target.value), img.height || 100)} />
              <label className="text-xs">H:</label>
              <input type="number" value={img.height || 100} min={50} max={1123} className="w-12 border rounded px-1 text-xs" onChange={e => handleImageResize(img.id, img.width || 100, Number(e.target.value))} />
            </div>
          </div>
        ))}
        <div className="font-semibold mb-4 mt-6">Placeholders</div>
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
 
export default DocumentEditor
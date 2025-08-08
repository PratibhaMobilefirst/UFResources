// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";

// // interface Column {
// //   key: string;
// //   label: string;
// // }

// // interface CustomTableProps {
// //   columns: Column[];
// //   data: Record<string, any>[];
// // }

// // export function CustomTable({ columns, data }: CustomTableProps) {
// //   return (
// //     <div className="rounded-md border">
// //       <Table>
// //         <TableHeader>
// //           <TableRow className="bg-muted/50">
// //             {columns.map((column) => (
// //               <TableHead key={column.key} className="font-medium text-blue-600">
// //                 {column.label}
// //               </TableHead>
// //             ))}
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {data.map((row, index) => (
// //             <TableRow key={index} className="hover:bg-muted/25">
// //               {columns.map((column) => (
// //                 <TableCell key={column.key} className="py-3">
// //                   {row[column.key]}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // }

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";
// import { Eye } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// interface Column {
//   key: string;
//   label: string;
// }

// interface CustomTableProps {
//   columns: Column[];
//   data: Record<string, any>[];
// }

// export function CustomTable({ columns, data }: CustomTableProps) {
//   const [previewData, setPreviewData] = useState<string | null>(null);

//   const handlePreview = (row: Record<string, any>) => {
//     // setPreviewData(row.preview); // assume 'preview' is a key with document content
//   };

//   const closePreview = () => {
//     setPreviewData(null);
//   };

//   return (
//     <>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted/50">
//               {columns.map((column) => (
//                 <TableHead
//                   key={column.key}
//                   className="font-medium text-blue-600"
//                 >
//                   {column.label}
//                 </TableHead>
//               ))}
//               <TableHead className="text-center font-medium text-blue-600">
//                 Preview
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.map((row, index) => (
//               <TableRow key={index} className="hover:bg-muted/25">
//                 {columns.map((column) => (
//                   <TableCell key={column.key} className="py-3">
//                     {row[column.key]}
//                   </TableCell>
//                 ))}
//                 <TableCell className="text-center">
//                   <Eye
//                     className="cursor-pointer text-blue-500 hover:text-blue-700"
//                     onClick={() => handlePreview(row)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Dialog open={!!previewData} onOpenChange={closePreview}>
//         <DialogContent className="max-w-xl h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Engagement Letter</DialogTitle>
//           </DialogHeader>
//           <div className="text-sm whitespace-pre-line px-1">{previewData}</div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface CustomTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onPreview?: (documentId: string) => void;
}

export function CustomTable({ columns, data, onPreview }: CustomTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead key={column.key} className="font-medium text-blue-600">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-center font-medium text-blue-600">
              Preview
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/25">
              {columns.map((column) => (
                <TableCell key={column.key} className="py-3">
                  {row[column.key]}
                </TableCell>
              ))}
              <TableCell className="text-center">
                <Eye
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => onPreview?.(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

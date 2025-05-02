import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface Column {
  header: string;
  accessorKey: string;
}

interface ContentTableProps {
  data: any[];
  columns: Column[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const ContentTable = ({
  data,
  columns,
  showActions = false,
  onEdit,
  onDelete,
  onToggleStatus,
}: ContentTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Table className="border border-[#E5E7EB]">
        <TableHeader>
          <TableRow className="bg-[#F2FAFF]">
            {columns.map((column) => (
              <TableHead 
                key={column.accessorKey} 
                className="text-[#035C98] font-medium text-center"
              >
                {column.header}
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="text-[#035C98] font-medium text-center">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell 
                  key={column.accessorKey} 
                  className="text-[#777777] text-center"
                >
                  {column.accessorKey === "status" ? (
                    <div className="flex justify-center">
                      <Switch
                        checked={row[column.accessorKey]}
                        onCheckedChange={() => onToggleStatus?.(row.sno)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  ) : (
                    row[column.accessorKey]
                  )}
                </TableCell>
              ))}
              {showActions && (
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      onClick={() => onEdit?.(row.sno)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-600"
                      onClick={() => onDelete?.(row.sno)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex justify-between items-center w-full">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded"
        >
          Previous
        </Button>

        <span className="text-sm text-[#6B7280]">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContentTable;

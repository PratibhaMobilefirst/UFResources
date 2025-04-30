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
  showEditIcon?: boolean; // Flag to control whether Edit icon is shown
}

const ITEMS_PER_PAGE = 5;

const ContentTable = ({
  data,
  columns,
  showEditIcon = false,
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
              <TableHead key={column.accessorKey} className="text-[#035C98] font-medium">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey} className="text-[#777777]">
                  {column.accessorKey === "status" ? (
                    <Switch
                      checked={row[column.accessorKey]}
                      className="data-[state=checked]:bg-green-500"
                    />
                  ) : (
                    row[column.accessorKey]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center w-full ">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {/* <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="text-[#00426E]"
                  disabled={currentPage === 1}
                /> */}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              </PaginationItem>
              {/* {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className={
                      currentPage === i + 1 ? "bg-[#00426E] text-white" : ""
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))} */}

              <span className="text-center">
                Page {currentPage} of {totalPages}
              </span>
              <PaginationItem>
                {/* <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="text-[#00426E]"
                  disabled={currentPage === totalPages}
                /> */}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ContentTable;

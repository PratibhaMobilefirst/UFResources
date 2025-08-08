import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomTable } from "@/components/CustomTable";
import { Eye, Download, ArrowLeft, Upload, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/dateFormat";
import { useEffect, useState } from "react";
import BackArrow from "../asset/img/Group 37878.svg";
import { usePersonalToggleStatus } from "@/hooks/UsePersonal";
import { Document, downloadPersonalDocument } from "./../api/Personal";
interface DocumentContentProps {
  data: any;
  showEngagementLetter?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  handleNavigateEngagementLetter?: () => void;
  handleNavigateDocument?: () => void;
  caseId?: string | null;
  refetch?: () => void;
  handlePreview?: (documentId: string) => void;
  handleEditDocument?: (documentId: string) => void;
}

export function DocumentContent({
  data,
  showEngagementLetter,
  currentPage,
  totalPages,
  onPageChange,
  handleNavigateEngagementLetter,
  handleNavigateDocument,
  caseId,
  refetch,
  handlePreview,
  handleEditDocument,
}: DocumentContentProps) {
  const navigate = useNavigate();
  console.log({ caseId }, "caseId");

  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(
    data?.data?.isActive ? "active" : "finished"
  );

  useEffect(() => {
    // Keep in sync if API updates from outside
    setTabValue(data?.data?.isActive ? "active" : "finished");
  }, [data?.data?.isActive]);

  const engagementColumns = [
    { key: "sno", label: "S.no" },
    { key: "documentType", label: "Document Type" },
    { key: "createdOn", label: "Created on" },
    { key: "lastModified", label: "Last Modified" },
    { key: "status", label: "Status" },
    { key: "signingStatus", label: "Signing Status" },
    // { key: "preview", label: "Preview" },
    { key: "modify", label: "Modify" },
    { key: "export", label: "Export" },
  ];

  const engagementData =
    data?.data?.engagementLetters?.map((item, index) => ({
      id: item.id,
      sno: `${index + 1}`.padStart(3, "0"),
      documentType: "Engagement Letter",
      createdOn: formatDate(item.createdAt),
      lastModified: formatDate(item.createdAt),
      status: "NA",
      signingStatus: item.signedStatus ? "Signed" : "NA",
      preview: (
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      ),
      modify: (
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      ),
      export: (
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4" />
        </Button>
      ),
    })) || [];

  const documentColumns = [
    { key: "sno", label: "S.no" },
    { key: "caseName", label: "Case Name" },
    { key: "lastUpdated", label: "Last Updated" },
    { key: "documentStatus", label: "Document Status" },
    // { key: "preview", label: "Preview" },
    { key: "editDocument", label: "Edit Document" },
    { key: "export", label: "Export" },
  ];

  const documentData =
    data?.data?.documents?.map((item, index) => ({
      id: item.documents?.id,
      sno: `${index + 1}`.padStart(3, "0"),
      caseName: item.documentName,
      lastUpdated: new Date(item.date).toLocaleDateString("en-GB"),
      documentStatus: (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          In Progress
        </Badge>
      ),
      preview: (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePreview(item.id)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
      editDocument: (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditDocument(item.id)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      ),
      export: (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => downloadPersonalDocument(item.id)}
        >
          <Download className="w-4 h-4" />
        </Button>
      ),
    })) || [];

  console.log({ engagementData, documentData }, "engagementData, documentData");
  const { mutate: toggleStatus, isPending } = usePersonalToggleStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Left side: Back button and name */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <img src={BackArrow} alt="img" className="w-6 h-6" />
            </Button>
            <h2 className="text-2xl font-semibold">
              {data?.data?.attorney?.firstName || "N/A"}
            </h2>
          </div>

          {/* Right side: Active/Inactive badge */}
          {!showEngagementLetter && (
            <Badge
              variant="secondary"
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                data?.data?.isActive
                  ? "bg-[#00426E] text-white"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              {data?.data?.isActive ? "Active" : "Inactive"}
            </Badge>
          )}
        </div>

        {showEngagementLetter && (
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs
              value={tabValue}
              onValueChange={(value) => {
                if (value !== tabValue) {
                  // ✅ Prevent double call
                  setTabValue(value); // Optimistic UI update
                  setLoadingTab(value);
                  toggleStatus(caseId, {
                    onSettled: () => setLoadingTab(null),
                    onSuccess: () => {
                      refetch?.(); // Refetch data after status change
                    },
                  });
                }
              }}
              className="w-full max-w-[320px]"
            >
              <TabsList className="grid w-full grid-cols-2 bg-[#E5E7EB] rounded-full px-1 shadow-sm">
                <TabsTrigger
                  value="active"
                  className="rounded-full text-sm font-semibold px-4 py-2 transition-all 
                     data-[state=active]:bg-[#00426E] data-[state=active]:text-white 
                     data-[state=active]:shadow-sm"
                >
                  {loadingTab === "active" ? "Updating..." : "Mark as Active"}
                </TabsTrigger>
                <TabsTrigger
                  value="finished"
                  className="rounded-full text-sm font-semibold px-4 py-2 transition-all 
                     data-[state=active]:bg-[#00426E] data-[state=active]:text-white 
                     data-[state=active]:shadow-sm"
                >
                  {loadingTab === "finished"
                    ? "Updating..."
                    : "Mark as Finished"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>

      {/* Case Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Case ID</span>
          <p className="font-medium">001</p>
        </div>
        <div>
          <span className="text-muted-foreground">State</span>
          <p className="font-medium">{data?.data?.state?.stateName}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Client Name</span>
          <p className="font-medium">{data?.data?.caseName || "N/A"}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Created Date</span>
          <p className="font-medium">{formatDate(data?.data?.createdAt)}</p>
        </div>
      </div>

      {/* Engagement Letter Section */}

      {showEngagementLetter && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Engagement Letter</h3>
            <div className="flex gap-2">
              <Button
                className="bg-[#00426E] hover:bg-[#003058]"
                onClick={() => handleNavigateEngagementLetter()}
              >
                Create Engagement Letter
              </Button>
              <Button
                variant="outline"
                className="bg-[#00426E] text-white hover:bg-[#0030589f]"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload
              </Button>
            </div>
          </div>
          {engagementData.length > 0 ? (
            <CustomTable columns={engagementColumns} data={engagementData} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-500 text-sm">
                No engagement letter created yet
              </p>
            </div>
          )}
        </div>
      )}

      {/* Document Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Document</h3>
          <div className="flex gap-2">
            <Button
              className="bg-[#00426E] hover:bg-[#003058]"
              onClick={() => handleNavigateDocument()}
            >
              Create Document
            </Button>
            {/* <Button
                variant="outline"
                className="bg-[#00426E] text-white hover:bg-[#0030589f]"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload
              </Button> */}
          </div>
        </div>
        {documentData.length > 0 ? (
          <CustomTable
            columns={documentColumns}
            data={documentData}
            onPreview={handlePreview}
          />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center cursor-pointer">
            <p className="text-gray-500 text-sm">No document created yet</p>
          </div>
        )}
      </div>
      {/* Pagination */}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={
                    currentPage === index + 1
                      ? "cursor-pointer active"
                      : "cursor-pointer"
                  }
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

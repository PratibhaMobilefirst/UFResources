import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomTable } from "@/components/CustomTable";
import { Eye, Download, ArrowLeft, Upload, Edit } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useCaseDetails } from "@/hooks/usePrivateCases";
import { formatDate } from "@/utils/dateFormat";

export function DocumentContent() {
  const { state } = useLocation();
  const { template, id } = state;
  const navigate = useNavigate();

  console.log(id?.attorneyId, template, "template");
  const { data, isLoading, isError } = useCaseDetails({
    caseId: template,
    attorneyId: id?.attorneyId,
  });
  console.log({ data, isLoading, isError }, "data  isLoading isError");

  console.log({ state }, "state");
  const engagementColumns = [
    { key: "sno", label: "S.no" },
    { key: "documentType", label: "Document Type" },
    { key: "createdOn", label: "Created on" },
    { key: "lastModified", label: "Last Modified" },
    { key: "status", label: "Status" },
    { key: "signingStatus", label: "Signing Status" },
    { key: "preview", label: "Preview" },
    { key: "modify", label: "Modify" },
    { key: "export", label: "Export" },
  ];

  const engagementData =
    data?.data?.engagementLetters?.map((item, index) => ({
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

  //   {
  //     sno: "003",
  //     documentType: "Engagement Letter",
  //     createdOn: "1.2.2024",
  //     lastModified: "1.2.2024",
  //     status: "NA",
  //     signingStatus: "NA",
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     modify: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //     export: (
  //       <Button variant="ghost" size="sm">
  //         <Download className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  //   {
  //     sno: "002",
  //     documentType: "Engagement Letter",
  //     createdOn: "30.1.2024",
  //     lastModified: "30.1.2024",
  //     status: "NA",
  //     signingStatus: "NA",
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     modify: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //     export: (
  //       <Button variant="ghost" size="sm">
  //         <Download className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  //   {
  //     sno: "001",
  //     documentType: "Engagement Letter",
  //     createdOn: "28.1.2024",
  //     lastModified: "28.1.2024",
  //     status: "NA",
  //     signingStatus: "NA",
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     modify: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //     export: (
  //       <Button variant="ghost" size="sm">
  //         <Download className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  // ];

  const documentColumns = [
    { key: "sno", label: "S.no" },
    { key: "caseName", label: "Case Name" },
    { key: "lastUpdated", label: "Last Updated" },
    { key: "documentStatus", label: "Document Status" },
    { key: "preview", label: "Preview" },
    { key: "editDocument", label: "Edit Document" },
  ];

  const documentData =
    data?.data?.documents?.map((item, index) => ({
      sno: `${index + 1}`.padStart(3, "0"),
      caseName: item.documentName,
      lastUpdated: new Date(item.date).toLocaleDateString("en-GB"),
      documentStatus: (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          In Progress
        </Badge>
      ),
      preview: (
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      ),
      editDocument: (
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      ),
    })) || [];

  //   {
  //     sno: "001",
  //     caseName: "Simple Will",
  //     lastUpdated: "1.2.2024",
  //     documentStatus: (
  //       <Badge variant="secondary" className="bg-orange-100 text-orange-800">
  //         In Progress
  //       </Badge>
  //     ),
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     editDocument: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  //   {
  //     sno: "002",
  //     caseName: "Simplified Estate P...",
  //     lastUpdated: "1.2.2024",
  //     documentStatus: (
  //       <Badge variant="secondary" className="bg-orange-100 text-orange-800">
  //         In Progress
  //       </Badge>
  //     ),
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     editDocument: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  //   {
  //     sno: "003",
  //     caseName: "Power of Attorney",
  //     lastUpdated: "1.2.2024",
  //     documentStatus: (
  //       <Badge variant="secondary" className="bg-green-100 text-green-800">
  //         Completed
  //       </Badge>
  //     ),
  //     preview: (
  //       <Button variant="ghost" size="sm">
  //         <Eye className="w-4 h-4" />
  //       </Button>
  //     ),
  //     editDocument: (
  //       <Button variant="ghost" size="sm">
  //         <Edit className="w-4 h-4" />
  //       </Button>
  //     ),
  //   },
  // ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-semibold">
            {data?.data?.attorney?.firstName || "N/A"}
          </h2>

          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            {data?.data?.isActive === true ? "Active" : "Inactive"}
          </Badge>
        </div>
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Engagement Letter</h3>
          <div className="flex gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              onClick={() => navigate("/create-engagement-letter")}
            >
              Create Engagement Letter
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {engagementData.length > 0 ? (
          <CustomTable columns={engagementColumns} data={engagementData} />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center ">
            <p className="text-gray-500 text-sm">
              No engagement letter created yet
            </p>
          </div>
        )}
      </div>

      {/* Document Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Document</h3>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/create-document")}
          >
            Create Document
          </Button>
        </div>
        {documentData.length > 0 ? (
          <CustomTable columns={documentColumns} data={documentData} />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center cursor-pointer">
            <p className="text-gray-500 text-sm">No document created yet</p>
          </div>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="cursor-pointer">1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>

          {Array.from({ length: 5 }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

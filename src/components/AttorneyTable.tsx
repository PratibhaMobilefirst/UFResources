// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Eye, ChevronUp, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Sample attorney data
const attorneyData = [
  {
    id: "001",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "N/A",
    disabled: false,
    privateAttorney: true,
  },
  {
    id: "002",
    name: "David",
    email: "david@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "N/A",
    disabled: false,
    privateAttorney: false,
  },
  {
    id: "003",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Senior Attorney",
    disabled: true,
    privateAttorney: true,
  },
  {
    id: "004",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Lead Attorney",
    disabled: false,
    privateAttorney: true,
  },
  {
    id: "005",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "N/A",
    disabled: true,
    privateAttorney: false,
  },
  {
    id: "006",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "N/A",
    disabled: false,
    privateAttorney: true,
  },
  {
    id: "007",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Lead Attorney",
    disabled: true,
    privateAttorney: false,
  },
  {
    id: "008",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Senior Attorney",
    disabled: false,
    privateAttorney: true,
  },
  {
    id: "009",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Lead Attorney",
    disabled: true,
    privateAttorney: true,
  },
  {
    id: "010",
    name: "John Clark",
    email: "johnclark@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Senior Attorney",
    disabled: false,
    privateAttorney: false,
  },
];

const ITEMS_PER_PAGE = 10;

const AttorneyTable = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAttorney, setCurrentAttorney] = useState<any>(null);

  // Filter attorneys based on active tab
  const filteredAttorneys =
    activeTab === "all"
      ? attorneyData
      : activeTab === "network"
      ? attorneyData.filter((attorney) => !attorney.privateAttorney)
      : attorneyData.filter((attorney) => attorney.privateAttorney);

  const totalPages = Math.ceil(filteredAttorneys.length / ITEMS_PER_PAGE);
  const currentAttorneys = filteredAttorneys.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleShowTooltip = (content: string) => {
    setTooltipContent(content);
    setShowTooltip(true);
  };

  const handleViewProfile = (attorney: any) => {
    navigate(`/attorney-detail/${attorney.id}`, { state: { attorney } });
  };

  const handleEditRole = (attorney: any) => {
    setCurrentAttorney(attorney);
    setEditDialogOpen(true);
  };

  return (
    <div>
      <Tabs
        defaultValue="all"
        className="mb-6"
        onValueChange={(value) => {
          setActiveTab(value);
          setCurrentPage(1);
        }}
      >
        <TabsList className="bg-white border border-gray-200 rounded-md p-1 mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
          >
            All Attorneys
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
          >
            Network Attorneys
          </TabsTrigger>
          <TabsTrigger
            value="private"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
          >
            Private Attorneys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AttorneyTableContent
            attorneys={currentAttorneys}
            onShowTooltip={handleShowTooltip}
            onViewProfile={handleViewProfile}
            onEditRole={handleEditRole}
          />
        </TabsContent>

        <TabsContent value="network">
          <AttorneyTableContent
            attorneys={currentAttorneys}
            onShowTooltip={handleShowTooltip}
            onViewProfile={handleViewProfile}
            onEditRole={handleEditRole}
          />
        </TabsContent>

        <TabsContent value="private">
          <AttorneyTableContent
            attorneys={currentAttorneys}
            onShowTooltip={handleShowTooltip}
            onViewProfile={handleViewProfile}
            onEditRole={handleEditRole}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center mt-4 w-full">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="border border-gray-300 bg-white text-gray-700"
        >
          Previous
        </Button>

        <span className="text-center text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="border border-gray-300 bg-white text-gray-700"
        >
          Next
        </Button>
      </div>

      {/* Tooltip Dialog */}
      <Dialog open={showTooltip} onOpenChange={setShowTooltip}>
        <DialogContent className="max-w-md bg-white p-0 overflow-hidden border border-gray-200 rounded-md">
          <div className="bg-white p-6">
            <p className="text-gray-800">{tooltipContent}</p>
          </div>
          <DialogFooter className="bg-white border-t border-gray-100 p-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowTooltip(false)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Skip
            </Button>
            <Button
              onClick={() => setShowTooltip(false)}
              className="bg-[#00426E] text-white hover:bg-blue-900"
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md  p-26  rounder-full bg-white overflow-hidden border border-gray-200 rounded-xl">
          <DialogHeader className="p-6   pb-0 border-b-0">
            <h3 className="text-lg font-semibold">
              Edit Network Attorney Role
            </h3>
          </DialogHeader>
          <div className="px-6 pt-4 pb-0 mr-16">
            {/* 3-column info row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Name</div>
                <div className="font-bold text-base">
                  {currentAttorney?.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">State</div>
                <div className="font-bold text-base">
                  {currentAttorney?.state}
                </div>
              </div>
              <div>
                <div className="text-xs  text-gray-500 mb-1">Email ID</div>
                <div className="font-bold text-base">
                  {currentAttorney?.email}
                </div>
              </div>
            </div>
            {/* Role dropdown */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <Select
                defaultValue={
                  currentAttorney?.role !== "N/A" ? currentAttorney?.role : ""
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="NA" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Lead Attorney">Lead Attorney</SelectItem>
                  <SelectItem value="Senior Attorney">
                    Senior Attorney
                  </SelectItem>
                  <SelectItem value="Junior Attorney">
                    Junior Attorney
                  </SelectItem>
                  <SelectItem value="N/A">NA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="bg-white border-t border-gray-100 p-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="bg-[#00426E] text-white hover:bg-blue-900"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AttorneyTableContent = ({
  attorneys,
  onShowTooltip,
  onViewProfile,
  onEditRole,
}: {
  attorneys: Array<any>;
  onShowTooltip: (content: string) => void;
  onViewProfile: (attorney: any) => void;
  onEditRole: (attorney: any) => void;
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#E7F5FF]">
            <TableHead
              className="text-[#00426E] cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                S.no
                {sortColumn === "id" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  ))}
              </div>
            </TableHead>
            <TableHead
              className="text-[#00426E] cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Attorney Name
                {sortColumn === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="text-[#00426E]">Email</TableHead>
            <TableHead className="text-[#00426E]">State</TableHead>
            <TableHead className="text-[#00426E]">Role</TableHead>
            <TableHead className="text-[#00426E]">Edit Role</TableHead>
            <TableHead className="text-[#00426E]">Status</TableHead>
            <TableHead className="text-[#00426E]">Private Attorney</TableHead>
            <TableHead className="text-[#00426E]">View Profile</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attorneys.map((attorney) => (
            <TableRow
              key={attorney.id}
              className="border-none hover:bg-gray-50"
            >
              <TableCell>{attorney.id}</TableCell>
              <TableCell>{attorney.name}</TableCell>
              <TableCell>{attorney.email}</TableCell>
              <TableCell>{attorney.state}</TableCell>
              <TableCell>{attorney.role}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={() => onEditRole(attorney)}
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Switch
                    checked={!attorney.disabled}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Switch
                    checked={attorney.privateAttorney}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={() => onViewProfile(attorney)}
                  >
                    <Eye className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttorneyTable;

import { useState } from "react";
import Layout from "@/components/Layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AttorneyTable from "@/components/AttorneyTable";
import { useNavigate } from "react-router-dom";

const AttorneyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <Layout>
      <TooltipProvider>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Attorney Management</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-2">
                  Search by Attorney Name
                </p>
                <div className="flex items-center  w-1/2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    className=" h-full bg-[#00426E] hover:bg-blue-800"
                    onClick={() => console.log("Searching for:", searchTerm)}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-7/12">
              <div>
                <p className="text-sm text-gray-500 mb-2">State</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">City</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="la">Los Angeles</SelectItem>
                    <SelectItem value="sf">San Francisco</SelectItem>
                    <SelectItem value="sd">San Diego</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Role</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="lead">Lead Attorney</SelectItem>
                    <SelectItem value="senior">Senior Attorney</SelectItem>
                    <SelectItem value="junior">Junior Attorney</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <AttorneyTable />
        </div>
      </TooltipProvider>
    </Layout>
  );
};

export default AttorneyManagement;

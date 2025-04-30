
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, File } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
  category: string;
  createdBy: string;
  createdDate: string;
}

interface VersionData {
  id: string;
  version: string;
  addedDate: string;
  updatedDate: string;
  status: boolean;
  uploadedBy: string;
}

const TemplateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("all");
  const [versionData, setVersionData] = useState<VersionData[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // For demo purposes, we'll use mock data
    setTemplate({
      id: id || "1",
      name: "Simple Will Document",
      category: "Will",
      createdBy: "John Doe",
      createdDate: "10.12.2023",
    });

    setStates(["New York", "California", "Texas", "Florida"]);
    
    // Mock version data
    setVersionData(Array(10).fill(null).map((_, i) => ({
      id: `00${i + 1}`,
      version: `Version ${i + 1}`,
      addedDate: "1.3.2024",
      updatedDate: "1.5.2024",
      status: i % 3 === 0,
      uploadedBy: "John Doe",
    })));
  }, [id]);

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/template-management")}
              className="mr-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">{template.name}</h1>
          </div>
          
          {/* Template metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium">{template.createdBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created Date</p>
              <p className="font-medium">{template.createdDate}</p>
            </div>
          </div>
          
          {/* Attorney role section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Attorney roles which can use</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center p-2 bg-[#E7F5FF] rounded-md">
                <Badge variant="outline" className="border-[#00426E] text-[#00426E]">
                  Solo
                </Badge>
                <span className="ml-2">Attorney Role</span>
              </div>
              <div className="flex items-center p-2 bg-[#E7F5FF] rounded-md">
                <Badge variant="outline" className="border-[#00426E] text-[#00426E]">
                  Owner
                </Badge>
                <span className="ml-2">Attorney Role</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button size="sm" className="bg-[#00426E] hover:bg-[#003058]">
                Edit
              </Button>
            </div>
          </div>
          
          {/* State selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">List of States</h2>
            <div className="flex gap-4 mb-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '')}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Versions table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">S.no</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead>Updated Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead className="w-20 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versionData.map((version) => (
                  <TableRow key={version.id}>
                    <TableCell>{version.id}</TableCell>
                    <TableCell>{version.version}</TableCell>
                    <TableCell>{version.addedDate}</TableCell>
                    <TableCell>{version.updatedDate}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className={`h-4 w-4 rounded-full ${version.status ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                    </TableCell>
                    <TableCell>{version.uploadedBy}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => setShowPreview(true)}
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <Button variant="outline" size="sm">Previous</Button>
              <div>Page 1 of 2</div>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
          
          {/* Document Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-3xl h-[80vh] p-0 overflow-hidden">
              <div className="p-4 border-b flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreview(false)}
                  className="mr-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-xl font-medium">Preview Document</DialogTitle>
              </div>
              <div className="p-6 overflow-y-auto h-full">
                <h3 className="text-xl font-semibold mb-4">{template.name}</h3>
                <div className="prose max-w-none">
                  <p>
                    Quis aute irure date to reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure date to reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Quis aute irure date to reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Quis autem(Will Document) vel eum iure reprehenderit qui in ea voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Quis autem(Will Document) vel eum iure reprehenderit qui in ea voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Quis autem vel eum iure reprehenderit qui
                    in ea voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetailPage;

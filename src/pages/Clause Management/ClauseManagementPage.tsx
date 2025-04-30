import Layout from "@/components/Layout";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PreviewClauseModal } from "./PreviewClauseModal";
import { CreateClauseForm } from "@/components/CreateClauseForm";


interface ClauseData {
  id: string;
  clauseName: string;
  templateCategory: string;
  state: string;
  status: boolean;
  content: string;
  createdDate: string;
  lastModifiedDate: string;
  modifiedBy: string;
}

export function ClauseManagementPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedClause, setSelectedClause] = useState<ClauseData | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const dummyData: ClauseData[] = [
    {
      id: "001",
      clauseName: "Request of Real Property",
      templateCategory: "Will",
      state: "California",
      status: true,
      content: "I, [John Doe], of 123 Example Lane, Springfield, hereby give, devise, and bequeath my real property located at 1234 Oak Avenue, Springfield to my daughter, [Jane Doe]. This bequest includes all improvements on the property, including the land house, and all attached structures and fixtures.\n\nIf my daughter predeceases me or is unable to inherit this property, I direct that this property be given to my son [James Doe] to be his absolutely and forever.",
      createdDate: "01.12.2024",
      lastModifiedDate: "05.01.2025",
      modifiedBy: "John Doe"
    },
    {
      id: "002",
      clauseName: "Request of Real Property",
      templateCategory: "Trust",
      state: "California",
      status: true,
      content: "I, [John Doe], of 123 Example Lane, Springfield, hereby give, devise, and bequeath my real property located at 1234 Oak Avenue, Springfield to my daughter, [Jane Doe]. This bequest includes all improvements on the property, including the land house, and all attached structures and fixtures.\n\nIf my daughter predeceases me or is unable to inherit this property, I direct that this property be given to my son [James Doe] to be his absolutely and forever.",
      createdDate: "01.12.2024",
      lastModifiedDate: "05.01.2025",
      modifiedBy: "John Doe"
    },
    {
      id: "003",
      clauseName: "Request of Real Property",
      templateCategory: "Will",
      state: "California",
      status: true,
      content: "I, [John Doe], of 123 Example Lane, Springfield, hereby give, devise, and bequeath my real property located at 1234 Oak Avenue, Springfield to my daughter, [Jane Doe]. This bequest includes all improvements on the property, including the land house, and all attached structures and fixtures.\n\nIf my daughter predeceases me or is unable to inherit this property, I direct that this property be given to my son [James Doe] to be his absolutely and forever.",
      createdDate: "01.12.2024",
      lastModifiedDate: "05.01.2025",
      modifiedBy: "John Doe"
    },
    {
      id: "004",
      clauseName: "Request of Real Property",
      templateCategory: "Trust",
      state: "California",
      status: true,
      content: "I, [John Doe], of 123 Example Lane, Springfield, hereby give, devise, and bequeath my real property located at 1234 Oak Avenue, Springfield to my daughter, [Jane Doe]. This bequest includes all improvements on the property, including the land house, and all attached structures and fixtures.\n\nIf my daughter predeceases me or is unable to inherit this property, I direct that this property be given to my son [James Doe] to be his absolutely and forever.",
      createdDate: "01.12.2024",
      lastModifiedDate: "05.01.2025",
      modifiedBy: "John Doe"
    },
  ];

  const handlePreview = (clause: ClauseData) => {
    setSelectedClause(clause);
    setIsPreviewOpen(true);
  };

  if (showCreateForm) {
    return (
      <Layout>
        <CreateClauseForm onBack={() => setShowCreateForm(false)} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Clause Management
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 border rounded-md flex-1 max-w-xs"
                  />
                  <Button className="bg-blue-600 text-white">
                    Search
                  </Button>
                </div>
                <Button 
                  className="bg-blue-600 text-white"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Create Clause
                </Button>
              </div>

              <div className="flex gap-6 mb-4">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'active'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('active')}
                >
                  Active Clause
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'inactive'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('inactive')}
                >
                  Inactive Clause
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All State</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Template Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="will">Will</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-center">S.no</TableHead>
                    <TableHead className="font-bold">Clause Name</TableHead>
                    <TableHead className="font-bold text-center">Template Category</TableHead>
                    <TableHead className="font-bold text-center">State</TableHead>
                    <TableHead className="font-bold text-center">Status</TableHead>
                    <TableHead className="font-bold text-center">Add</TableHead>
                    <TableHead className="font-bold text-center">Preview</TableHead>
                    <TableHead className="font-bold text-center">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="text-center">{item.id}</TableCell>
                      <TableCell>{item.clauseName}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-blue-600 inline-block bg-blue-100`}>
                          {item.templateCategory}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{item.state}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={item.status}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handlePreview(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  className="text-sm font-medium"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">Page 1 of 10</span>
                <Button 
                  variant="outline" 
                  className="text-sm font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedClause && (
        <PreviewClauseModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          clauseData={{
            createdDate: selectedClause.createdDate,
            lastModifiedDate: selectedClause.lastModifiedDate,
            modifiedBy: selectedClause.modifiedBy,
            clauseName: selectedClause.clauseName,
            content: selectedClause.content,
          }}
        />
      )}
    </Layout>
  );
}

export default ClauseManagementPage;
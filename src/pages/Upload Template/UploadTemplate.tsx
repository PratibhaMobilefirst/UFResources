import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddTemplateForm from "./AddTemplateForm";

const dataSource = [
  { key: "1", sno: "001", name: "Simple Will", state: "California", category: "Will", date: "1.2.2024" },
  { key: "2", sno: "002", name: "Simple Will", state: "California", category: "Will", date: "1.2.2024" },
  { key: "3", sno: "003", name: "Simple Will", state: "California", category: "Will", date: "1.2.2024" },
  { key: "4", sno: "004", name: "Simple Will", state: "California", category: "Will", date: "1.2.2024" },
  { key: "5", sno: "005", name: "Simple Will", state: "California", category: "Trust", date: "1.2.2024" },
];

const UploadTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState("draft");
  const [page] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const pageSize = 5;
  const total = dataSource.length;
  const pagedData = dataSource.slice((page - 1) * pageSize, page * pageSize);
  const navigate = useNavigate();

  const handleAddFile = () => {
    setShowAddForm(true);
  };

  if (showAddForm) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted">
          <Sidebar />
          <main className="flex-1 p-8">
            <AddTemplateForm onBack={() => setShowAddForm(false)} />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Upload Templates</h2>
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
                      onClick={handleAddFile}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add File
                    </Button>
                  </div>

                  <div className="flex gap-6 mb-4">
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === 'draft'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('draft')}
                    >
                      Draft
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === 'templates'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('templates')}
                    >
                      Templates
                    </button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-bold text-center">S.no</TableHead>
                        <TableHead className="font-bold">Template Name</TableHead>
                        <TableHead className="font-bold text-center">State</TableHead>
                        <TableHead className="font-bold text-center">Template Category</TableHead>
                        <TableHead className="font-bold text-center">Uploaded Date</TableHead>
                        <TableHead className="font-bold text-center">Action</TableHead>
                        <TableHead className="font-bold text-center">Edit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedData.map((row) => (
                        <TableRow key={row.key} className="hover:bg-gray-50">
                          <TableCell className="text-center">{row.sno}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell className="text-center">{row.state}</TableCell>
                          <TableCell className="text-center">
                            <span className={`px-2 py-1 rounded-full text-blue-600 inline-block bg-blue-100`}>
                              {row.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">{row.date}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
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
                              <Pencil className="h-4 w-4" />
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
                    <span className="text-sm text-gray-600">Page 1 of 1</span>
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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UploadTemplate;
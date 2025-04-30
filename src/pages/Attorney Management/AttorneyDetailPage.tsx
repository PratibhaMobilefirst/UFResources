import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Eye, Download, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AttorneyDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const attorney = location.state?.attorney || {
    id: "001",
    name: "John Clarke",
    email: "johnclarke@gmail.com",
    state: "California",
    city: "Los Angeles",
    role: "Private Attorney",
  };

  const [activeTab, setActiveTab] = useState("cases");

  const documents = [
    {
      id: "doc1",
      name: "Engagement Letter",
      type: "Legal Document",
      date: "11.10.2024",
    },
    {
      id: "doc2",
      name: "Simplified Estate Plan",
      type: "Estate Plan Document",
      date: "15.12.2024",
    },
    {
      id: "doc3",
      name: "Sample Will",
      type: "Sample Will Document",
      date: "30.12.2024",
    },
    {
      id: "doc4",
      name: "Medical Document",
      type: "Health Insurance Plan",
      date: "20.12.2024",
    },
    { id: "doc5", name: "Health", type: "Health Plan", date: "22.11.2024" },
  ];

  const cases = [
    { id: "case1", name: "Jacobine", date: "01.05.2024", documents: 3 },
    { id: "case2", name: "Smith Estate", date: "12.06.2024", documents: 2 },
    { id: "case3", name: "Johnson Trust", date: "15.07.2024", documents: 4 },
  ];
  const clauses = [
    {
      id: "clause1",
      name: "Clause 1",
      description: "Clause description 1",
      date: "01.01.2024",
    },
    {
      id: "clause2",
      name: "Clause 2",
      description: "Clause description 2",
      date: "05.05.2024",
    },
    {
      id: "clause3",
      name: "Clause 3",
      description: "Clause description 3",
      date: "20.12.2024",
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCaseClick = (caseItem: any) => {
    navigate(`/attorney-case-detail/${attorney.id}/${caseItem.id}`, {
      state: { attorney, caseItem },
    });
  };

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow p-6">
        <Button
          variant="ghost"
          className="mb-6 text-[#00426E] font-medium flex items-center gap-2"
          onClick={handleBackClick}
        >
          <ChevronLeft className="h-4 w-4" />
          Attorney Detail
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Attorney Name</p>
            <p className="font-medium">{attorney.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="font-medium">{attorney.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">State</p>
            <p className="font-medium">{attorney.state}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">City</p>
            <p className="font-medium">{attorney.city}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="font-medium">{attorney.role}</p>
          </div>
        </div>

        <Tabs
          defaultValue="cases"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-white border border-gray-200 rounded-md p-1 mb-6">
            <TabsTrigger
              value="cases"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
            >
              Cases Assigned
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
            >
              Templates Added
            </TabsTrigger>
            <TabsTrigger
              value="clauses"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md px-4 py-2"
            >
              Clauses Added
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-[#F0F0F0]"
                  onClick={() => handleCaseClick(caseItem)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-white p-4 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80%"
                          height="60%"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#00426E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-start">
                      <h3 className="font-medium text-gray-800 mb-1">
                        {caseItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">{caseItem.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((document) => (
                <Card
                  key={document.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-[#F0F0F0]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4  bg-[#D4EDFFB0]">
                      <div className=" p-4 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80%"
                          height="60%"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#00426E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-800 mb-1">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">{document.type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clauses" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">S.no</TableHead>
                  <TableHead className="text-left">Clause Name</TableHead>
                  <TableHead className="text-left">Description</TableHead>
                  <TableHead className="text-left">Date</TableHead>
                  <TableHead className="text-left">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clauses.map((clause, index) => (
                  <TableRow key={clause.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{clause.name}</TableCell>
                    <TableCell>{clause.description}</TableCell>
                    <TableCell>{clause.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AttorneyDetailPage;

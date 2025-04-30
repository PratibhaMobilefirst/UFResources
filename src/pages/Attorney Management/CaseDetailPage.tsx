
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, Eye, Download, ChevronDown, ChevronUp } from "lucide-react";

const CaseDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { attorneyId, caseId } = useParams();
  
  const attorney = location.state?.attorney || {
    id: "001", 
    name: "John Clarke", 
    email: "johnclarke@gmail.com", 
    state: "California", 
    city: "Los Angeles",
    role: "Network Attorney"
  };
  
  const caseItem = location.state?.caseItem || {
    id: caseId,
    name: "Jacobine"
  };

  const documents = [
    { 
      id: "001", 
      name: "SOT", 
      type: "Engagement Letter", 
      date: "02.11.2024",
      history: false 
    },
    { 
      id: "002", 
      name: "SOT", 
      type: "Engagement Letter", 
      date: "15.11.2024",
      history: false 
    },
    { 
      id: "003", 
      name: "SOT", 
      type: "Engagement Letter", 
      date: "16.11.2024",
      history: false 
    },
    { 
      id: "004", 
      name: "SOT", 
      type: "Engagement Letter", 
      date: "18.11.2024",
      history: false 
    },
    { 
      id: "005", 
      name: "Joint Will", 
      type: "Sample Will", 
      date: "20.12.2024",
      history: true 
    },
    { 
      id: "006", 
      name: "Medical Document", 
      type: "Health Document Plan", 
      date: "22.12.2024",
      history: true 
    },
    { 
      id: "007", 
      name: "Health", 
      type: "Health Plan", 
      date: "25.12.2024",
      history: true 
    },
  ];

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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
          Case Details
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
        
        <div className="mb-8">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Case Name</p>
            <p className="font-medium">{caseItem.name}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E7F5FF]">
                <TableHead 
                  className="text-[#00426E] cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    S.no
                    {sortColumn === 'id' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-[#00426E] cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Document Name
                    {sortColumn === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-[#00426E]">Document Type</TableHead>
                <TableHead className="text-[#00426E]">Date</TableHead>
                <TableHead className="text-[#00426E]">Preview</TableHead>
                <TableHead className="text-[#00426E]">History</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="border-none hover:bg-gray-50">
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full p-0"
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {doc.history ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full p-0"
                        >
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                      ) : (
                        <div className="h-8 w-8"></div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default CaseDetailPage;

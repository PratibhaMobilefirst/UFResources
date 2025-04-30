import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ContentTable from "@/components/ContentTable";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { useState } from "react";

const ContentManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("states"); // Track the active tab

  return (
    <Layout>
      <div className="space-y-4">
        
        <Card>
        <div className="flex justify-between items-center m-4">
          <h1 className="text-2xl font-semibold">Content Management System</h1>
        </div>
          <Tabs
            value={tabValue}
            onValueChange={(value) => setTabValue(value)}
            className="p-4"
          >
            <TabsList style={{ border: '1px solid #D8D8D8' }}>
              <TabsTrigger value="states">States</TabsTrigger>
              <TabsTrigger value="document">Document Category</TabsTrigger>
            </TabsList>
            <TabsContent value="states" className="space-y-4">
              {/* No AddCategoryDialog in the States tab */}
              <ContentTable
                data={statesData}
                columns={statesColumns}
                showEditIcon={false}
              />
            </TabsContent>
            <TabsContent value="document" className="space-y-4">
              {/* Show AddCategoryDialog only in the Document Category tab */}
              {tabValue === "document" && (
                <div className="flex justify-end">
                  <AddCategoryDialog
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                  />
                </div>
              )}
              <ContentTable
                data={documentData}
                columns={documentsColumns}
                showEditIcon={true}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

const statesData = [
  { id: "001", state: "Alabama", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "002", state: "Alaska", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "003", state: "Arizona", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "004", state: "Arkansas", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "005", state: "California", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "006", state: "Colorado", stateCode: "-", addedDate: "1.1.2025", status: true },
  { id: "007", state: "Connecticut", stateCode: "-", addedDate: "1.1.2025", status: false },
  { id: "008", state: "Delaware", stateCode: "-", addedDate: "1.1.2025", status: false },
  { id: "009", state: "Florida", stateCode: "-", addedDate: "1.1.2025", status: false },
  { id: "010", state: "Georgia", stateCode: "-", addedDate: "1.1.2025", status: false },
];

const documentData = [
  { id: 1, category: "Legal Documents", status: true },
  { id: 2, category: "Financial Reports", status: true },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
  { id: 3, category: "Contracts", status: false },
];

const statesColumns = [
  { header: "S.no", accessorKey: "id" },
  { header: "State", accessorKey: "state" },
  { header: "State Code", accessorKey: "stateCode" },
  { header: "Added Date", accessorKey: "addedDate" },
  { header: "Status", accessorKey: "status" },
];

const documentsColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Category", accessorKey: "category" },
  { header: "Status", accessorKey: "status" },
];

export default ContentManagement;

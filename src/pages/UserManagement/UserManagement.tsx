import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ContentTable from "@/components/ContentTable";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { log } from "console";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("Role Creation"); // Track the active tab
  const navigate = useNavigate();
console.log("tabValue", tabValue)
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">User Access Management</h1>
        </div>
        <Card>
          <Tabs
            value={tabValue}
            onValueChange={(value) => setTabValue(value)}
            className="p-4"
          >
            <TabsList>
              <TabsTrigger value="Role Creation">Role Creation</TabsTrigger>
              <TabsTrigger value="User Creation">User Creation</TabsTrigger>
            </TabsList>
            <TabsContent value="Role Creation" className="space-y-4">
              <div className="flex justify-end">
                <Button className="mb-4 bg-[#00426E] hover:bg-[#00426E]/90"
                 onClick={() => navigate('/role-creation')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </div>
              <ContentTable
                data={statesData}
                columns={statesColumns}
                showEditIcon={false}
              />
            </TabsContent>
            <TabsContent value="User Creation" className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  className="mb-4 bg-[#00426E] hover:bg-[#00426E]/90"
                  onClick={() => navigate('/user-management-form')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
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
  { id: 1, state: "Alabama", stateCode: "AL", status: true },
  { id: 2, state: "Alaska", stateCode: "AK", status: true },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
  { id: 3, state: "Arizona", stateCode: "AZ", status: false },
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
  { header: "ID", accessorKey: "id" },
  { header: "State", accessorKey: "state" },
  { header: "State Code", accessorKey: "stateCode" },
  { header: "Status", accessorKey: "status" },
];

const documentsColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Category", accessorKey: "category" },
  { header: "Status", accessorKey: "status" },
];

export default UserManagement;

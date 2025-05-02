import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ContentTable from "@/components/ContentTable";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useStates } from "@/hooks/useStates";
import { useToggleStateStatus, useToggleCategoryStatus } from "@/hooks/useToggleStatus";
import { Loader2 } from "lucide-react";

const ContentManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("states");
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [statesPage, setStatesPage] = useState(1);
  const limit = 10;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories(categoriesPage, limit);

  const {
    data: statesData,
    isLoading: isStatesLoading,
    isError: isStatesError,
  } = useStates(statesPage, limit);

  const toggleStateMutation = useToggleStateStatus();
  const toggleCategoryMutation = useToggleCategoryStatus();

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log("Edit category:", id);
  };

  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete category:", id);
  };

  const handleToggleStateStatus = async (sno: string) => {
    const state = transformedStatesData.find(item => item.sno === sno);
    if (state) {
      await toggleStateMutation.mutateAsync(state.id);
    }
  };

  const handleToggleCategoryStatus = async (sno: string) => {
    const category = transformedCategoryData.find(item => item.sno === sno);
    if (category) {
      await toggleCategoryMutation.mutateAsync(category.id);
    }
  };

  // Transform categories data
  const transformedCategoryData = categoriesData?.data.map((category, index) => ({
    id: category.id,
    sno: ((categoriesPage - 1) * limit + index + 1).toString(),
    category: category.templateName,
    addedDate: new Date(category.addedDate).toLocaleDateString(),
    status: category.status,
  })) || [];

  // Transform states data
  const transformedStatesData = statesData?.data.map((state, index) => ({
    id: state.id,
    sno: ((statesPage - 1) * limit + index + 1).toString(),
    state: state.stateName,
    stateCode: state.stateCode,
    addedDate: new Date(state.addedDate).toLocaleDateString(),
    status: state.status,
  })) || [];

  return (
    <Layout>
      <div className="space-y-4">
        <Card>
          <div className="flex justify-between items-center m-6">
            <h1 className="text-xl font-semibold">Content Management System</h1>
          </div>
          <Tabs
            value={tabValue}
            onValueChange={(value) => setTabValue(value)}
            className="py-2 px-6"
          >
            <TabsList style={{ border: '1px solid #D8D8D8' }}>
              <TabsTrigger value="states">States</TabsTrigger>
              <TabsTrigger value="document">Template Category</TabsTrigger>
            </TabsList>
            <TabsContent value="states" className="space-y-4 mt-[90px]">
              {isStatesLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : isStatesError ? (
                <div className="text-center text-red-500 py-8">
                  Error loading states. Please try again.
                </div>
              ) : (
                <ContentTable
                  data={transformedStatesData}
                  columns={statesColumns}
                  showActions={false}
                  onToggleStatus={handleToggleStateStatus}
                />
              )}
            </TabsContent>
            <TabsContent value="document" className="space-y-4">
              {tabValue === "document" && (
                <div className="flex justify-end">
                  <AddCategoryDialog
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                  />
                </div>
              )}
              {isCategoriesLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : isCategoriesError ? (
                <div className="text-center text-red-500 py-8">
                  Error loading categories. Please try again.
                </div>
              ) : (
                <ContentTable
                  data={transformedCategoryData}
                  columns={documentsColumns}
                  showActions={true}
                  onEdit={(sno) => {
                    const item = transformedCategoryData.find(item => item.sno === sno);
                    if (item) handleEdit(item.id);
                  }}
                  onDelete={(sno) => {
                    const item = transformedCategoryData.find(item => item.sno === sno);
                    if (item) handleDelete(item.id);
                  }}
                  onToggleStatus={handleToggleCategoryStatus}
                />
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

const statesColumns = [
  { header: "S.no", accessorKey: "sno" },
  { header: "State", accessorKey: "state" },
  { header: "State Code", accessorKey: "stateCode" },
  { header: "Added Date", accessorKey: "addedDate" },
  { header: "Status", accessorKey: "status" },
];

const documentsColumns = [
  { header: "S.no", accessorKey: "sno" },
  { header: "Template Category", accessorKey: "category" },
  { header: "Added Date", accessorKey: "addedDate" },
  { header: "Status", accessorKey: "status" },
];

export default ContentManagement;

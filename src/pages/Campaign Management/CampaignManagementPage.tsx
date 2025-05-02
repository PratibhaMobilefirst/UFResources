// src/pages/Campaign Management/CampaignManagementPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const CampaignManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-white rounded-lg p-6 m-6 min-h-[calc(100vh-7rem)] shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Campaign Management</h1>
        
        <div className="flex justify-between mb-6">
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px]"
            />
            <Button variant="default" className="bg-[#00426E] text-white hover:bg-[#003359]">
              Search
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-gray-100 p-1">
              <TabsTrigger 
                value="active"
                className="flex-1 data-[state=active]:bg-[#00426E] data-[state=active]:text-white px-4 py-2 rounded"
              >
                Active Campaigns
              </TabsTrigger>
              <TabsTrigger 
                value="inactive"
                className="flex-1 data-[state=active]:bg-[#00426E] data-[state=active]:text-white px-4 py-2 rounded"
              >
                Inactive Campaigns
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            variant="default" 
            className="bg-[#00426E] text-white hover:bg-[#003359] ml-4"
            onClick={() => navigate('/create-campaign')}
          >
            Create Campaign
          </Button>
        </div>

        <div className="flex items-center justify-center h-[400px] text-gray-500">
          No campaigns Created Yet
        </div>
      </div>
    </Layout>
  );
};

export default CampaignManagement;
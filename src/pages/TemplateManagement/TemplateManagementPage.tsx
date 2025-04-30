
import Layout from "@/components/Layout";
import TemplateList from "@/components/TemplateList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const TemplateManagementPage = () => {
  const [currentTab, setCurrentTab] = useState("network-attorney");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Template Management</h1>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs
              defaultValue="network-attorney"
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full md:max-w-md"
            >
              <TabsList className="w-full bg-gray-100 p-0 h-auto">
                <TabsTrigger
                  value="network-attorney"
                  className="flex-1 py-2 data-[state=active]:bg-[#00426E] data-[state=active]:text-white"
                >
                  Network Attorney
                </TabsTrigger>
                <TabsTrigger
                  value="campaign"
                  className="flex-1 py-2 data-[state=active]:bg-[#00426E] data-[state=active]:text-white"
                >
                  Campaign
                </TabsTrigger>
                <TabsTrigger
                  value="attorney-specific"
                  className="flex-1 py-2 data-[state=active]:bg-[#00426E] data-[state=active]:text-white"
                >
                  Attorney Specific
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative w-full md:w-60">
                <Input
                  type="text"
                  placeholder="Search by document name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <Button className="bg-[#00426E] hover:bg-[#003058]">Search</Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">State</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">Template Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="will">Will</SelectItem>
                  <SelectItem value="trust">Trust</SelectItem>
                  <SelectItem value="estate">Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/2 flex items-end justify-end">
              <Button 
                className="bg-[#00426E] hover:bg-[#003058]"
                onClick={() => window.location.href = "/template-management/create"}
              >
                Create Template Card
              </Button>
            </div>
          </div>

          <Tabs value={currentTab}>
            <TabsContent value="network-attorney" className="mt-0">
              <TemplateList />
            </TabsContent>
            <TabsContent value="campaign" className="mt-0">
              <TemplateList />
            </TabsContent>
            <TabsContent value="attorney-specific" className="mt-0">
              <TemplateList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateManagementPage;

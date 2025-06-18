import Layout from "@/components/Layout";
import TemplateList from "@/components/TemplateList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, formatISO } from "date-fns";
import { usePrivateCases } from "@/hooks/usePrivateCases";

const LegacyAssurancePlanPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("network-attorney");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedStateId, setSelectedStateId] = useState("all");
  const formattedStartDate = startDate
    ? format(startDate, "yyyy-MM-dd")
    : undefined;
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : undefined;

  const perPage = 10;

  const debouncedSetSearch = debounce((val: string) => {
    setDebouncedSearch(val);
  }, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  const handleSearch = () => {
    setDebouncedSearch(searchQuery);
    setCurrentPage(1);
  };

  const {
    data: casesData,
    isLoading,
    isError,
  } = usePrivateCases({
    attorneyId: "",
    isActive:
      currentTab === "network-attorney"
        ? true
        : currentTab === "campaign"
        ? false
        : undefined,
    search: debouncedSearch,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    page: currentPage,
    limit: perPage,
  });

  const templates = (casesData?.data || []).map((item) => ({
    id: item.id,
    attorneyId: item.attorneyId,
    templateCardName: item.caseName,
    categories: item.state?.stateName
      ? [{ category: { templateName: item.state.stateName } }]
      : [],
  }));

  const totalPages = casesData?.meta?.totalPages || 1;

  return (
    <Layout>
      <div className="container mx-auto p-1 max-w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Case</h1>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs
              defaultValue="network-attorney"
              value={currentTab}
              onValueChange={(val) => setCurrentTab(val)}
              className="w-full md:max-w-md"
            >
              <TabsList className="w-full bg-gray-100 p-0 h-auto">
                <TabsTrigger
                  value="network-attorney"
                  className={`flex-1 py-2 ${
                    currentTab === "network-attorney" ? "active" : "finished"
                  }`}
                >
                  Active Classes
                </TabsTrigger>
                <TabsTrigger
                  value="campaign"
                  className={`flex-1 py-2 ${
                    currentTab === "campaign" ? "active" : "finished"
                  }`}
                >
                  Finished Classes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            <div className="flex gap-2 mt-4">
              <div className="relative w-full md:w-60">
                <Input
                  type="text"
                  placeholder="Search by document name"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if (val === "") {
                      setDebouncedSearch("");
                      setCurrentPage(1);
                    }
                  }}
                  className="pl-3 pr-10"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <Button
                className="bg-[#00426E] hover:bg-[#003058]"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>

            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {startDate
                      ? format(startDate, "yyyy-MM-dd")
                      : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {endDate
                      ? format(endDate, "yyyy-MM-dd")
                      : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Tabs value={currentTab}>
            <TabsContent value="network-attorney" className="mt-0">
              <TemplateList
                templates={templates}
                isLoading={isLoading}
                isError={isError}
              />
            </TabsContent>
            <TabsContent value="campaign" className="mt-0">
              <TemplateList
                templates={templates}
                isLoading={isLoading}
                isError={isError}
              />
            </TabsContent>
          </Tabs>

          {templates.length > 0 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LegacyAssurancePlanPage;

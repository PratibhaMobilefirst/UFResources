import Layout from "@/components/Layout";
import TemplateList from "@/components/TemplateList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Search } from "lucide-react";
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
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePersonalPrivateCases } from "@/hooks/UsePersonal";
import { useAttorneyStates } from "@/hooks/useStates";
import CalendarImg from "../../asset/img/lets-icons_date-fill.svg";

const PersonalPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedStateId, setSelectedStateId] = useState("all");

  const perPage = 10;

  // Debounced search setter
  const debouncedSetSearch = debounce((val: string) => {
    setDebouncedSearch(val);
  }, 500);

  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  // API call
  const { data, isLoading, isError } = usePersonalPrivateCases({
    isActive: currentTab === "active",
    search: debouncedSearch || undefined,
    stateId: selectedStateId !== "all" ? selectedStateId : undefined,
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined,
    page: currentPage,
    limit: perPage,
  });

  console.log(data, "data");

  const { data: statesData, isLoading: statesLoading } = useAttorneyStates();

  // Templates mapped from API
  const templates = Array.isArray(data?.data?.data)
    ? data?.data?.data?.map((item) => ({
        id: item.id,
        attorneyId: item.attorneyId,
        templateCardName: item.caseName,
        categories: item.state?.stateName
          ? [{ category: { templateName: item.state.stateName } }]
          : [],
      }))
    : [];

  // Safe totalPages
  const totalPages =
    data?.data?.meta?.totalPages && data.data.meta.totalPages > 0
      ? data.data.meta.totalPages
      : 1;

  console.log(totalPages, "totalPages");

  const handleSearch = () => {
    debouncedSetSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleNavigate = (templateData: any, id: string) => {
    console.log(templateData, "templateData");

    navigate(`/personal-detail/${id}`, {
      state: { template: templateData, id: id },
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-1 max-w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Cases</h1>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full md:max-w-md"
            >
              <TabsList className="w-full bg-gray-100 p-1 rounded-md flex border border-gray-300">
                <TabsTrigger
                  value="active"
                  className="flex-1 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#00426E] data-[state=active]:font-bold rounded-md"
                >
                  Active Cases
                </TabsTrigger>
                <TabsTrigger
                  value="inactive"
                  className="flex-1 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#00426E] data-[state=active]:font-bold rounded-md"
                >
                  Finished Cases
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              className="bg-[#00426E] hover:bg-[#003058]"
              onClick={() => navigate("/create-case")}
            >
              Create New Case
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            {/* Search */}
            <div className="flex gap-2 mt-4">
              <div className="relative w-full md:w-60">
                <Input
                  type="text"
                  placeholder="Search by case name"
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

            {/* Date Filters */}
            {/* <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {startDate
                      ? format(startDate, "yyyy-MM-dd")
                      : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div> */}
            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">
                Start Date
              </label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal relative pr-10"
                    >
                      {startDate
                        ? format(startDate, "yyyy-MM-dd")
                        : "Pick a start date"}
                      <img
                        src={CalendarImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
                      />
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

                {/* Clear Button */}
                {startDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStartDate(undefined)}
                    className="px-2"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {endDate ? format(endDate, "yyyy-MM-dd") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div> */}
            <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal relative pr-10"
                    >
                      {endDate
                        ? format(endDate, "yyyy-MM-dd")
                        : "Pick an end date"}
                      <img
                        src={CalendarImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
                      />
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

                {/* Clear Button */}
                {endDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEndDate(undefined)}
                    className="px-2"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* State Filter */}
            <div className="flex flex-col w-48">
              <label className="text-sm font-medium text-[#222] mb-1">
                State
              </label>
              <Select
                onValueChange={(value) => setSelectedStateId(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-full border-[#D8D8D8]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {!statesLoading &&
                    statesData?.data?.map((state) => (
                      <SelectItem key={state.stateId} value={state.stateId}>
                        {state.stateName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            </div>
          )}

          {/* List */}
          {!isLoading && templates.length > 0 ? (
            <TemplateList
              templates={templates}
              isLoading={isLoading}
              isError={isError}
              handleNavigate={handleNavigate}
            />
          ) : (
            !isLoading &&
            templates.length > 0 && (
              <div className="text-center py-6 text-gray-500">
                No cases found.
              </div>
            )
          )}

          {/* Pagination */}
          {templates.length > 0 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
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
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
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

export default PersonalPage;

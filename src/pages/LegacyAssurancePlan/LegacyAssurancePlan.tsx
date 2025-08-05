import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Layout from "@/components/Layout";
import TemplateList from "@/components/TemplateList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search } from "lucide-react";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarImg from "../../asset/img/lets-icons_date-fill.svg";
import { usePrivateCases } from "@/hooks/usePrivateCases";
import { useLogin } from "@/hooks/useLogin";
import { useAttorneyStates } from "@/hooks/useStates";
const LegacyAssurancePlanPage = () => {
  const [currentTab, setCurrentTab] = useState("network-attorney");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("all");

  const { data: statesData, isLoading: statesLoading } = useAttorneyStates();
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

  const login = useLogin();
  const email = "superAdmin@gmail.com"; // or get from env/config

  useEffect(() => {
    login.mutate(email);
  }, []);

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

  const handleNavigate = (id: string, templateData: any) => {
    //     console.log(id, templateData, "templateData");
    navigate(`/legacy-assurance-plan-detail/${templateData}`, {
      state: { template: templateData, id: id },
    });
  };
  return (
    <Layout>
      <div className="container mx-auto p-1 max-w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Case</h1>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs
              defaultValue="network-attorney"
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full md:max-w-md"
            >
              <TabsList className="w-full bg-gray-100 p-1 rounded-md flex border border-gray-300">
                <TabsTrigger
                  value="network-attorney"
                  className="flex-1 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#00426E] data-[state=active]:font-bold rounded-md"
                >
                  Active Cases
                </TabsTrigger>
                <TabsTrigger
                  value="campaign"
                  className="flex-1 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#00426E] data-[state=active]:font-bold rounded-md"
                >
                  Finished Cases
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-end gap-4 mb-6">
            {/* Search Box */}
            {/* <div className="flex gap-2 w-full md:w-1/4">
    <div className="relative w-full">
      <Input type="text" placeholder="Search by document name" />
      <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
    </div>
    <Button className="bg-[#00426E] hover:bg-[#003058]">Search</Button>
  </div> */}
            {/* Row 1: Search Input + Button */}
            <div className="flex gap-4 ">
              <div className="flex w-[45%] gap-0.5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if (val === "") {
                      setDebouncedSearch("");
                      setCurrentPage(1);
                    }
                  }}
                  placeholder="Search by Attorney Name"
                  className="px-3 py-2 border border-[#D8D8D8] rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-[#00426E]"
                />
                <Button
                  variant="default"
                  className="bg-[#00426E] hover:bg-[#003355] text-white rounded-r-md rounded-l-none"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Start Date Picker */}
            {/* <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">
                Start Date
              </label>
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

            {/* End Date Picker */}
            {/* <div className="w-full md:w-1/4">
              <label className="text-sm font-medium mb-1 block">End Date</label>
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

            {/* State Dropdown */}
            <div
              className="w-full md:w-1/4 flex flex-col"
              data-tour="state-filter"
            >
              <label className="text-sm font-medium text-[#222] mb-1">
                State
              </label>
              <Select>
                <SelectTrigger className="w-full border-[#D8D8D8]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent
                  style={{ maxHeight: "30vh", overflowY: "scroll" }}
                >
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

          <Tabs value={currentTab}>
            <TabsContent value="network-attorney">
              <TemplateList
                templates={templates}
                isLoading={false}
                isError={false}
                handleNavigate={handleNavigate}
              />
            </TabsContent>
            <TabsContent value="campaign">
              <TemplateList
                templates={templates}
                isLoading={false}
                isError={false}
                handleNavigate={handleNavigate}
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

          {/* <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default LegacyAssurancePlanPage;

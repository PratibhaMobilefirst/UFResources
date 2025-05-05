import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import CreateNewCasePersonal from "./CreateNewCasePersonal";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const mockCases = [
  {
    name: "Anderson Trust Creation",
    date: "1.12.24",
    new: true,
  },
  {
    name: "Miller Estate Administration",
    date: "1.12.24",
    new: true,
  },
  {
    name: "Brown Living Trust Review",
    date: "1.12.24",
    new: true,
  },
  {
    name: "Johnson Family Will Drafting",
    date: "1.12.24",
    new: true,
  },
  {
    name: "Parker Revocable Trust Setup",
    date: "1.12.24",
    new: false,
  },
  {
    name: "Evans Guardianship Designation Draft",
    date: "1.12.24",
    new: false,
  },
  {
    name: "Carter Beneficiary Designation Review",
    date: "1.12.24",
    new: false,
  },
  {
    name: "Murphy Estate Tax Planning Attorney",
    date: "1.12.24",
    new: false,
  },
];

const PersonlaPage = () => {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("");
  const [showCreateCase, setShowCreateCase] = useState(false);
  const filteredCases = mockCases.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div>
        <Sidebar />
      </div>
      <div className="p-8 w-full min-h-screen bg-[#F4F7FA]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#222B45] roboto-font">Document Assembly Service</h1>
          <div className="flex items-center gap-4">
            <button
              className="bg-[#00426E] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#005999]"
            //   onClick={() => setShowCreateCase(true)}
            onClick={() => navigate('/personal/create-new-case')}
            >
              <Plus /> Create New Case
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by Case name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#E7F5FF]"
              />
              <button className="bg-[#E7F5FF] p-2 rounded text-[#00426E]">
                <Search />
              </button>
            </div>
            <div className="flex gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E7F5FF]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E7F5FF]"
                >
                  <option value="">All States</option>
                  <option value="CA">CA</option>
                  <option value="NY">NY</option>
                  <option value="TX">TX</option>
                  {/* Add more states as needed */}
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="px-4 py-2 rounded bg-[#E7F5FF] text-[#00426E] font-medium">Active Cases</button>
            <button className="px-4 py-2 rounded bg-gray-100 text-gray-500 font-medium">Finished Cases</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCases.map((c, idx) => (
              <div key={idx} className="bg-[#F4F7FA] rounded-lg p-4 shadow hover:shadow-md transition relative">
                {c.new && (
                  <span className="absolute top-3 left-3 bg-[#E7F5FF] text-[#00426E] text-xs px-2 py-1 rounded font-semibold">New</span>
                )}
                <div className="flex flex-col items-center justify-center h-24 mb-4">
                  <div className="bg-white rounded-full p-4 shadow">
                    <svg width="32" height="32" fill="#00426E" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 7.414l-4.828-4.828A2 2 0 0 0 12.172 2H6zm6 1.414L18.586 10H14a2 2 0 0 1-2-2V3.414z"/></svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[#222B45] mb-1">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showCreateCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative w-full max-w-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
                onClick={() => setShowCreateCase(false)}
              >
                &times;
              </button>
              <CreateNewCasePersonal onClose={() => setShowCreateCase(false)} />
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default PersonlaPage;

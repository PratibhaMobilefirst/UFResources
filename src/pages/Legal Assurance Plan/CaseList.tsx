import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cases = [
  { id: "001", name: "Anderson Trust Creation", date: "1.2.2024", state: "California", status: "Active", isNew: true },
  { id: "002", name: "Miller Estate Administration", date: "1.2.2024", state: "California", status: "Active", isNew: true },
  { id: "003", name: "Brown Living Trust Review", date: "1.2.2024", state: "California", status: "Active", isNew: true },
  { id: "004", name: "Johnson Family Will Drafting", date: "1.2.2024", state: "California", status: "Active", isNew: true },
  { id: "005", name: "Parker Revocable Trust Setup", date: "1.2.2024", state: "California", status: "Active", isNew: false },
  { id: "006", name: "Evans Guardianship Designation Draft", date: "1.2.2024", state: "California", status: "Active", isNew: false },
  { id: "007", name: "Carter Beneficiary Designation Review", date: "1.2.2024", state: "California", status: "Active", isNew: false },
  { id: "008", name: "Murphy Estate Tax Planning Advisory", date: "1.2.2024", state: "California", status: "Active", isNew: false },
  { id: "009", name: "Anderson Trust Creation", date: "1.2.2024", finishedDate: "3.2.2024", state: "California", status: "Finished", isNew: false },
  { id: "010", name: "Miller Estate Administration", date: "1.2.2024", finishedDate: "3.2.2024", state: "California", status: "Finished", isNew: false },
];

const states = ["All States", "California", "Texas", "New York"];

const CaseList = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("All States");
  const navigate = useNavigate();

  const filteredCases = cases.filter((c) => {
    const isActive = activeTab === "active" ? c.status === "Active" : c.status === "Finished";
    const matchesSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase());
    const matchesDate = date === "" || c.date === date;
    const matchesState = state === "All States" || c.state === state;
    return isActive && matchesSearch && matchesDate && matchesState;
  });

  const handleCardClick = (c) => {
    navigate(`/case/${c.id}`, { state: c });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Cases</h2>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-medium border-b-2 transition-colors ${activeTab === "active" ? "border-[#00426E] text-[#00426E] bg-[#F5FAFF]" : "border-transparent text-gray-500 bg-transparent"}`}
          onClick={() => setActiveTab("active")}
        >
          Active Cases
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-medium border-b-2 transition-colors ${activeTab === "finished" ? "border-[#00426E] text-[#00426E] bg-[#F5FAFF]" : "border-transparent text-gray-500 bg-transparent"}`}
          onClick={() => setActiveTab("finished")}
        >
          Finished Cases
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by Case name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={state}
          onChange={e => setState(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="bg-[#00426E] text-white px-4 py-2 rounded ml-2">Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="bg-[#E7F5FF] rounded-lg p-4 cursor-pointer hover:shadow-lg relative"
            onClick={() => handleCardClick(c)}
          >
            {c.isNew && (
              <span className="absolute top-2 left-2 bg-[#00426E] text-white text-xs px-2 py-1 rounded">New</span>
            )}
            <div className="flex flex-col items-center justify-center h-24">
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="48" rx="8" fill="#B3D8F7"/>
                <rect x="8" y="12" width="24" height="4" rx="2" fill="#fff"/>
                <rect x="8" y="20" width="24" height="4" rx="2" fill="#fff"/>
                <rect x="8" y="28" width="16" height="4" rx="2" fill="#fff"/>
              </svg>
            </div>
            <div className="mt-4 text-center font-medium text-[#00426E]">{c.name}</div>
            <div className="text-xs text-gray-500 text-center mt-1">{c.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseList; 
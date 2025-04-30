
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock data for templates
const templateData = [
  {
    id: "1",
    name: "Engagement Letter",
    category: "Will",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "2",
    name: "Simplified Estate Plan",
    category: "Will",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "3",
    name: "Simple Revocable Trust",
    category: "Trust",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "4",
    name: "Service Agreement",
    category: "Agreement",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "5",
    name: "Simple Lease Agreement",
    category: "Real Estate",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "6",
    name: "Power of Attorney",
    category: "Will",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "7",
    name: "Deed of Trust",
    category: "Trust",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
  {
    id: "8",
    name: "Property Transfer Deed",
    category: "Will",
    icon: "file",
    backgroundColor: "#E7F5FF",
  },
];

const TemplateList = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (id: string) => {
    navigate(`/template-management/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {templateData.map((template) => (
        <div
          key={template.id}
          className="cursor-pointer"
          onClick={() => handleTemplateClick(template.id)}
        >
          <div
            className="p-6 rounded-md flex flex-col items-center bg-[#E7F5FF] hover:bg-[#D0EBFF] transition-colors"
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00426E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            {template.category && (
              <Badge variant="outline" className="mb-2 border-[#00426E] text-[#00426E]">
                {template.category}
              </Badge>
            )}
            <h3 className="text-center font-medium">{template.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;

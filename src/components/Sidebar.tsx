import { Sidebar as SidebarComponent, SidebarContent } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Legacy Assurance Plan", href: "/case", icon: null },
  { label: "Personal", href: "/personal", icon: null },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <SidebarComponent>
      <SidebarContent className="bg-white h-full flex flex-col">
        <div className="px-6 py-4">
          <img
            src="/lovable-uploads/Logo.svg"
            alt="Legacy Assurance Plan Logo"
            className="h-10"
          />
        </div>
        <nav className="flex flex-col gap-2 px-4 mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`p-3 rounded-md text-base font-medium roboto-font transition-colors duration-150 ${
                location.pathname === item.href
                  ? "bg-[#E7F5FF] text-[#00426E]"
                  : "text-[#222B45] hover:bg-[#E7F5FF] hover:text-[#00426E]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;

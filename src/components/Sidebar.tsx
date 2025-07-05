import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link, useLocation } from "react-router-dom";
import logo from "../asset/img/Logomain.svg";
import mb1 from "../asset/img/mb1.svg";       // Active icon for Legacy Assurance Plan
import mb2 from "../asset/img/mb2.svg";       // Inactive icon
import person1 from "../asset/img/ion_person1.svg"; // Active icon for Personal
import person2 from "../asset/img/ion_person.svg";  // Inactive icon

const menuItems = [
  {
    label: "Legacy Assurance Plan",
    href: "/legacy-assurance-plan",
    icons: {
      active: mb1,
      inactive: mb2,
    },
    matchRoutes: [
      "/legacy-assurance-plan",
      "/create-engagement-letter",
      "/create-document",
      "/legacy-assurance-plan-detail",
    ],
  },
  {
    label: "Personal",
    href: "/personal",
    icons: {
      active: person1,
      inactive: person2,
    },
    matchRoutes: [
      "/personal",
      "/create-case",
      "/personal-detail",
      "/engagement-letter",
      "/personal-create-document",
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (item: typeof menuItems[0]) => {
    return item.matchRoutes.some((path) => location.pathname.startsWith(path));
  };

  return (
    <SidebarComponent>
      <SidebarContent className="bg-white">
        {/* Logo */}
        <div className="hidden md:flex justify-center items-center h-16 border-b">
          <img src={logo} alt="Logo" className="h-15 " />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2"> {/* spacing between tabs */}
              {menuItems.map((item) => {
                const active = isActive(item);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-2 p-4 rounded-md text-base font-medium roboto-font transition-colors ${
                          active
                            ? "bg-[#E7F5FF] text-[#00426E]"
                            : "text-[#222B45] hover:bg-[#E7F5FF] hover:text-[#00426E]"
                        }`}
                      >
                        <img
                          src={active ? item.icons.active : item.icons.inactive}
                          alt={`${item.label} icon`}
                          className="w-5 h-5"
                        />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;

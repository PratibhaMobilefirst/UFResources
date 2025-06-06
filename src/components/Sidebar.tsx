import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Upload,
  CheckSquare,
  FileSpreadsheet,
  BarChart2,
  Database,
  UserCog,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "legacy Assurance Plan",
    href: "/legacy-assurance-plan",
  },
  // { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  // { icon: Users, label: "Attorney Management", href: "/attorney-management" },
  // {
  //   icon: MessageSquare,
  //   label: "Campaign Management",
  //   href: "/campaign-management",
  // },
  // { icon: FileText, label: "Clause Management", href: "/clause-management" },
  // { icon: Upload, label: "Upload Templates", href: "/upload-templates" },
  // { icon: CheckSquare, label: "Approve Templates", href: "/approve-template" },
  // {
  //   icon: FileSpreadsheet,
  //   label: "Template Management",
  //   href: "/template-management",
  // },
  // { icon: BarChart2, label: "Report", href: "/report" },
  // {
  //   icon: Database,
  //   label: "Content Management System",
  //   href: "/content-management",
  // },
  // { icon: UserCog, label: "User Access Management", href: "/user-management" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <SidebarComponent>
      <SidebarContent className="bg-white ">
        <div className="px-6 py-4">
          {/* Add Logo here */}
          <img
            src="/lovable-uploads/Logo.svg" // Adjust with the correct path
            alt="Legacy Assurance Plan Logo"
            className="h-10"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 p-2 hover:bg-[#E7F5FF] rounded-md hover:text-[#00426E] text-base font-medium roboto-font ${
                        location.pathname === item.href
                          ? "bg-[#E7F5FF] text-[#00426E]"
                          : "text-[#222B45]"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;

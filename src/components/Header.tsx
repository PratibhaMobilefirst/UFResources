import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast";
import { useSidebar } from "@/hooks/useSidebar";
import Bell from "../asset/img/Bell.svg";
import User_icon from "../asset/img/User_icon.svg";
import Logo from "../asset/img/Logomain.svg";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { toast } = useToast();
  const { state: sidebarOpen, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("auth-store");
    sessionStorage.removeItem("auth-store");

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      duration: 3000, // Duration in ms
      // variant: "success", // Success variant
    });

    console.log("Logged out successfully!");
    // Add any additional logic for redirection, e.g., using React Router
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-100">
      <div className="flex-1 flex items-center gap-2">
        <h1 className="text-[#00426E] text-[26px] font-[500]">
          Document Assembly Service
        </h1>
        {/* Sidebar toggle button */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleSidebar}
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${
              !sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </Button> */}
        {/* Center logo when sidebar is closed on desktop */}
        {/* <div
          className={`md:flex items-center transition-all duration-300 ${
            !sidebarOpen ? "md:ml-[calc(50vw-130px)]" : "md:ml-0"
          }`}
        >
          <img
            src={Logo}
            alt="Legacy Assurance Plan Logo"
            className="h-8 md:hidden"
          />
        </div> */}
      </div>
      {/* <div className="flex items-center gap-4">
        <img src={Bell} alt="Bell" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src={User_icon} alt="user" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </header>
  );
};

export default Header;

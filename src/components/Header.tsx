import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        {/* <img
          src="/lovable-uploads/Logo.svg"
          alt="Legacy Logo"
          className="h-8"
        /> */}
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-500" />
        <User className="w-5 h-5 text-gray-500" />
      </div>
    </header>
  );
};

export default Header;

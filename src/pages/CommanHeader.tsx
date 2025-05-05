// src/components/CommonHeader.tsx
import { Bell, User } from "lucide-react";
import React from "react";

const CommonHeader = () => (
  <header className="w-full bg-white border-b flex items-center justify-between px-8 py-4">
    <div className="text-xl font-semibold text-[#00426E]">
      Document Assembly Service
    </div>
    <div className="flex items-center gap-4">
      {/* Example right-side buttons/icons */}
      <button className="p-2 rounded-full hover:bg-gray-100">
      <Bell className="w-5 h-5 text-gray-500" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
  
      <User className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  </header>
);

export default CommonHeader;
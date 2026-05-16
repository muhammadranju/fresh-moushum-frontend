"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminNavbar from "@/components/admin/Navbar";
import AdminGuard from "@/components/AdminGuard";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 overflow-hidden relative">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 h-screen relative">
          <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className={cn(
            "flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden",
            "transition-all duration-300"
          )}>
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}

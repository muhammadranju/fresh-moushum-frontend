"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ChevronLeft,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Homepage CMS", href: "/admin/cms", icon: Home },
  { label: "Delivery", href: "/admin/delivery", icon: Truck },
  { label: "WhatsApp", href: "/admin/whatsapp", icon: MessageSquare },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function Sidebar({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
}) {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-screen fixed lg:sticky top-0 bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col border-r border-slate-800 z-50 overflow-hidden",
        isCollapsed ? "lg:w-20" : "lg:w-64",
        isOpen 
          ? "translate-x-0 w-64 visible opacity-100" 
          : "-translate-x-full lg:translate-x-0 w-64 lg:w-auto lg:visible lg:opacity-100 invisible opacity-0"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center border-b border-slate-800 transition-all duration-300",
        isCollapsed && !isOpen ? "lg:justify-center py-8" : "p-6 justify-between"
      )}>
        {(!isCollapsed || isOpen) && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <img
                src="/fresh_moushum_logo.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-base tracking-tight leading-none">
                Fresh MouShum
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                Admin Console
              </span>
            </div>
          </div>
        )}
        
        {/* Toggle Button for Desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Close Button for Mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-slate-400 hover:text-white active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.label}
              initial={isOpen ? { opacity: 0, x: -20 } : false}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-300 group relative",
                  isCollapsed && !isOpen ? "lg:justify-center p-3.5" : "gap-4 px-4 py-3.5",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98]"
                    : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100",
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "min-w-[20px] transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-primary",
                  )}
                />
                {(!isCollapsed || isOpen) && (
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                )}
                {isActive && (!isCollapsed || isOpen) && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                  />
                )}
                {isCollapsed && !isOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl border border-slate-700">
                    {item.label}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <Link
          href="/admin/settings"
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all group",
            isCollapsed && !isOpen ? "lg:justify-center p-3" : "gap-4 px-4 py-3",
            pathname === "/admin/settings" && "bg-slate-800 text-white",
          )}
        >
          <Settings size={22} className="min-w-[22px]" />
          {(!isCollapsed || isOpen) && (
            <span className="font-medium text-sm">Settings</span>
          )}
        </Link>

        <button
          onClick={() => logout()}
          className={cn(
            "w-full flex items-center rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all mt-2 group",
            isCollapsed && !isOpen ? "lg:justify-center p-3" : "gap-4 px-4 py-3",
          )}
        >
          <LogOut size={22} className="min-w-[22px]" />
          {(!isCollapsed || isOpen) && (
            <span className="font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Search, Bell, User, Calendar, ExternalLink, Menu } from "lucide-react";
import Link from "next/link";

export default function AdminNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3 md:gap-8 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all text-slate-600 active:scale-95 shadow-sm"
        >
          <Menu size={22} />
        </button>

        {/* Mobile Brand */}
        <div className="flex lg:hidden items-center gap-2 mr-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
            <img
              src="/fresh_moushum_logo.png"
              alt="Logo"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="font-black text-slate-900 text-sm tracking-tight hidden sm:block">Admin Panel</span>
        </div>

        <div className="relative max-w-md w-full hidden md:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
          />
        </div>
        
        <div className="hidden xl:flex items-center gap-2 text-slate-400 text-sm font-bold whitespace-nowrap bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
          <Calendar size={16} className="text-primary" />
          <span>{today}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <Link 
          href="/" 
          target="_blank"
          className="hidden md:flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs transition-colors border-r border-slate-200 pr-6 mr-2"
        >
          View Site
          <ExternalLink size={14} />
        </Link>

        <button className="p-2 md:p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-primary rounded-xl transition-all relative shadow-sm hover:shadow-md active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors leading-none">Admin User</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.1em] font-black mt-1">Super Admin</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

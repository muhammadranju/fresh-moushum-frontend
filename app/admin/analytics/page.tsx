"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "মোট ভিজিটর", value: "১২,৪৫০", change: "+১২%", isUp: true, icon: Users, color: "blue" },
  { label: "মোট অর্ডার", value: "৮৫০", change: "+১৮%", isUp: true, icon: ShoppingCart, color: "green" },
  { label: "কনভার্সন রেট", value: "৩.২%", change: "-২%", isUp: false, icon: TrendingUp, color: "purple" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">এনালিটিক্স</h1>
        <p className="text-slate-500 font-medium">আপনার ব্যবসার প্রবৃদ্ধি এবং কাস্টমার ডাটা বিশ্লেষণ করুন।</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${item.color}-500/5 rounded-full transition-all group-hover:scale-150`} />
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-500 rounded-2xl flex items-center justify-center`}>
                <item.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${item.isUp ? "text-green-500" : "text-red-500"}`}>
                {item.change}
                {item.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{item.value}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-80 flex flex-col items-center justify-center text-center">
          <BarChart3 size={48} className="text-slate-200 mb-4" />
          <h4 className="font-bold text-slate-900">বিক্রয় চার্ট</h4>
          <p className="text-sm text-slate-400 max-w-[200px] mt-2">সাপ্তাহিক এবং মাসিক বিক্রয়ের গ্রাফ এখানে দেখা যাবে।</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-80 flex flex-col items-center justify-center text-center">
          <TrendingUp size={48} className="text-slate-200 mb-4" />
          <h4 className="font-bold text-slate-900">ট্রেন্ডিং পণ্য</h4>
          <p className="text-sm text-slate-400 max-w-[200px] mt-2">বর্তমানে জনপ্রিয় পণ্যের তালিকা এখানে দেখা যাবে।</p>
        </div>
      </div>
    </div>
  );
}

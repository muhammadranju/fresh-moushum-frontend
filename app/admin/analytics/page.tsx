"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Loader2, CheckCircle2 } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAPI("/order/analytics");
      const { summary, dailyTrend } = res.data;
      
      setChartData(dailyTrend || []);
      setSummaryData(summary);

      const newStats = [
        { 
          label: "মোট অর্ডার", 
          value: summary.totalOrders.toLocaleString('bn-BD'), 
          change: "সর্বমোট", 
          isUp: true, 
          icon: ShoppingCart, 
          color: "blue" 
        },
        { 
          label: "ডেলিভারড অর্ডার", 
          value: summary.deliveredOrders.toLocaleString('bn-BD'), 
          change: "সফল", 
          isUp: true, 
          icon: CheckCircle2, 
          color: "green" 
        },
        { 
          label: "মোট রেভিনিউ", 
          value: "৳ " + summary.totalRevenue.toLocaleString('bn-BD'), 
          change: "সংগৃহীত", 
          isUp: true, 
          icon: TrendingUp, 
          color: "purple" 
        },
      ];
      setStats(newStats);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">এনালিটিক্স</h1>
        <p className="text-slate-500 font-medium">আপনার ব্যবসার প্রবৃদ্ধি এবং কাস্টমার ডাটা বিশ্লেষণ করুন।</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-slate-100 rounded-full transition-all group-hover:scale-150`} />
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center`}>
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
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-[400px] flex flex-col overflow-hidden">
          {chartData.length > 0 ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-slate-900">গত ৩০ দিনের বিক্রয় রিপোর্ট</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Revenue</span>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-1 px-2">
                {chartData.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full relative">
                       <div 
                        className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary transition-all duration-300"
                        style={{ height: `${Math.max((day.revenue / Math.max(...chartData.map(d => d.revenue || 1))) * 200, 4)}px` }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ৳{day.revenue}
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-300 hidden md:block">{day._id.split('-')[2]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{chartData[0]?._id}</span>
                <span>{chartData[chartData.length - 1]?._id}</span>
              </div>
            </div>
          ) : (
            <>
              <BarChart3 size={48} className="text-slate-200 mb-4" />
              <h4 className="font-bold text-slate-900">বিক্রয় চার্ট</h4>
              <p className="text-sm text-slate-400 max-w-[200px] mt-2">সাপ্তাহিক এবং মাসিক বিক্রয়ের গ্রাফ এখানে দেখা যাবে।</p>
            </>
          )}
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-[400px] flex flex-col">
          <h4 className="font-bold text-slate-900 mb-8">অর্ডারের অবস্থা</h4>
          {summaryData ? (
            <div className="space-y-6">
              {[
                { label: "পেন্ডিং", value: summaryData.pendingOrders, color: "orange" },
                { label: "কনফার্মড", value: summaryData.confirmedOrders, color: "blue" },
                { label: "ডেলিভারড", value: summaryData.deliveredOrders, color: "green" },
                { label: "ক্যান্সেলড", value: summaryData.cancelledOrders, color: "red" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / (summaryData.totalOrders || 1)) * 100}%` }}
                      className={`h-full bg-${item.color}-500 rounded-full`}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-6 mt-6 border-t border-slate-50">
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  মোট সফল ডেলিভারি: {((summaryData.deliveredOrders / (summaryData.totalOrders || 1)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <TrendingUp size={48} className="text-slate-200 mb-4" />
              <h4 className="font-bold text-slate-900">লোডিং...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

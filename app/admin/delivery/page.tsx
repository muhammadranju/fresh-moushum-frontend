"use client";

import React from "react";
import { Truck, MapPin, Package, Clock, ShieldCheck, ExternalLink } from "lucide-react";

const deliveryPartners = [
  { id: 1, name: "Pathao", status: "Active", orders: 45, icon: "P" },
  { id: 2, name: "Steadfast", status: "Active", orders: 120, icon: "S" },
  { id: 3, name: "RedX", status: "Inactive", orders: 0, icon: "R" },
];

export default function DeliveryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">ডেলিভারি ম্যানেজমেন্ট</h1>
          <p className="text-slate-500 font-medium">কুরিয়ার পার্টনার এবং ডেলিভারি স্ট্যাটাস ট্রাক করুন।</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-lg transition-all">
          <MapPin size={18} />
          নতুন এরিয়া যোগ করুন
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <Package size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">১৫৬</h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">পেন্ডিং ডেলিভারি</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">১,২৩৪</h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">সফল ডেলিভারি</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <Clock size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">২.৫ দিন</h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">গড় সময়</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">কুরিয়ার পার্টনারসমূহ</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-2">
            সবগুলো দেখুন <ExternalLink size={14} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {deliveryPartners.map((partner) => (
            <div key={partner.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">
                  {partner.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{partner.name}</h4>
                  <p className="text-xs text-slate-500">{partner.orders} টি অর্ডার ডেলিভারি হয়েছে</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  partner.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {partner.status}
                </span>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

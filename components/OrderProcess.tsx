"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { getCMSByKey } from "@/lib/api";
import { PackageSearch, ClipboardList, CheckCircle2, Star, Truck, Heart, Leaf, ShieldCheck } from "lucide-react";

const iconMap: any = {
  PackageSearch: <PackageSearch size={32} />,
  ClipboardList: <ClipboardList size={32} />,
  CheckCircle2: <CheckCircle2 size={32} />,
  Star: <Star size={32} />,
  Truck: <Truck size={32} />,
  Heart: <Heart size={32} />,
  Leaf: <Leaf size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
};

export default function OrderProcess() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCMSByKey("order_process");
        if (res.data) {
          setData(res.data.value);
        }
      } catch (error) {
        console.error("Failed to fetch order_process data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  const steps = data?.steps || [
    {
      icon: "PackageSearch",
      title: "প্যাকেজ নির্বাচন করুন",
      desc: "আপনার পছন্দের আম বা লিচু প্যাকটি বেছে নিন।"
    },
    {
      icon: "ClipboardList",
      title: "정보 দিন",
      desc: "আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।"
    },
    {
      icon: "CheckCircle2",
      title: "অর্ডার নিশ্চিত করুন",
      desc: "আমরা কল করে আপনার অর্ডারটি কনফার্ম করে নেব।"
    }
  ];
  return (
    <section className="py-24 bg-nature-50 border-y border-nature-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            {data?.title || "কিভাবে অর্ডার করবেন?"}
          </h2>
          <div className="bg-primary/10 text-primary px-6 py-2 rounded-full inline-block font-bold text-sm">
            {data?.subtitle || "খুবই সহজ ৩টি ধাপে!"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-nature-200 -z-10 hidden md:block" />
          
          {steps.map((step: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-nature-100 text-center flex flex-col items-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                {iconMap[step.icon] || <Star size={32} />}
              </div>
              <div className="w-8 h-8 bg-nature-100 text-primary rounded-full flex items-center justify-center font-bold text-sm mb-4">
                ০{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 bg-white inline-block px-8 py-4 rounded-2xl border border-dashed border-primary/30">
            <span className="font-bold text-primary italic">মনে রাখবেন:</span> {data?.bottomText || "অনলাইন পেমেন্টের ঝামেলা নেই। অর্ডারের পর সরাসরি যোগাযোগ করা হবে এবং ক্যাশ অন ডেলিভারি দেওয়া হবে।"}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default function PackageSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const mangoPackages = products.filter((p) => p.category === "mango");
  const lycheePackages = products.filter((p) => p.category === "lychee");

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="packages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            আমাদের অফার
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 mb-6"
          >
            সেরা আমের <span className="text-primary">প্যাকেজসমূহ</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mangoPackages.length > 0 ? (
            mangoPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative card-premium flex flex-col group ${
                  pkg.popular ? "ring-4 ring-primary/20 scale-105 z-10" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                    সবচেয়ে জনপ্রিয়
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 text-primary">
                    {/* <span className="text-sm font-bold">৳</span> */}
                    <span className="text-4xl font-black">৳{pkg.price}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-6 h-6 bg-nature-100 rounded-full flex items-center justify-center text-primary">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>
                      পরিমাণ: <b>{pkg.weight}</b>
                    </span>
                  </div>
                  {pkg.quantity && (
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-6 h-6 bg-nature-100 rounded-full flex items-center justify-center text-primary">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span>
                        আনুমানিক: <b>{pkg.quantity}</b>
                      </span>
                    </div>
                  )}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <Link
                  href={`/order?package=${encodeURIComponent(pkg.name)}&price=${pkg.price}&weight=${encodeURIComponent(pkg.weight)}`}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? "bg-primary text-white shadow-xl shadow-primary/30 hover:bg-secondary"
                      : "bg-nature-100 text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  <ShoppingCart size={20} />
                  অর্ডার করুন
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-400">
              কোনো প্যাকেজ পাওয়া যায়নি।
            </div>
          )}
        </div>

        {/* Lychee Section */}
        {lycheePackages.length > 0 && (
          <div className="bg-nature-50 rounded-[40px] p-8 md:p-12 border border-nature-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  টাটকা লিচু প্যাকেজ
                </h2>
                <p className="text-slate-600 mb-8">
                  রাজশাহীর বিখ্যাত বড় সাইজের মিষ্টি লিচু এখন সরাসরি বাগান থেকে।
                  কোনো ফরমালিন বা বিষমুক্ত শতভাগ নিশ্চয়তা।
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {lycheePackages.map((pkg, idx) => (
                    <Link
                      key={idx}
                      href={`/order?package=${encodeURIComponent(
                        pkg.name,
                      )}&price=${pkg.price}&weight=${encodeURIComponent(
                        pkg.weight,
                      )}`}
                      className="bg-white p-5 rounded-3xl border border-nature-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group flex flex-col"
                    >
                      <div className="flex-grow">
                        <div className="text-slate-500 text-[10px] mb-1 font-bold uppercase tracking-wider">
                          {pkg.quantity}
                        </div>
                        <div className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors text-base">
                          {pkg.name}
                        </div>
                        <div className="text-primary font-black text-xl mb-4">
                          ৳ {pkg.price}
                        </div>
                      </div>

                      <div className="mt-auto pt-2 border-t border-slate-50">
                        <div className="w-full py-2.5 bg-nature-100 text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ShoppingCart size={14} />
                          অর্ডার করুন
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/fresh_lychees_hero.png"
                  alt="Lychees"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag size={18} className="text-accent-yellow" />
                    <span className="font-bold">বিশেষ অফার</span>
                  </div>
                  <p className="text-sm opacity-90">
                    ৫০০ পিস অর্ডার করলে ফ্রি ডেলিভারি!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

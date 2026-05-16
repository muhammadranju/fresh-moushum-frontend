"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function MangoHero({ data }: { data: any }) {
  if (!data) return null;

  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-nature-50 to-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -z-10 rounded-l-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-yellow/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-nature-100 text-primary rounded-full text-sm font-bold mb-6"
          >
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
             </span>
             {data.tagline || "মৌসুমের সেরা আম সরাসরি বাগান থেকে"}
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
            {data.title || "রাজশাহীর সেরা ও টাটকা আম এখন আপনার ঘরে"}
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
            {data.description || "আমরা নিশ্চিত করছি রাসায়নিক মুক্ত, সরাসরি বাগান থেকে বাছাই করা প্রিমিয়াম আম। আপনার পছন্দের আমের স্বাদ নিন একদম প্রাকৃতিক উপায়ে।"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#order" 
              onClick={scrollToOrder}
              className="btn-primary group py-5 px-10 text-lg"
            >
              {data.ctaText || "অর্ডার করুন"}
              <ShoppingBag
                size={22}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
            <Link 
              href="#story" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 font-bold text-slate-900 hover:text-primary transition-colors px-6"
            >
              আমাদের গল্প জানুন
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center gap-8 border-t border-nature-100 pt-8">
            <div>
              <p className="text-2xl font-black text-slate-900">৫০০০+</p>
              <p className="text-sm text-slate-500 font-medium">সন্তুষ্ট গ্রাহক</p>
            </div>
            <div className="w-px h-10 bg-nature-100" />
            <div>
              <p className="text-2xl font-black text-slate-900">২৪ঘণ্টা</p>
              <p className="text-sm text-slate-500 font-medium">ডেলিভারি সাপোর্ট</p>
            </div>
            <div className="w-px h-10 bg-nature-100" />
            <div>
              <p className="text-2xl font-black text-slate-900">১০০%</p>
              <p className="text-sm text-slate-500 font-medium">প্রাকৃতিক আম</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative"
        >
          <div className="relative z-10 w-full aspect-square md:h-[650px] rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white group">
            <Image
              src={data.image || "/fresh_mangoes_hero.png"}
              alt="Premium Mangoes"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
              priority
            />
          </div>
          
          {/* Decorative badges */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-white p-6 rounded-[32px] shadow-2xl z-20 border border-nature-50 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent-yellow rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-accent-yellow/20">
                 <span className="text-2xl font-black">★</span>
              </div>
              <div>
                <p className="font-black text-slate-900">সেরা রেটিং</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">রাজশাহীর আম</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 bg-primary text-white p-6 rounded-[32px] shadow-2xl z-20 border-4 border-white hidden lg:block"
          >
            <p className="text-sm font-bold opacity-80 mb-1">সরাসরি বাগান থেকে</p>
            <p className="text-xl font-black">রাজশাহী স্পেশাল</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function MangoStory({ data }: { data: any }) {
  const sections = data?.sections || [
    {
      title: "রাজশাহীর বাগান থেকে সরাসরি",
      content: "আমাদের প্রতিটি আম সরাসরি রাজশাহীর সেরা বাগানগুলো থেকে সংগ্রহ করা হয়। আমরা কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি বাগান মালিকদের সাথে কাজ করি যাতে আপনি পান সেরা দাম ও গুণমান।",
      image: "/fresh_mangoes_hero.png",
      features: ["বাগান থেকে তাজা সংগ্রহ", "সেরা কোয়ালিটি নিশ্চিতকরণ", "ন্যায্য মূল্য"]
    },
    {
      title: "প্রাকৃতিকভাবে পাকানো আম",
      content: "বাজারে সাধারণত কেমিক্যাল দিয়ে আম পাকানো হয় যা স্বাস্থ্যের জন্য ক্ষতিকর। আমরা নিশ্চিত করি আমাদের আমগুলো গাছে বা প্রাকৃতিকভাবেই পাকানো হয়, কোনো ক্ষতিকর রাসায়নিক ছাড়াই।",
      image: "/fresh_lychees_hero.png",
      features: ["১০০% কেমিক্যাল মুক্ত", "প্রাকৃতিক স্বাদ ও সুগন্ধ", "নিরাপদ খাদ্য"]
    }
  ];

  return (
    <section id="story" className="py-24 bg-cream/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
             আমাদের আমের বিশেষত্ব
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-32">
          {sections.map((section: any, idx: number) => (
            <div 
              key={idx}
              className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
            >
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`absolute -top-10 ${idx % 2 !== 0 ? '-left-10' : '-right-10'} w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10`} />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: idx % 2 !== 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                  {section.title}
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {section.content}
                </p>
                
                {section.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.features.map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="font-bold text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

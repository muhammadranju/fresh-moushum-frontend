"use client";

import { Check, Copy, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const templates = [
  {
    id: 1,
    title: "অর্ডার নিশ্চিতকরণ",
    message:
      "সুপ্রভাত! আপনার 'ফ্রেশ মৌসুম' অর্ডারটি (#ID) আমরা পেয়েছি এবং নিশ্চিত করেছি। শীঘ্রই পণ্যটি আপনার ঠিকানায় পাঠানো হবে। ধন্যবাদ।",
  },
  {
    id: 2,
    title: "ডেলিভারি আপডেট",
    message:
      "আপনার অর্ডারটি আজ ডেলিভারির জন্য পাঠানো হয়েছে। কুরিয়ার প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।",
  },
  {
    id: 3,
    title: "পণ্য শেষ অফার",
    message:
      "দুঃখিত, আপনার পছন্দের আমটি এখন স্টকে নেই। তবে আমাদের হিমসাগর আমটি ট্রাই করতে পারেন, যা এই মুহূর্তে সবচেয়ে ভালো মানের।",
  },
];

export default function WhatsAppPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            হোয়াটসঅ্যাপ কুইক রিপ্লাই
          </h1>
          <p className="text-slate-500 font-medium">
            কাস্টমারদের দ্রুত রিপ্লাই দেওয়ার জন্য মেসেজ টেমপ্লেট ব্যবহার করুন।
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#25D366]/20 hover:shadow-xl transition-all">
          <Plus size={18} />
          নতুন টেমপ্লেট
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">{t.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(t.id, t.message)}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-primary rounded-lg transition-all"
                  >
                    {copiedId === t.id ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                {t.message}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 text-white relative h-fit sticky top-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center">
              <FaWhatsapp size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">ডিরেক্ট মেসেজ</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                Manual Send
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-black">
                মোবাইল নম্বর
              </label>
              <input
                type="text"
                placeholder="০১৭XXXXXXXX"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#25D366] transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-black">
                মেসেজ
              </label>
              <textarea
                rows={4}
                placeholder="আপনার মেসেজ এখানে লিখুন..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#25D366] transition-all resize-none"
              />
            </div>
            <button className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
              মেসেজ পাঠান
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

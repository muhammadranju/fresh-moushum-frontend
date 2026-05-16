"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { getCMSByKey } from "@/lib/api";

export default function FloatingWhatsApp() {
  const [whatsapp, setWhatsapp] = useState("8801799301290");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getCMSByKey("website_settings");
        if (res.data?.value?.contact?.whatsapp) {
          setWhatsapp(res.data.value.contact.whatsapp.replace(/[^0-9]/g, ""));
        }
      } catch (error) {
        console.error("Failed to fetch whatsapp settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute -top-12 right-0 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-100 pointer-events-none">
        আপনার কোনো প্রশ্ন আছে?
        <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100" />
      </div>
      <FaWhatsapp size={32} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] -z-10 animate-ping opacity-20" />
    </motion.a>
  );
}

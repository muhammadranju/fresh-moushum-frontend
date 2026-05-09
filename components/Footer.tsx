"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/fresh_moushum_logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ফ্রেশ মৌসুম
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              আমরা আপনাকে দিচ্ছি সরাসরি বাগান থেকে সংগৃহীত টাটকা ও নিরাপদ মৌসুমি
              ফল। গুণগত মানে আপসহীন এবং গ্রাহক সেবায় প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="#packages"
                  className="hover:text-primary transition-colors"
                >
                  প্যাকেজসমূহ
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="#reviews"
                  className="hover:text-primary transition-colors"
                >
                  গ্রাহকদের মতামত
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">পণ্যসমূহ</h4>
            <ul className="space-y-4 text-sm">
              <li>হিমসাগর আম</li>
              <li>আম্রপালি আম</li>
              <li>ল্যাংড়া আম</li>
              <li>বোম্বাই লিচু</li>
              <li>মধু ও অন্যান্য</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">যোগাযোগ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span>রাজপাড়া, রাজশাহী, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+8801799301290</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>freshmoushum@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
          <p>© {currentYear} ফ্রেশ মৌসুম। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              প্রাইভেসি পলিসি
            </a>
            <a href="#" className="hover:text-white transition-colors">
              শর্তাবলী
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

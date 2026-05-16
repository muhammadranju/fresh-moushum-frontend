"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Image as ImageIcon,
  Type,
  Layout,
  Send,
  Loader2,
  Star,
  CheckCircle2,
  Youtube,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { getCMSByKey, fetchAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import ImageUpload from "@/components/admin/ImageUpload";

export default function CMSPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [cmsData, setCmsData] = useState<any>({
    hero_content: {
      tagline: "সরাসরি বাগান থেকে ফ্রেশ ফল",
      title: "সেরা মানের ফ্রেশ ফলমূল পৌঁছে দিচ্ছি আপনার দোরগোড়ায়",
      description:
        "আমরা সরাসরি বাগান থেকে আম, লিচুসহ সব ধরণের সিজনাল ফল সংগ্রহ করি এবং আপনাদের কাছে পৌঁছে দেই।",
      mainImage: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
      sideImage: "https://images.unsplash.com/photo-1557800636-894a64c1696f",
      whatsapp: "০১৭XXXXXXXX",
    },
    about_content: {
      title: "আমাদের সম্পর্কে",
      description:
        "ফ্রেশ মৌসুমি ফলের এক নির্ভরযোগ্য নাম 'ফ্রেশ মৌচুম'। আমরা বিষমুক্ত এবং ফ্রেশ ফল সরাসরি বাগান থেকে সংগ্রহ করে থাকি।",
      imageUrl: "/fresh_mangoes_hero.png",
      videoUrl: "",
    },
    banners: {
      promoBanner: "",
      secondaryBanner: "",
    },
    youtube_video: {
      title: "আমাদের বাগান সরাসরি দেখুন",
      embedCode: "",
    },
    why_choose_us: {
      label: "কেন আমাদের বেছে নেবেন?",
      title: "আমরা নিশ্চিত করি বিশুদ্ধ ও প্রাকৃতিক স্বাদ",
      description:
        "ফ্রেশ মৌসুম শুধু একটি ব্র্যান্ড নয়, এটি একটি বিশ্বাস। আমরা জানি আপনার ও আপনার পরিবারের জন্য নিরাপদ খাদ্যের গুরুত্ব কতটা। তাই আমরা কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি বাগান থেকে ফল সংগ্রহ করি।",
      ratingText: "৪.৯/৫ গড় রেটিং",
      ratingLabel: "হাজারো গ্রাহকের আস্থার প্রতীক",
      features: [
        {
          title: "টাটকা পণ্য",
          desc: "প্রতিদিন সরাসরি বাগান থেকে টাটকা ফল সংগ্রহ করা হয়।",
          color: "bg-green-100 text-green-600",
          icon: "Leaf",
        },
        {
          title: "শতভাগ নিরাপদ",
          desc: "কোনো ফরমালিন বা রাসায়নিক ছাড়াই বিষমুক্ত ফল সরবরাহ করি।",
          color: "bg-blue-100 text-blue-600",
          icon: "ShieldCheck",
        },
        {
          title: "সারা দেশে ডেলিভারি",
          desc: "নিরাপদ প্যাকেজিংয়ে সারা দেশে দ্রুত হোম ডেলিভারি।",
          color: "bg-orange-100 text-orange-600",
          icon: "Truck",
        },
        {
          title: "বিশ্বস্ত সেবা",
          desc: "গ্রাহকের সন্তুষ্টিই আমাদের প্রধান লক্ষ্য ও প্রাপ্তি।",
          color: "bg-red-100 text-red-600",
          icon: "Heart",
        },
      ],
    },
    order_process: {
      title: "কিভাবে অর্ডার করবেন?",
      subtitle: "খুবই সহজ ৩টি ধাপে!",
      bottomText:
        "মনে রাখবেন: অনলাইন পেমেন্টের ঝামেলা নেই। অর্ডারের পর সরাসরি যোগাযোগ করা হবে এবং ক্যাশ অন ডেলিভারি দেওয়া হবে।",
      steps: [
        {
          title: "প্যাকেজ নির্বাচন করুন",
          desc: "আপনার পছন্দের আম বা লিচু প্যাকটি বেছে নিন।",
          icon: "PackageSearch",
        },
        {
          title: "তথ্য দিন",
          desc: "আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।",
          icon: "ClipboardList",
        },
        {
          title: "অর্ডার নিশ্চিত করুন",
          desc: "আমরা কল করে আপনার অর্ডারটি কনফার্ম করে নেব।",
          icon: "CheckCircle2",
        },
      ],
    },
    package_section: {
      title: "আমাদের মৌসুমি প্যাকেজসমূহ",
      subtitle: "সরাসরি বাগান থেকে সংগৃহীত সেরা মানের ফল বেছে নিন",
    },
    reviews_section: {
      label: "গ্রাহক সন্তুষ্টি",
      title: "আমাদের গ্রাহকদের মতামত",
    },
    mango_landing: {
      hero: { tagline: "", title: "", description: "", ctaText: "", image: "" },
      carousel: [],
      story: { sections: [] },
      checkout: { deliveryCharge: 150 },
    },
  });

  useEffect(() => {
    const loadAllCMS = async () => {
      try {
        const keys = [
          "hero_content",
          "about_content",
          "banners",
          "youtube_video",
          "why_choose_us",
          "order_process",
          "package_section",
          "reviews_section",
          "mango_landing",
        ];
        const results = await Promise.all(keys.map((key) => getCMSByKey(key)));

        const newData = { ...cmsData };
        results.forEach((res, index) => {
          if (res.data) {
            newData[keys[index]] = res.data.value;
          }
        });
        setCmsData(newData);
      } catch (error) {
        console.error("Failed to load CMS:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllCMS();
  }, []);

  const handleSave = async (key: string) => {
    setSaving(true);
    try {
      // Helper to trim strings recursively
      const trimStrings = (obj: any): any => {
        if (typeof obj === "string") return obj.trim();
        if (Array.isArray(obj)) return obj.map(trimStrings);
        if (typeof obj === "object" && obj !== null) {
          return Object.keys(obj).reduce((acc: any, k) => {
            acc[k] = trimStrings(obj[k]);
            return acc;
          }, {});
        }
        return obj;
      };

      const trimmedValue = trimStrings(cmsData[key]);

      await fetchAPI("/cms", {
        method: "POST",
        body: JSON.stringify({
          key,
          value: trimmedValue,
          description: `${key} management`,
        }),
      });
      toast("কন্টেন্ট সফলভাবে সেভ হয়েছে!", "success");
    } catch (error) {
      toast("সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            কন্টেন্ট ম্যানেজার
          </h1>
          <p className="text-slate-500 font-medium">
            ওয়েবসাইটের লেখা এবং ছবি এখান থেকে পরিবর্তন করুন।
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Tab Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 space-y-2">
          {[
            { id: "hero", label: "Hero Section", icon: Layout },
            { id: "about", label: "About Us", icon: Type },
            { id: "banners", label: "Banners", icon: ImageIcon },
            { id: "video", label: "YouTube Video", icon: Youtube },
            { id: "why_choose_us", label: "Why Choose Us", icon: ShieldCheck },
            { id: "order_process", label: "Order Process", icon: Star },
            { id: "packages", label: "Packages Text", icon: Layout },
            { id: "reviews", label: "Reviews Text", icon: Send },
            { id: "mango", label: "Mango Page", icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm border border-slate-100"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.icon === Youtube ? (
                <Youtube size={18} />
              ) : (
                <tab.icon size={18} />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold text-slate-900 capitalize">
              {activeTab.replace("_", " ")} Editor
            </h2>
            <button
              onClick={() => {
                const keyMap: any = {
                  hero: "hero_content",
                  about: "about_content",
                  banners: "banners",
                  video: "youtube_video",
                  why_choose_us: "why_choose_us",
                  order_process: "order_process",
                  packages: "package_section",
                  reviews: "reviews_section",
                  mango: "mango_landing",
                };
                handleSave(keyMap[activeTab]);
              }}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/10 hover:bg-secondary transition-all disabled:opacity-50 text-sm"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              সেভ করুন
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 max-w-2xl"
          >
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero_content.tagline}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero_content: {
                          ...cmsData.hero_content,
                          tagline: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero_content.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero_content: {
                          ...cmsData.hero_content,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Subheadline
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.hero_content.description}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero_content: {
                          ...cmsData.hero_content,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <ImageUpload
                      label="Main Hero Image"
                      folder="hero"
                      currentImage={cmsData.hero_content.mainImage}
                      onUploadSuccess={(url) =>
                        setCmsData({
                          ...cmsData,
                          hero_content: {
                            ...cmsData.hero_content,
                            mainImage: url,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <ImageUpload
                      label="Side Hero Image"
                      folder="hero"
                      currentImage={cmsData.hero_content.sideImage}
                      onUploadSuccess={(url) =>
                        setCmsData({
                          ...cmsData,
                          hero_content: {
                            ...cmsData.hero_content,
                            sideImage: url,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero_content.whatsapp}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero_content: {
                          ...cmsData.hero_content,
                          whatsapp: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Customer Count Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero_content.customerCount}
                      placeholder="৫০০০+ খুশি গ্রাহক"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          hero_content: {
                            ...cmsData.hero_content,
                            customerCount: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Delivery Badge Title
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero_content.deliveryTitle}
                      placeholder="দ্রুত ডেলিভারি"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          hero_content: {
                            ...cmsData.hero_content,
                            deliveryTitle: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Delivery Badge Text
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero_content.deliveryText}
                    placeholder="২৪-৪৮ ঘণ্টার মধ্যে সারা দেশে হোম ডেলিভারি"
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero_content: {
                          ...cmsData.hero_content,
                          deliveryText: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={cmsData.about_content.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        about_content: {
                          ...cmsData.about_content,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={cmsData.about_content.description}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        about_content: {
                          ...cmsData.about_content,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <ImageUpload
                    label="About Us Image"
                    folder="cms"
                    currentImage={cmsData.about_content.imageUrl}
                    onUploadSuccess={(url) =>
                      setCmsData({
                        ...cmsData,
                        about_content: {
                          ...cmsData.about_content,
                          imageUrl: url,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Video URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={cmsData.about_content.videoUrl}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        about_content: {
                          ...cmsData.about_content,
                          videoUrl: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Stat 1 Value
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.stat1Value}
                      placeholder="৫০০+"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            stat1Value: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Stat 1 Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.stat1Label}
                      placeholder="নিজস্ব বাগান পার্টনার"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            stat1Label: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Stat 2 Value
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.stat2Value}
                      placeholder="১০০%"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            stat2Value: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Stat 2 Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.stat2Label}
                      placeholder="ফরমালিন মুক্ত"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            stat2Label: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Experience Value
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.experienceValue}
                      placeholder="১০+"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            experienceValue: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Experience Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.about_content.experienceLabel}
                      placeholder="বছরের অভিজ্ঞতা"
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          about_content: {
                            ...cmsData.about_content,
                            experienceLabel: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "banners" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <ImageUpload
                      label="Promo Banner"
                      folder="banners"
                      currentImage={cmsData.banners.promoBanner}
                      onUploadSuccess={(url) =>
                        setCmsData({
                          ...cmsData,
                          banners: { ...cmsData.banners, promoBanner: url },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <ImageUpload
                      label="Secondary Banner"
                      folder="banners"
                      currentImage={cmsData.banners.secondaryBanner}
                      onUploadSuccess={(url) =>
                        setCmsData({
                          ...cmsData,
                          banners: { ...cmsData.banners, secondaryBanner: url },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "video" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Video Section Title
                  </label>
                  <input
                    type="text"
                    value={cmsData.youtube_video.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        youtube_video: {
                          ...cmsData.youtube_video,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    YouTube URL or Iframe Code
                  </label>
                  <textarea
                    rows={4}
                    placeholder="https://www.youtube.com/watch?v=... অথবা <iframe>...</iframe>"
                    value={cmsData.youtube_video.embedCode}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        youtube_video: {
                          ...cmsData.youtube_video,
                          embedCode: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">
                    ইউটিউব ভিডিওর লিঙ্ক অথবা এমবেড কোড এখানে পেস্ট করুন। সিস্টেম
                    অটোমেটিক আইডি খুঁজে নিবে।
                  </p>
                </div>
              </div>
            )}

            {activeTab === "why_choose_us" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Label
                  </label>
                  <input
                    type="text"
                    value={cmsData.why_choose_us.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        why_choose_us: {
                          ...cmsData.why_choose_us,
                          label: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.why_choose_us.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        why_choose_us: {
                          ...cmsData.why_choose_us,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={cmsData.why_choose_us.description}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        why_choose_us: {
                          ...cmsData.why_choose_us,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Rating Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.why_choose_us.ratingText}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          why_choose_us: {
                            ...cmsData.why_choose_us,
                            ratingText: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Rating Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.why_choose_us.ratingLabel}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          why_choose_us: {
                            ...cmsData.why_choose_us,
                            ratingLabel: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-bold mb-4">Features</h3>
                  <div className="space-y-4">
                    {cmsData.why_choose_us.features.map(
                      (f: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-slate-50 p-6 rounded-3xl space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={f.title}
                              placeholder="Feature Title"
                              onChange={(e) => {
                                const newFeatures = [
                                  ...cmsData.why_choose_us.features,
                                ];
                                newFeatures[idx].title = e.target.value;
                                setCmsData({
                                  ...cmsData,
                                  why_choose_us: {
                                    ...cmsData.why_choose_us,
                                    features: newFeatures,
                                  },
                                });
                              }}
                              className="w-full bg-white border border-slate-100 rounded-xl p-3 font-bold text-sm outline-none"
                            />
                            <input
                              type="text"
                              value={f.icon}
                              placeholder="Icon (e.g. Leaf, Truck)"
                              onChange={(e) => {
                                const newFeatures = [
                                  ...cmsData.why_choose_us.features,
                                ];
                                newFeatures[idx].icon = e.target.value;
                                setCmsData({
                                  ...cmsData,
                                  why_choose_us: {
                                    ...cmsData.why_choose_us,
                                    features: newFeatures,
                                  },
                                });
                              }}
                              className="w-full bg-white border border-slate-100 rounded-xl p-3 font-bold text-sm outline-none"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={f.desc}
                            placeholder="Feature Description"
                            onChange={(e) => {
                              const newFeatures = [
                                ...cmsData.why_choose_us.features,
                              ];
                              newFeatures[idx].desc = e.target.value;
                              setCmsData({
                                ...cmsData,
                                why_choose_us: {
                                  ...cmsData.why_choose_us,
                                  features: newFeatures,
                                },
                              });
                            }}
                            className="w-full bg-white border border-slate-100 rounded-xl p-3 text-slate-500 text-sm outline-none resize-none"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "order_process" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Title
                  </label>
                  <input
                    type="text"
                    value={cmsData.order_process.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        order_process: {
                          ...cmsData.order_process,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={cmsData.order_process.subtitle}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        order_process: {
                          ...cmsData.order_process,
                          subtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-bold mb-4">Steps</h3>
                  <div className="space-y-4">
                    {cmsData.order_process.steps.map((s: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-6 rounded-3xl space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={s.title}
                            placeholder="Step Title"
                            onChange={(e) => {
                              const newSteps = [...cmsData.order_process.steps];
                              newSteps[idx].title = e.target.value;
                              setCmsData({
                                ...cmsData,
                                order_process: {
                                  ...cmsData.order_process,
                                  steps: newSteps,
                                },
                              });
                            }}
                            className="w-full bg-white border border-slate-100 rounded-xl p-3 font-bold text-sm outline-none"
                          />
                          <input
                            type="text"
                            value={s.icon}
                            placeholder="Icon Name"
                            onChange={(e) => {
                              const newSteps = [...cmsData.order_process.steps];
                              newSteps[idx].icon = e.target.value;
                              setCmsData({
                                ...cmsData,
                                order_process: {
                                  ...cmsData.order_process,
                                  steps: newSteps,
                                },
                              });
                            }}
                            className="w-full bg-white border border-slate-100 rounded-xl p-3 font-bold text-sm outline-none"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={s.desc}
                          placeholder="Step Description"
                          onChange={(e) => {
                            const newSteps = [...cmsData.order_process.steps];
                            newSteps[idx].desc = e.target.value;
                            setCmsData({
                              ...cmsData,
                              order_process: {
                                ...cmsData.order_process,
                                steps: newSteps,
                              },
                            });
                          }}
                          className="w-full bg-white border border-slate-100 rounded-xl p-3 text-slate-500 text-sm outline-none resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Bottom Info Text
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.order_process.bottomText}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        order_process: {
                          ...cmsData.order_process,
                          bottomText: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "packages" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={cmsData.package_section.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        package_section: {
                          ...cmsData.package_section,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={cmsData.package_section.subtitle}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        package_section: {
                          ...cmsData.package_section,
                          subtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Label
                  </label>
                  <input
                    type="text"
                    value={cmsData.reviews_section.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        reviews_section: {
                          ...cmsData.reviews_section,
                          label: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.reviews_section.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        reviews_section: {
                          ...cmsData.reviews_section,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "mango" && (
              <div className="space-y-10">
                {/* Hero Section */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[32px]">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
                    <Layout size={20} className="text-primary" /> Hero Section
                  </h3>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Hero Tagline
                    </label>
                    <input
                      type="text"
                      value={cmsData.mango_landing.hero?.tagline}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            hero: {
                              ...cmsData.mango_landing.hero,
                              tagline: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={cmsData.mango_landing.hero?.title}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            hero: {
                              ...cmsData.mango_landing.hero,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Hero Description
                    </label>
                    <textarea
                      rows={3}
                      value={cmsData.mango_landing.hero?.description}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            hero: {
                              ...cmsData.mango_landing.hero,
                              description: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={cmsData.mango_landing.hero?.ctaText}
                        onChange={(e) =>
                          setCmsData({
                            ...cmsData,
                            mango_landing: {
                              ...cmsData.mango_landing,
                              hero: {
                                ...cmsData.mango_landing.hero,
                                ctaText: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full bg-white border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-4">
                      <ImageUpload
                        label="Hero Image"
                        folder="mango"
                        currentImage={cmsData.mango_landing.hero?.image}
                        onUploadSuccess={(url) =>
                          setCmsData({
                            ...cmsData,
                            mango_landing: {
                              ...cmsData.mango_landing,
                              hero: {
                                ...cmsData.mango_landing.hero,
                                image: url,
                              },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Carousel / Gallery Section */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[32px]">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
                    <ImageIcon size={20} className="text-primary" /> Image
                    Gallery (Carousel)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(cmsData.mango_landing.carousel || []).map(
                      (img: any, idx: number) => (
                        <div
                          key={idx}
                          className="relative group bg-white p-4 rounded-2xl border border-slate-100"
                        >
                          <ImageUpload
                            label={`Image ${idx + 1}`}
                            folder="mango_gallery"
                            currentImage={img.url}
                            onUploadSuccess={(url) => {
                              const newCarousel = [
                                ...cmsData.mango_landing.carousel,
                              ];
                              newCarousel[idx].url = url;
                              setCmsData({
                                ...cmsData,
                                mango_landing: {
                                  ...cmsData.mango_landing,
                                  carousel: newCarousel,
                                },
                              });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Caption (Optional)"
                            value={img.alt}
                            onChange={(e) => {
                              const newCarousel = [
                                ...cmsData.mango_landing.carousel,
                              ];
                              newCarousel[idx].alt = e.target.value;
                              setCmsData({
                                ...cmsData,
                                mango_landing: {
                                  ...cmsData.mango_landing,
                                  carousel: newCarousel,
                                },
                              });
                            }}
                            className="w-full mt-2 text-xs p-2 bg-slate-50 rounded-lg outline-none"
                          />
                          <button
                            onClick={() => {
                              const newCarousel =
                                cmsData.mango_landing.carousel.filter(
                                  (_: any, i: number) => i !== idx,
                                );
                              setCmsData({
                                ...cmsData,
                                mango_landing: {
                                  ...cmsData.mango_landing,
                                  carousel: newCarousel,
                                },
                              });
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Loader2 className="rotate-45" size={14} />
                          </button>
                        </div>
                      ),
                    )}
                    <button
                      onClick={() => {
                        const newCarousel = [
                          ...(cmsData.mango_landing.carousel || []),
                          { url: "", alt: "" },
                        ];
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            carousel: newCarousel,
                          },
                        });
                      }}
                      className="h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                    >
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-xs font-bold uppercase">
                        Add New Image
                      </span>
                    </button>
                  </div>
                </div>

                {/* Story Sections */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[32px]">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
                    <Type size={20} className="text-primary" /> Story Sections
                  </h3>
                  <div className="space-y-8">
                    {(cmsData.mango_landing.story?.sections || []).map(
                      (section: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-white p-6 rounded-[32px] border border-slate-100 relative space-y-4"
                        >
                          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                            <span className="text-xs font-black text-slate-300 uppercase">
                              Section {idx + 1}
                            </span>
                            <button
                              onClick={() => {
                                const newSections =
                                  cmsData.mango_landing.story.sections.filter(
                                    (_: any, i: number) => i !== idx,
                                  );
                                setCmsData({
                                  ...cmsData,
                                  mango_landing: {
                                    ...cmsData.mango_landing,
                                    story: {
                                      ...cmsData.mango_landing.story,
                                      sections: newSections,
                                    },
                                  },
                                });
                              }}
                              className="text-red-500 hover:text-red-700 text-xs font-bold"
                            >
                              Remove Section
                            </button>
                          </div>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Section Title"
                              value={section.title}
                              onChange={(e) => {
                                const newSections = [
                                  ...cmsData.mango_landing.story.sections,
                                ];
                                newSections[idx].title = e.target.value;
                                setCmsData({
                                  ...cmsData,
                                  mango_landing: {
                                    ...cmsData.mango_landing,
                                    story: {
                                      ...cmsData.mango_landing.story,
                                      sections: newSections,
                                    },
                                  },
                                });
                              }}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                            />
                            <textarea
                              rows={3}
                              placeholder="Section Content"
                              value={section.content}
                              onChange={(e) => {
                                const newSections = [
                                  ...cmsData.mango_landing.story.sections,
                                ];
                                newSections[idx].content = e.target.value;
                                setCmsData({
                                  ...cmsData,
                                  mango_landing: {
                                    ...cmsData.mango_landing,
                                    story: {
                                      ...cmsData.mango_landing.story,
                                      sections: newSections,
                                    },
                                  },
                                });
                              }}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-600 focus:border-primary outline-none resize-none"
                            />
                            <ImageUpload
                              label="Section Image"
                              folder="mango_story"
                              currentImage={section.image}
                              onUploadSuccess={(url) => {
                                const newSections = [
                                  ...cmsData.mango_landing.story.sections,
                                ];
                                newSections[idx].image = url;
                                setCmsData({
                                  ...cmsData,
                                  mango_landing: {
                                    ...cmsData.mango_landing,
                                    story: {
                                      ...cmsData.mango_landing.story,
                                      sections: newSections,
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                    <button
                      onClick={() => {
                        const newSections = [
                          ...(cmsData.mango_landing.story?.sections || []),
                          { title: "", content: "", image: "", features: [] },
                        ];
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            story: {
                              ...cmsData.mango_landing.story,
                              sections: newSections,
                            },
                          },
                        });
                      }}
                      className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary transition-all font-bold"
                    >
                      Add New Story Section
                    </button>
                  </div>
                </div>

                {/* Checkout Config */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[32px]">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
                    <ShoppingCart size={20} className="text-primary" /> Checkout
                    Configuration
                  </h3>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Delivery Charge (৳)
                    </label>
                    <input
                      type="number"
                      value={cmsData.mango_landing.checkout?.deliveryCharge}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          mango_landing: {
                            ...cmsData.mango_landing,
                            checkout: {
                              ...cmsData.mango_landing.checkout,
                              deliveryCharge: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

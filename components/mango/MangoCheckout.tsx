"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ShoppingBag,
  Send,
  Package,
  Truck,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { createOrder } from "@/lib/api";

export default function MangoCheckout({
  packages,
  cmsData,
}: {
  packages: any[];
  cmsData: any;
}) {
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (packages.length > 0 && !selectedPkg) {
      setSelectedPkg(packages[0]);
    }
  }, [packages]);

  const deliveryCharge = cmsData?.deliveryCharge || 150;
  const itemTotal = selectedPkg ? selectedPkg.price * formData.quantity : 0;
  const totalAmount = itemTotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;

    setIsSubmitting(true);
    try {
      await createOrder({
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        packageName: selectedPkg.name,
        quantity: formData.quantity,
        totalPrice: totalAmount,
        note: formData.note,
      });
      setIsSuccess(true);
    } catch (error) {
      alert("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="order" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center py-20 bg-nature-50 rounded-[60px] border-4 border-white shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <CheckCircle size={48} />
          </motion.div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            অর্ডার সফল হয়েছে!
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
            আপনার প্রিমিয়াম আমের অর্ডারটি আমরা পেয়েছি। শীঘ্রই আমাদের প্রতিনিধি
            আপনাকে কল করবেন।
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="btn-primary px-10 py-4"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 bg-nature-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            অর্ডার কনফার্ম করুন
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            সহজ ৩টি ধাপে আপনার পছন্দের আম বুঝে নিন
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Package Selection - Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-nature-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Package className="text-primary" />
                ১. আমের প্যাকেজ নির্বাচন করুন
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg._id}
                    disabled={pkg.stockStatus === "Out of Stock"}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${
                      selectedPkg?._id === pkg._id
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-slate-100 bg-slate-50 hover:border-nature-200"
                    } ${pkg.stockStatus === "Out of Stock" ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-black text-slate-900">
                        {pkg.name}
                      </h4>
                      <div className="flex flex-col items-end gap-1">
                        {pkg.popular && (
                          <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold">
                            পপুলার
                          </span>
                        )}
                        <span
                          className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${
                            pkg.stockStatus === "In Stock"
                              ? "bg-green-100 text-green-600"
                              : pkg.stockStatus === "Low Stock"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {pkg.stockStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">
                        ৳{pkg.price}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        / {pkg.weight}
                      </span>
                    </div>
                    {selectedPkg?._id === pkg._id && (
                      <div className="absolute top-0 right-0 w-8 h-8 bg-primary text-white flex items-center justify-center rounded-bl-2xl">
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-nature-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Truck className="text-primary" />
                ২. আপনার তথ্য প্রদান করুন
              </h3>
              <form
                id="mango-order-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">
                      পূর্ণ নাম
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="আপনার নাম"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">
                      মোবাইল নম্বর
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="০১৭XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">
                    পূর্ণ ঠিকানা
                  </label>
                  <textarea
                    required
                    placeholder="গ্রাম/রোড, থানা, জেলা"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">
                      পরিমাণ (প্যাক)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.max(1, formData.quantity - 1),
                          })
                        }
                        className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-xl font-black w-10 text-center">
                        {formData.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: formData.quantity + 1,
                          })
                        }
                        className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary - Right */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0" />

              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <ShoppingCart className="text-primary" size={24} />
                অর্ডার সামারি
              </h3>

              <div className="space-y-6 relative z-10">
                {selectedPkg ? (
                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <div>
                      <p className="text-primary font-black text-lg">
                        {selectedPkg.name}
                      </p>
                      <p className="text-xs text-white/50 font-bold">
                        {selectedPkg.weight} × {formData.quantity}
                      </p>
                    </div>
                    <p className="text-xl font-black">৳{itemTotal}</p>
                  </div>
                ) : (
                  <p className="text-white/40 italic">
                    প্যাকেজ নির্বাচন করুন...
                  </p>
                )}

                <div className="flex justify-between items-center py-2">
                  <p className="text-white/60 font-medium flex items-center gap-2">
                    <Truck size={16} /> হোম ডেলিভারি চার্জ
                  </p>
                  <p className="font-bold">৳{deliveryCharge}</p>
                </div>

                <div className="pt-6 border-t border-white/20 flex justify-between items-center">
                  <p className="text-lg font-bold">সর্বমোট</p>
                  <p className="text-4xl font-black text-primary">
                    ৳{totalAmount}
                  </p>
                </div>

                <div className="py-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-white/60 font-medium">
                    <ShieldCheck size={16} className="text-green-500" />
                    ১০০% নিরাপদ ও বিষমুক্ত আমের নিশ্চয়তা
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60 font-medium">
                    <CreditCard size={16} className="text-primary" />
                    ক্যাশ অন ডেলিভারি (পণ্য বুঝে টাকা দিন)
                  </div>
                </div>

                <button
                  disabled={isSubmitting || !selectedPkg}
                  form="mango-order-form"
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white py-6 rounded-3xl font-black text-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    "প্রসেসিং..."
                  ) : (
                    <>
                      অর্ডার নিশ্চিত করুন
                      <Send
                        size={22}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

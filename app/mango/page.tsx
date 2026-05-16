"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getProducts, getCMSByKey } from "@/lib/api";
import MangoHero from "@/components/mango/MangoHero";
import MangoCarousel from "@/components/mango/MangoCarousel";
import MangoStory from "@/components/mango/MangoStory";
import MangoCheckout from "@/components/mango/MangoCheckout";

export default function MangoLandingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, cmsRes] = await Promise.all([
          getProducts(),
          getCMSByKey("mango_landing")
        ]);
        
        // Filter only mango products
        const mangoProducts = (productsRes.data.products || []).filter(
          (p: any) => p.category === "mango" && p.isVisible !== false
        );
        setProducts(mangoProducts);
        
        if (cmsRes.data) {
          setCmsData(cmsRes.data.value);
        }
      } catch (error) {
        console.error("Failed to fetch mango landing data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-primary font-bold animate-pulse">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <MangoHero data={cmsData?.hero} />
      <MangoCarousel images={cmsData?.carousel} />
      <MangoStory data={cmsData?.story} />
      <MangoCheckout packages={products} cmsData={cmsData?.checkout} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

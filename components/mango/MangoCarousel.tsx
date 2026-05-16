"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MangoCarousel({ images }: { images: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultImages = [
    { url: "/fresh_mangoes_hero.png", alt: "Fresh Mangoes 1" },
    { url: "/fresh_lychees_hero.png", alt: "Orchard View" },
  ];

  const displayImages = images?.length > 0 ? images : defaultImages;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
             আমাদের বাগানের চিত্র
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative group">
          <div className="relative h-[400px] md:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={displayImages[currentIndex].url}
                  alt={displayImages[currentIndex].alt || "Mango Gallery"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                   <p className="text-lg font-bold opacity-80 mb-2">গ্যালারি {currentIndex + 1}/{displayImages.length}</p>
                   <h4 className="text-2xl md:text-4xl font-black">{displayImages[currentIndex].alt}</h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur shadow-xl rounded-full flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur shadow-xl rounded-full flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-10 h-3 bg-primary" : "w-3 h-3 bg-nature-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

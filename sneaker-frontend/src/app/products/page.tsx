"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";

export default function ProductsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-[1800px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter">
            Full <span className="text-[#CCFF00]">Inventory.</span>
          </h1>
          
          <div className="relative w-full md:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH_REGISTRY..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 py-5 pl-16 pr-6 rounded-full font-black uppercase italic text-xs focus:border-[#CCFF00] outline-none transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex gap-4 mb-20 flex-wrap">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-widest border-2 transition-all ${
                activeCategory === cat ? "bg-[#CCFF00] border-[#CCFF00] text-black" : "border-white/10 text-zinc-500 hover:border-[#CCFF00]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-32">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
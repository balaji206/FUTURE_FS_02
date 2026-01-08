"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Zap, Target, ArrowLeft, 
  Ruler, Activity, Cpu, Heart 
} from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";
import Link from 'next/link';
interface ProductViewProps {
  product: any;
}

export default function ProductView({ product }: ProductViewProps) {
  const { addToCart, setView } = useAppContext();

  const handleBack = () => {
    if (typeof setView === 'function') {
      setView('/');
    }
  };

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 relative overflow-hidden selection:bg-[#CCFF00] selection:text-black">
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- TOP NAVIGATION (Reduced size) --- */}
        <Link href='/home'>
        <button 
          onClick={handleBack} 
          className="group flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-[#CCFF00] mb-12 transition-all italic"
        >
          <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Return_Registry_01</span>
        </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          {/* --- LEFT COLUMN: DATA TERMINAL --- */}
          <div className="space-y-8 order-2 lg:order-1">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#CCFF00]" />
                <span className="text-[#CCFF00] text-[10px] font-black uppercase tracking-[0.4em] italic">Archive_Spec_V4</span>
              </div>

              {/* Reduced Header Size: From 9xl to 7xl */}
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                {product.brand} <br />
                <span className="text-[#CCFF00] drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">{product.name}</span>
              </h1>
              
              <p className="text-2xl font-black italic text-white/80 tracking-tight">
                ₹{product.price.toLocaleString()}
              </p>
            </header>

            {/* Reduced Description Size */}
            <p className="text-zinc-500 text-base leading-relaxed italic font-medium border-l border-[#CCFF00]/20 pl-6 max-w-lg">
              {product.description || "Deconstructing movement to its base elements. High-fidelity performance meets industrial aesthetics."}
            </p>

            {/* --- TECHNICAL SPECS GRID (Tighter Padding) --- */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
               {[
                 { icon: Zap, label: "Response", val: "Maximum" },
                 { icon: Ruler, label: "Precision", val: "0.01mm" },
                 { icon: Activity, label: "Impact", val: "99.1%" },
                 { icon: Cpu, label: "Module", val: "A-Grade" }
               ].map((spec, i) => (
                 <div key={i} className="p-4 bg-white/[0.02] border border-white/5 group hover:border-[#CCFF00]/30 transition-all">
                    <spec.icon size={16} className="text-[#CCFF00] mb-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{spec.label}</p>
                    <p className="text-lg font-black italic uppercase text-white mt-0.5 group-hover:text-[#CCFF00] transition-colors">{spec.val}</p>
                 </div>
               ))}
            </div>

            {/* --- ACTIONS (Scaled Down) --- */}
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => addToCart(product)}
                className="group relative flex-1 bg-[#CCFF00] text-black h-14 rounded-xl flex items-center justify-center gap-3 overflow-hidden shadow-[0_10px_30px_rgba(204,255,0,0.2)] active:scale-95 transition-all"
              >
                <ShoppingCart size={18} strokeWidth={3} />
                <span className="font-black uppercase italic tracking-[0.15em] text-[11px]">Initialize_Transfer</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
              
              <button className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: VISUAL AREA (Scaled Down) --- */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
             
             {/* Background Text (Scaled down to 12vw) */}
             <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                <h2 className="text-[15vw] lg:text-[12vw] font-black italic uppercase leading-none text-transparent" 
                    style={{ WebkitTextStroke: '1px rgba(204,255,0,0.04)' }}>
                    APEX
                </h2>
             </div>

             {/* The Shoe Container (Reduced size) */}
             <div className="relative group w-full max-w-2xl p-12">
                {/* Visual Brackets (Smaller) */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#CCFF00]/20" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#CCFF00]/20" />
                
                {/* Image: Scale reduced to 0.95 and rotation refined */}
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  animate={{ opacity: 1, scale: 0.95, rotate: -20, y: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1],
                    y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } 
                  }}
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(204,255,0,0.2)] relative z-10" 
                />

                {/* Scanning Animation */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-[#CCFF00]/10 z-20 pointer-events-none"
                />

                {/* Metadata Badge (More subtle) */}
                <div className="absolute bottom-6 left-6 hidden md:block border-l border-white/5 pl-4 py-1">
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 italic">Sector_Deployment</p>
                   <p className="text-[10px] font-black italic uppercase text-white tracking-widest">Global_Rel // 2026</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
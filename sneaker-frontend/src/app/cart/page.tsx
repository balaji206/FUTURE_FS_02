"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, Minus, Plus, Lock, ShieldCheck } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, updateQuantity } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Empty State Component
  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-40 px-6 bg-[#050505] flex flex-col items-center justify-center">
        <div className="py-20 px-10 text-center border-2 border-dashed border-zinc-900 rounded-[3rem] max-w-2xl w-full">
          <p className="text-zinc-700 font-black uppercase tracking-[0.4em] text-sm italic mb-8">
            The_Vault_is_Empty // Registry_Offline
          </p>
          <Link href="/products">
            <button className="text-[#CCFF00] font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2 mx-auto">
              Initialize_Archive_Search <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 bg-[#050505] selection:bg-[#CCFF00] selection:text-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <Link href="/products" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#CCFF00] mb-6 hover:text-white transition-colors italic">
              <ArrowRight className="rotate-180" size={14} /> Return_to_Catalog
            </Link>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
              Your <span className="text-[#CCFF00]">Vault.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-zinc-600 font-black uppercase text-[10px] tracking-[0.3em] mb-4">
            <ShieldCheck size={16} className="text-[#CCFF00]" />
            Secure_Registry_V4
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Cart Items (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="popLayout">
              {cart.map((item: any) => (
                <motion.div 
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col md:flex-row gap-10 items-center border-b border-white/5 pb-10 group"
                >
                  {/* Image with Grayscale effect */}
                  <div className="w-40 h-48 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      alt={item.name} 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-[0.4em]">{item.brand}</span>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{item.name}</h3>
                    <p className="text-zinc-600 font-bold text-xl italic tracking-tight">₹{item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls (Task 2 Requirement) */}
                  <div className="flex items-center gap-6 bg-white/[0.03] border border-white/5 px-6 py-3 rounded-full">
                    <button 
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="text-zinc-500 hover:text-[#CCFF00] transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-black text-white italic w-4 text-center">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="text-zinc-500 hover:text-[#CCFF00] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button 
                    onClick={() => removeFromCart(item.cartId)} 
                    className="p-4 text-zinc-800 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={24} strokeWidth={1.5} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Summary & Checkout (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] space-y-10">
              <div>
                <span className="text-zinc-700 font-black uppercase text-[10px] tracking-[0.5em] italic">Payload_Assessment</span>
                <p className="text-6xl font-black italic tracking-tighter mt-4 text-white">
                  ₹{totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                    <span>Tax_Processing</span>
                    <span>₹0.00</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                    <span>Shipping_Priority</span>
                    <span className="text-[#CCFF00]">FREE_ACCESS</span>
                 </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-[#CCFF00] text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(204,255,0,0.2)] active:scale-95 group">
                  <Lock size={18} strokeWidth={2.5} />
                  Initialize_Acquisition
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <p className="text-[9px] text-center text-zinc-700 font-black uppercase tracking-[0.3em] italic">
                Encrypted_Gateway // Sector_Access_Only
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
// Using your imported local assets
import shoe from '../../public/show.png';
import gree from '../../public/greshoe.png';

const ASSETS = {
  logoJordan: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png",
  logoNike: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
  
  thumbPurple: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=100&auto=format&fit=crop",
  thumbGreen: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=100&auto=format&fit=crop",
  thumbRed: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop", 
};

const JordanLandingPageGreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative selection:bg-emerald-500 selection:text-black">
      
      {/* ================= NAVIGATION ================= */}
      

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="relative h-[calc(100vh-100px)] w-full">
        
        {/* --- LAYER 1: Background Typography --- */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none transform -translate-y-16">
          <h1 className="text-[18vw] leading-none font-black italic uppercase flex items-baseline tracking-tighter">
            <span className="text-[#CCFF00] mr-4 opacity-80">Jump</span>
            <span className="text-[#0d1a14]">man</span>
          </h1>
        </div>

        {/* --- LAYER 1.5: Subtle Background Lines --- */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q 400,300 800,100 T 1600,100" stroke="#10b981" strokeWidth="1" fill="none" />
          <path d="M-200,400 Q 200,600 600,400 T 1400,400" stroke="#064e3b" strokeWidth="1" fill="none" />
        </svg>

        {/* --- LAYER 2: The Main Shoe --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
          <div className="relative w-full max-w-4xl">
            <img 
              src={gree.src} 
              alt="Jordan Jumpman Green" 
              className="w-[85%] mx-auto transform -rotate-[-5deg] -translate-y-12 translate-x-8 drop-shadow-[0_45px_50px_rgba(16,185,129,0.2)] pointer-events-auto"
            />
            <div className="absolute left-4 bottom-20">
               <p className="text-xs tracking-[0.5em] uppercase font-bold text-emerald-500/50">Performance Gear</p>
            </div>
          </div>
        </div>

        {/* --- LAYER 3: Product Details (Price and Title) --- */}
        <div className="absolute right-[12%] top-[45%] -translate-y-1/2 z-40 text-right w-80">
          <div className="flex justify-end mb-4">
            <span className="bg-[#B8E601] text-black text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-wider inline-block">New Arrival</span>
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-tight leading-[0.9] mb-3">
            Jordan <br /> Jumpman <span className="text-[#A3CC01]">2026 GS</span>
          </h2>
          
          <div className="flex items-baseline justify-end space-x-2">
            <span className="text-5xl font-black text-[#B8E601] leading-none">150$</span>
          </div>
        </div>

        {/* --- LAYER 4: Pagination --- */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-5 z-40">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === 2 ? 'bg-emerald-500 scale-150 shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />
           ))}
        </div>
      </main>

      {/* ================= FOOTER ACTIONS (Aligned like image) ================= */}
      <footer className="absolute bottom-12 w-full px-50 flex justify-between items-end z-50">
        
        {/* Left Side: Buttons */}
        <div className="flex space-x-5">
          <button className="bg-[#CCFF00] text-black h-14 px-12 font-black uppercase text-[12px] tracking-wider hover:bg-[#B8E601] transition-all">
            Add to Cart
          </button>
          <button className="border border-white/30 text-white h-14 px-12 font-black uppercase text-[12px] tracking-wider hover:bg-white hover:text-black transition-all">
            Buy Now
          </button>
        </div>

        {/* Right Side: Inspiration Text */}
        <div className="max-w-md text-left">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-white">Inspiration</h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 font-medium">
            Inspired by the design of the latest Air Jordan game shoe, 
            the Jordan Jumpman 2021 helps up-and-coming players level up their game.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JordanLandingPageGreen;
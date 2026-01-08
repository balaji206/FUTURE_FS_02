"use client";
import { ShieldAlert, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Red Alert Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8 relative z-10"
      >
        <div className="inline-flex p-8 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 animate-pulse shadow-[0_0_60px_rgba(220,38,38,0.15)]">
          <ShieldAlert size={64} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">
            Access_<span className="text-red-600">Denied.</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-zinc-600 font-mono text-[10px] tracking-[0.4em] uppercase">
            <Terminal size={12} /> Registry_Clearance_Error // 403
          </div>
          <p className="text-zinc-500 text-[11px] font-medium leading-relaxed uppercase tracking-widest px-4">
            Critical Failure: Your credentials do not possess the required clearance for this secure sector. Incident has been logged.
          </p>
        </div>

        <Link href="/">
          <button className="group relative mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all overflow-hidden italic">
             <span className="relative z-10 flex items-center gap-3">
               <ArrowLeft size={14} /> Return_to_Main_Terminal
             </span>
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
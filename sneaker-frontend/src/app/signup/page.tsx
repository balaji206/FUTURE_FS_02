"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Cpu, Zap, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [role, setRole] = useState("operative"); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Input States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // Map the UI "operative/merchant" to internal "buyer/seller"
  const mappedRole = role === "operative" ? "buyer" : "seller";

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, role: mappedRole }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (err) {
    console.error("System_Offline", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden selection:bg-[#CCFF00] selection:text-black">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/5 blur-[120px] rounded-full" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[420px] bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative z-10">
        <div className="h-32 w-full bg-[#111] relative overflow-hidden border-b border-white/5">
          <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600" className="w-full h-full object-cover opacity-20 grayscale" alt="Header" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <div className="absolute bottom-4 right-6 flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-full">
            <Cpu size={12} className="text-[#CCFF00]" />
            <span className="text-[9px] font-black text-[#CCFF00] uppercase tracking-widest">Protocol_V4</span>
          </div>
        </div>

        <div className="p-10 pt-6">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-1">Create <br /> <span className="text-[#CCFF00]">Identity.</span></h1>
          <p className="text-zinc-600 text-[9px] font-black tracking-[0.4em] uppercase mb-8 italic">Registry_Sector_01</p>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-1">Clearance_Level</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
                <button type="button" onClick={() => setRole("operative")} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all italic ${role === 'operative' ? 'bg-[#CCFF00] text-black shadow-lg' : 'text-zinc-500'}`}>
                  <User size={12} /> Operative
                </button>
                <button type="button" onClick={() => setRole("merchant")} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all italic ${role === 'merchant' ? 'bg-[#CCFF00] text-black shadow-lg' : 'text-zinc-500'}`}>
                  <Zap size={12} /> Merchant
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-1">Designation</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#CCFF00]" size={16} />
                <input required type="text" placeholder="FULL_NAME" className="w-full bg-white/[0.02] border border-white/5 py-3.5 pl-12 pr-4 rounded-xl focus:border-[#CCFF00]/30 outline-none text-sm" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-1">Comm_Link</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#CCFF00]" size={16} />
                <input required type="email" placeholder="EMAIL_REGISTRY" className="w-full bg-white/[0.02] border border-white/5 py-3.5 pl-12 pr-4 rounded-xl focus:border-[#CCFF00]/30 outline-none text-sm" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-1">Passkey</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#CCFF00]" size={16} />
                <input required type="password" placeholder="SECURE_PHRASE" className="w-full bg-white/[0.02] border border-white/5 py-3.5 pl-12 pr-4 rounded-xl focus:border-[#CCFF00]/30 outline-none text-sm" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-6 bg-[#CCFF00] text-black font-black py-5 rounded-2xl active:scale-95 transition-all text-xs tracking-[0.2em] uppercase italic flex items-center justify-center">
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Initialize_Registry_Entry"}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] italic">
              Already verified? <Link href="/login" className="ml-2 text-[#CCFF00] hover:text-white transition-colors underline underline-offset-4">Access_Existing_Vault</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
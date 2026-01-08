"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Zap, Loader2 } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

export default function LoginPage() {
  const [type, setType] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAppContext();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // Map the UI "customer/seller" to internal "buyer/seller"
  const mappedRole = type === "customer" ? "buyer" : "seller";

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: mappedRole }),
    });

    const data = await response.json();

    if (response.ok) {
      document.cookie = `clearance_token=${data.token}; path=/; max-age=7200`;
      document.cookie = `user_role=${data.user.role}; path=/; max-age=7200`;
      login(data.user);
      router.push(data.user.role === "seller" ? "/profile/inventory" : "/");
    } else {
      // This will now catch the mismatch error
      alert(data.error); 
    }
  } catch (err) {
    console.error("Connection_Error", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden selection:bg-[#CCFF00] selection:text-black">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px] bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-10 relative">
        <div className="h-40 w-full bg-[#111] relative overflow-hidden border-b border-white/5">
          <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600" className="w-full h-full object-cover opacity-30 grayscale transition-transform duration-1000 hover:scale-105" alt="Header" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[1px] bg-[#CCFF00]/20 z-20 pointer-events-none" />

          <div className="absolute bottom-6 left-8 right-8 flex bg-black/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            <button type="button" onClick={() => setType("customer")} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 italic ${type === "customer" ? "bg-[#CCFF00] text-black" : "text-zinc-500"}`}>
              <User size={14} strokeWidth={2.5} /> Operative
            </button>
            <button type="button" onClick={() => setType("seller")} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 italic ${type === "seller" ? "bg-[#CCFF00] text-black" : "text-zinc-500"}`}>
              <Zap size={14} strokeWidth={2.5} /> Merchant
            </button>
          </div>
        </div>

        <div className="p-10 pt-8">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-1">System <span className="text-[#CCFF00]">Login.</span></h1>
          <p className="text-zinc-600 text-[9px] font-black tracking-[0.4em] uppercase mb-8 italic">Authorized_Personnel_Only</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#CCFF00] transition-colors" size={18} />
              <input required type="email" placeholder="EMAIL_REGISTRY" className="w-full bg-white/[0.02] border border-white/5 py-4 pl-12 pr-4 rounded-xl focus:border-[#CCFF00]/30 focus:bg-white/[0.04] outline-none text-sm transition-all italic font-medium" 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#CCFF00] transition-colors" size={18} />
              <input required type="password" placeholder="PASSKEY" className="w-full bg-white/[0.02] border border-white/5 py-4 pl-12 pr-4 rounded-xl focus:border-[#CCFF00]/30 focus:bg-white/[0.04] outline-none text-sm transition-all italic font-medium" 
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#CCFF00] text-black font-black py-5 rounded-2xl mt-6 flex items-center justify-center gap-3 text-xs tracking-[0.2em] shadow-[0_20px_50px_rgba(204,255,0,0.2)] active:scale-95 transition-all uppercase italic group">
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Access_Vault <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] italic">New_Registry? <Link href="/signup" className="text-[#CCFF00] hover:underline ml-2">Create_ID</Link></p>
          </div>
        </div>
      </motion.div>
    </div >
  );
}
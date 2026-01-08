"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleOverride = (e: React.FormEvent) => {
  e.preventDefault();
  setIsVerifying(true);

  setTimeout(() => {
    if (passkey === "507706") {
      // THE KEY: Set cookies so Middleware can see them
      // path=/ is required so the cookie is available on all pages
      document.cookie = "clearance_token=authorized_v4; path=/; max-age=3600";
      document.cookie = "user_role=admin; path=/; max-age=3600";

      // Small delay to ensure browser registers cookie before redirect
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setIsVerifying(false);
    }
  }, 1000);
};

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {/* Red Warning Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-[380px] text-center relative z-10 px-6">
        <div className={`inline-flex p-5 rounded-full mb-8 transition-colors ${error ? 'bg-red-600 text-white animate-bounce' : 'bg-red-600/10 text-red-600'}`}>
          <ShieldAlert size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl font-black uppercase italic text-white tracking-[0.3em] mb-2">Master_Control</h1>
        <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.5em] mb-10">Restricted_Access // Level_Omega</p>
        
        <form onSubmit={handleOverride} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-900 group-focus-within:text-red-500" size={16} />
            <input 
              type="password" 
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="ENTER_SYSTEM_KEY" 
              className={`w-full bg-red-950/10 border ${error ? 'border-red-600' : 'border-red-900/30'} p-4 pl-12 rounded-xl text-white outline-none focus:border-red-600 transition-all font-mono placeholder:text-red-900/50`} 
            />
          </div>

          <button 
            disabled={isVerifying}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-900 py-5 rounded-xl font-black text-white text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,0,0,0.15)]"
          >
            {isVerifying ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>OVERRIDE & ENTER <ArrowRight size={14} /></>
            )}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-[10px] font-black text-red-500 uppercase tracking-widest italic animate-pulse">
            Invalid_Key // Access_Logged
          </p>
        )}
      </div>
    </div>
  );
}
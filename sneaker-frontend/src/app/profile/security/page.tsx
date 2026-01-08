"use client";
import { ShieldAlert, Key, Fingerprint } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-black uppercase italic tracking-tighter">Security_Node</h2>
      
      <div className="space-y-4">
        <SecurityOption icon={Fingerprint} title="Biometric_Lock" status="ENABLED" desc="Require fingerprint scan for high-value vault acquisitions." />
        <SecurityOption icon={Key} title="Registry_Encryption" status="AES-256" desc="All deployment logs are encrypted via quantum-safe keys." />
        <SecurityOption icon={ShieldAlert} title="Two-Factor_Sync" status="ACTIVE" desc="Receive mobile clearance codes for every login session." />
      </div>
    </div>
  );
}

function SecurityOption({ icon: Icon, title, status, desc }: any) {
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center gap-8">
      <div className="p-4 bg-white/[0.03] rounded-2xl text-[#CCFF00] border border-white/5">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-1">
          <h3 className="text-lg font-black uppercase italic tracking-widest">{title}</h3>
          <span className="px-2 py-0.5 bg-[#CCFF00]/10 text-[#CCFF00] text-[8px] font-black rounded-md">{status}</span>
        </div>
        <p className="text-zinc-500 text-[11px] font-medium italic">{desc}</p>
      </div>
    </div>
  );
}
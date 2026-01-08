"use client";

import React, { useState } from "react";
import { 
  Settings, Monitor, Bell, Shield, 
  Globe, Cpu, Eye, Save 
} from "lucide-react";

export default function SettingsPage() {
  const [industrialMode, setIndustrialMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* SECTION 1: INTERFACE CONFIG */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Monitor size={18} className="text-[#CCFF00]" />
          <h2 className="text-xl font-black uppercase italic tracking-widest">Interface_Logic</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <SettingToggle 
            title="Industrial_Grid_Overlay" 
            desc="Render blueprint grid background across all sectors." 
            active={industrialMode}
            onToggle={() => setIndustrialMode(!industrialMode)}
          />
          <SettingToggle 
            title="Telemetry_Animations" 
            desc="Enable scanning lines and motion telemetry." 
            active={true}
          />
          <SettingToggle 
            title="High_Contrast_Mode" 
            desc="Force absolute noir backgrounds for lab precision." 
            active={true}
          />
        </div>
      </section>

      {/* SECTION 2: SYSTEM PREFERENCES */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Cpu size={18} className="text-[#CCFF00]" />
          <h2 className="text-xl font-black uppercase italic tracking-widest">System_Protocols</h2>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
          <SettingInput label="System_Language" value="English_US // Sector_Alpha" />
          <SettingInput label="Currency_Display" value="INR // ₹" />
          <SettingInput label="Time_Zone" value="GMT +5:30 (IST)" />
        </div>
      </section>

      {/* SECTION 3: DEPLOYMENT LOGS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell size={18} className="text-[#CCFF00]" />
          <h2 className="text-xl font-black uppercase italic tracking-widest">Comm_Link_Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <SettingToggle 
            title="Deployment_Alerts" 
            desc="Instant notification upon asset transition." 
            active={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
          <SettingToggle 
            title="Security_Pings" 
            desc="Notify on unauthorized registry access attempts." 
            active={true}
          />
        </div>
      </section>

      {/* SAVE ACTION */}
      <div className="pt-10 flex justify-end">
        <button className="group relative bg-[#CCFF00] text-black px-10 py-4 rounded-xl font-black uppercase italic text-[11px] tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(204,255,0,0.2)]">
          <Save size={16} /> Update_Registry_Config
        </button>
      </div>

    </div>
  );
}

// --- SHARED UI COMPONENTS ---

function SettingToggle({ title, desc, active, onToggle }: any) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-[#CCFF00]/20 transition-all">
      <div className="space-y-1">
        <h3 className="text-sm font-black uppercase italic tracking-wider text-white group-hover:text-[#CCFF00] transition-colors">{title}</h3>
        <p className="text-[10px] text-zinc-500 font-medium italic uppercase tracking-tighter">{desc}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${active ? 'bg-[#CCFF00] border-[#CCFF00]' : 'bg-zinc-900 border-zinc-800'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${active ? 'left-7 bg-black' : 'left-1 bg-zinc-600'}`} />
      </button>
    </div>
  );
}

function SettingInput({ label, value }: any) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{label}</span>
      <div className="flex items-center gap-3 cursor-pointer">
        <span className="text-xs font-black uppercase italic text-zinc-300">{value}</span>
        <Globe size={14} className="text-[#CCFF00] opacity-30" />
      </div>
    </div>
  );
}
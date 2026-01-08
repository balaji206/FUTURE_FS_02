"use client";

import React from "react";
import { User, Mail, MapPin, Activity } from "lucide-react";

export default function ProfileOverview() {
  const user = {
    name: "OPERATIVE_77",
    email: "alpha.v4@apex-labs.com",
    credits: 4500
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Data Block */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CCFF00]">Core_Telemetry</h3>
          <div className="space-y-6">
            <DataField label="Designation" value={user.name} icon={User} />
            <DataField label="Comm_Link" value={user.email} icon={Mail} />
            <DataField label="Location" value="Sector_7G / IN" icon={MapPin} />
          </div>
        </div>

        {/* Registry Stats */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CCFF00]">Registry_Stats</h3>
          <div className="grid grid-cols-1 gap-4 mt-6">
             <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Available_Credits</p>
                <p className="text-4xl font-black italic uppercase text-[#CCFF00]">₹{user.credits}</p>
             </div>
             <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total_Deployments</p>
                <p className="text-4xl font-black italic uppercase text-white">12</p>
             </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CCFF00]">Recent_Activity</h3>
          <Activity size={16} className="text-zinc-700" />
        </div>
        <div className="space-y-4">
          <ActivityItem log="Authorized access to Vault_Main" time="2h ago" />
          <ActivityItem log="Deployment SKU_001 confirmed" time="5h ago" />
          <ActivityItem log="Credits synced with Central_Node" time="1d ago" />
        </div>
      </div>
    </div>
  );
}

function DataField({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/[0.03] border border-white/5 flex items-center justify-center rounded-lg">
        <Icon size={16} className="text-[#CCFF00] opacity-50" />
      </div>
      <div>
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-black italic uppercase text-zinc-300">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ log, time }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5 text-[11px] font-black uppercase italic">
      <span className="text-zinc-400">{log}</span>
      <span className="text-zinc-700 tracking-tighter">{time}</span>
    </div>
  );
}
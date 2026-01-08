"use client";
import React from "react";
import { 
  Activity, Users, Package, AlertTriangle, 
  Terminal, Database, HardDrive, RefreshCw 
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-8 selection:bg-red-600">
      <div className="max-w-[1600px] mx-auto space-y-12">
        
        {/* --- TOP STATUS BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">System_Admin_Terminal</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">Command <span className="text-red-600">Center.</span></h1>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <RefreshCw size={12} /> Sync_Registry
            </button>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2">
              <AlertTriangle size={12} /> EMERGENCY_WIPE
            </button>
          </div>
        </div>

        {/* --- VITAL STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total_Operatives" val="1,248" icon={Users} trend="+12%" />
          <StatCard label="Asset_Inventory" val="5,092" icon={Package} trend="NOMINAL" />
          <StatCard label="System_Core_Temp" val="42°C" icon={Activity} trend="STABLE" />
          <StatCard label="Database_Payload" val="1.4 TB" icon={Database} trend="94%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- SYSTEM LOGS (8 Cols) --- */}
          <div className="lg:col-span-8 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Global_Telemetry_Logs</h3>
              <Terminal size={16} className="text-zinc-700" />
            </div>
            
            <div className="space-y-4 font-mono text-[11px]">
              <LogItem time="14:22:01" msg="Registry_Entry: Operative_88 acquisition confirmed" status="SUCCESS" />
              <LogItem time="14:20:55" msg="Warning: Unauthorized attempt at Sector_7G" status="BLOCKED" critical />
              <LogItem time="14:15:30" msg="System sync: Node_Alpha connected" status="ONLINE" />
              <LogItem time="14:10:12" msg="Merchant_99 updated inventory SKU_556" status="UPDATED" />
            </div>
          </div>

          {/* --- SERVER STATUS (4 Cols) --- */}
          <div className="lg:col-span-4 p-8 bg-red-600/[0.03] border border-red-600/10 rounded-[2rem] space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Hardware_Health</h3>
            
            <div className="space-y-6">
              <HealthBar label="CPU_LOAD" percent={45} />
              <HealthBar label="MEMORY_USAGE" percent={78} />
              <HealthBar label="NETWORK_LATENCY" percent={12} />
            </div>

            <div className="pt-6 border-t border-red-600/10">
               <div className="flex items-center gap-4 text-red-600 font-black uppercase italic text-[10px]">
                 <HardDrive size={18} />
                 <span>CORE_SERVER: SINGAPORE_01</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, val, icon: Icon, trend }: any) {
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-red-600/30 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/[0.03] rounded-xl text-zinc-500 group-hover:text-red-600 transition-colors">
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-black text-zinc-600 italic">{trend}</span>
      </div>
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-black italic uppercase text-white">{val}</p>
    </div>
  );
}

function LogItem({ time, msg, status, critical }: any) {
  return (
    <div className="flex gap-6 py-3 border-b border-white/5 last:border-0 items-center">
      <span className="text-zinc-700">{time}</span>
      <span className="flex-1 text-zinc-400 italic">{msg}</span>
      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${critical ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
        {status}
      </span>
    </div>
  );
}

function HealthBar({ label, percent }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
        <span className="text-zinc-500">{label}</span>
        <span className="text-white">{percent}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-red-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
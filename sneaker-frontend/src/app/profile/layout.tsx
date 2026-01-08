"use client";

import React from "react";
import { User, Zap, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext"; // Import your context

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAppContext(); // Get user data from context

  // Fallback for safety during loading
  const displayName = user?.name || "RESTORING_ID...";
  const isSeller = user?.role === "seller";

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-2 w-2 rounded-full animate-pulse ${isSeller ? 'bg-[#CCFF00]' : 'bg-blue-500'}`} />
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] italic">
                Registry_Type // {isSeller ? "Commercial_Asset_Manager" : "Standard_Operative"}
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              {isSeller ? "Merchant" : "Operative"} <br /> 
              <span className={isSeller ? "text-[#CCFF00]" : "text-white"}>Terminal.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Access_ID</p>
              {/* DISPLAYING USER NAME HERE */}
              <p className="text-lg font-black italic uppercase text-white tracking-widest">{displayName}</p>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isSeller ? 'bg-[#CCFF00] text-black' : 'bg-zinc-800 text-white'}`}>
              {isSeller ? <Zap size={28} /> : <User size={28} />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-2">
            <nav className="flex flex-col gap-2">
              <SideLink href="/profile" label="Overview" active={pathname === "/profile"} />
              {isSeller ? (
                <SideLink href="/profile/inventory" label="Manage_Inventory" active={pathname === "/profile/inventory"} />
              ) : (
                <SideLink href="/profile/orders" label="Order_History" active={pathname === "/profile/orders"} />
              )}
              <SideLink href="/profile/security" label="Security_Protocols" active={pathname === "/profile/security"} />
              <SideLink href="/profile/settings" label="System_Config" active={pathname === "/profile/settings"} />
            </nav>

            <button onClick={logout} className="w-full flex items-center justify-between px-6 py-4 mt-12 border border-red-900/20 text-red-500 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-500/10 transition-all rounded-xl">
              Log_Out <LogOut size={14} />
            </button>
          </aside>

          <div className="lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

const SideLink = ({ href, label, active }: any) => (
  <Link href={href}>
    <div className={`px-6 py-4 rounded-xl font-black uppercase italic text-[11px] tracking-[0.2em] transition-all border ${active ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'bg-transparent text-zinc-500 border-white/5 hover:border-[#CCFF00]/30 hover:text-white'}`}>
      {label}
    </div>
  </Link>
);
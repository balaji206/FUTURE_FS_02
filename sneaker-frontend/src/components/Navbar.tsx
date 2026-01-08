"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Zap, User, LogOut, Search } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

const ASSETS = {
  logoJordan: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png",
};

export default function Navbar() {
  const { user, cart, logout } = useAppContext();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <nav className="fixed top-0 w-full z-[100] px-8 py-6 mix-blend-difference text-white">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between relative">
        
        {/* --- LEFT SECTOR: BRANDING --- */}
        <div className="flex items-center gap-6 flex-1">
          {!isAuthPage && (
            <div className="flex items-center space-x-6 filter invert opacity-80 hover:opacity-100 transition-opacity">
              <img src={ASSETS.logoJordan} alt="Jordan" className="h-7 w-auto" />
            </div>
          )}
        </div>

        {/* --- CENTER SECTOR: MAIN LOGO --- */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-3xl font-black italic tracking-tighter uppercase group">
            SNKR<span className="text-[#CCFF00] group-hover:animate-pulse">.</span>
          </Link>
        </div>

        {/* --- RIGHT SECTOR: ACTIONS --- */}
        <div className="flex items-center justify-end gap-6 flex-1">
          {!isAuthPage && (
            <>
              {/* Search Registry - Only if needed */}
              <Search size={20} className="cursor-pointer hover:text-[#CCFF00] transition-colors hidden md:block" strokeWidth={2.5} />

              {/* Only Buyers see the Cart */}
              {user?.role === 'buyer' && (
                <Link href="/cart" className="relative group hover:scale-110 transition-transform">
                  <ShoppingBag size={22} strokeWidth={2} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#CCFF00] text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Sellers see a "Dashboard" shortcut */}
              {user?.role === 'seller' && (
                <Link href="/profile/inventory" className="text-[#CCFF00] flex items-center gap-2 group">
                  <Zap size={18} className="group-hover:animate-bounce" />
                  <span className="text-[10px] font-black uppercase italic tracking-widest hidden lg:block">Live_Terminal</span>
                </Link>
              )}

              {/* Identity Hub */}
              <Link href="/profile" title="Identity Terminal">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900 overflow-hidden hover:border-[#CCFF00] transition-colors">
                  <User size={18} className="text-[#CCFF00]" />
                </div>
              </Link>

              {/* Terminate Session */}
              <button 
                onClick={logout} 
                className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                title="Disconnect System"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
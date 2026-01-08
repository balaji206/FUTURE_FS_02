"use client";
import { Upload, Plus, Hash, Tag } from "lucide-react";

export default function AddProduct() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Inventory <span className="text-blue-600">Control</span></h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em] mt-2">Add New Strategic Asset</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Upload Area */}
          <div className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center group hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="p-6 bg-blue-600/10 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
                <Upload size={32} />
            </div>
            <p className="mt-4 font-bold text-sm text-gray-500 uppercase tracking-widest">Upload Asset Image</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> Product Title
              </label>
              <input type="text" className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-2xl outline-none focus:border-blue-500/50" placeholder="Air Max Alpha v2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> Price (INR)
                </label>
                <input type="number" className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-2xl outline-none focus:border-blue-500/50" placeholder="12,000" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Plus size={12} /> Stock
                </label>
                <input type="number" className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-2xl outline-none focus:border-blue-500/50" placeholder="50" />
              </div>
            </div>

            <button className="w-full bg-blue-600 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/20 hover:translate-y-[-2px] transition-all">
                Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
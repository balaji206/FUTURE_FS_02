"use client";
import { useState, useEffect } from "react";
import { Upload, Plus, Package, BarChart3, Loader2, Globe } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

export default function SellerDashboard() {
  const { user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600" // Default for now
  });

  // Handle Form Submission
  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sellerId: user?._id }),
      });

      if (response.ok) {
        alert("Asset_Registry_Updated");
        setFormData({ name: "", description: "", price: "", stock: "", image: formData.image });
        // Refresh listings (logic would go here)
      }
    } catch (err) {
      console.error("Transmission_Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <span className="text-[#CCFF00] font-black text-xs uppercase tracking-[0.3em] italic">
              Merchant_Command // {user?.name || "RESTORING_NODE"}
            </span>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mt-1">
              Inventory <span className="text-[#CCFF00]">Management</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest italic">
            <Globe size={14} className="text-[#CCFF00]" /> Server_Status: Nominal
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: ADD ASSET FORM (5 Cols) --- */}
          <form onSubmit={handleAddAsset} className="lg:col-span-5 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 blur-3xl rounded-full" />
              
              <h2 className="text-lg font-black uppercase italic mb-6 flex items-center gap-2 relative z-10">
                <Package size={20} className="text-[#CCFF00]" /> General_Payload
              </h2>
              
              <div className="space-y-4 relative z-10">
                <input required type="text" placeholder="Asset Name" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl outline-none focus:border-[#CCFF00]/50 text-sm font-medium italic" />
                
                <textarea required placeholder="Technical Specifications" rows={3} 
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl outline-none focus:border-[#CCFF00]/50 text-sm font-medium italic" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input required type="number" placeholder="Price (₹)" 
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl outline-none focus:border-[#CCFF00]/50" />
                  
                  <input required type="number" placeholder="Stock Qty" 
                    value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl outline-none focus:border-[#CCFF00]/50" />
                </div>

                <button type="submit" disabled={isLoading} 
                  className="w-full bg-[#CCFF00] text-black font-black py-5 rounded-2xl active:scale-95 transition-all text-xs tracking-[0.2em] uppercase italic flex items-center justify-center gap-3">
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Plus size={16} strokeWidth={3} /> Initialize_Asset_Entry</>}
                </button>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center items-center group cursor-pointer hover:border-[#CCFF00]/40 transition-all border-dashed">
              <Upload size={32} className="text-[#CCFF00] mb-4" />
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-500">Upload_Asset_Media</p>
            </div>
          </form>

          {/* --- RIGHT: ACTIVE LISTINGS (7 Cols) --- */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-black uppercase italic tracking-tighter">Active_Listings</h2>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl flex gap-6 group hover:border-[#CCFF00]/30 transition-all cursor-pointer relative overflow-hidden">
                  <div className="w-24 h-24 bg-zinc-900 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                    <img src={`https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=200`} alt="Shoe" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] font-black text-[#CCFF00] uppercase italic">SKU_00{i}_V4</p>
                      <span className="text-[10px] font-black text-zinc-700">₹12,499</span>
                    </div>
                    <h3 className="text-lg font-black uppercase italic mb-2">Volt_Grip 97</h3>
                    <div className="flex gap-4 text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1"><Package size={10} /> 14 Units</span>
                      <span className="flex items-center gap-1"><BarChart3 size={10} /> 82 Sales</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
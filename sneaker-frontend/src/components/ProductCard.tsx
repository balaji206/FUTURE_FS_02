"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white/5 border border-white/5 rounded-[2.5rem] p-4 transition-all hover:bg-white/10 hover:border-white/20"
      >
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="mt-6 px-2">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.brand}</span>
          <h2 className="text-xl font-bold mt-1 text-white/90 group-hover:text-white truncate transition-colors">
            {product.name}
          </h2>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-2xl font-black">₹{product.price.toLocaleString()}</p>
            <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-blue-600 transition-colors">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
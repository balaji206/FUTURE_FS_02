"use client";

import React, { createContext, useContext, useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ShoppingBag, ArrowRight, Trash2, X, Plus, 
  Instagram, Twitter, Globe, Zap, Star, 
  Menu, Search, User, Sparkles, Ruler, Cpu, Activity,ShoppingCart,ArrowLeft,Heart
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductView from "../app/product/[id]/ProductView";
import redshoe from "../../public/red.png"
import yell from '../../public/yell.png'
import rose from '../../public/rose.png'
import pair from '../../public/pair.png'
import Link from 'next/link';
// --- 1. CONTEXT & STATE MANAGEMENT ---
const AppContext = createContext<any>(null);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [view, setView] = useState("home"); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // NEW: State to track which product is currently being viewed
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, { ...product, cartId: Math.random() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, totalPrice, 
      view, setView, isMenuOpen, setIsMenuOpen,
      selectedProduct, setSelectedProduct 
    }}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

const CATEGORIES = ["All", "Performance", "Lifestyle", "Limited"];
// --- 2. EXTENDED DATA (Volt Green Theme) ---
// --- 1. DATA (Fixed Image Reference) ---
const RECENT_DROPS = [
  { id: 1, name: "Volt_Grip 97", brand: "APEX", price: 24000, category: "Performance", image: yell.src },
  { id: 2, name: "Midnight_Neon", brand: "NOIR", price: 18500, category: "Lifestyle", image: redshoe.src },
  { id: 3, name: "Cyber_Tech Low", brand: "KINETIC", price: 12000, category: "Performance", image: rose.src },
  { id: 4, name: "Ghost_Spec Hi", brand: "PHANTOM", price: 32000, category: "Limited", image: pair.src },
];

const ALL_PRODUCTS = [
  ...RECENT_DROPS,
  { id: 5, name: "Volt_Apex 01", brand: "APEX", price: 21000, category: "Performance", image: yell.src },
  // FIX: Use .src if redshoe is a Next.js local import
  { id: 6, name: "Neon_Drift", brand: "KINETIC", price: 15500, category: "Lifestyle", image:  redshoe.src  },
  { id: 7, name: "Onyx_Edge", brand: "NOIR", price: 28000, category: "Limited", image: "https://images.unsplash.com/photo-1512374382149-4332c6c75d61?q=80&w=800" },
  { id: 8, name: "Synth_Runner", brand: "PHANTOM", price: 19000, category: "Lifestyle", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800" },
];

// --- 2. PRODUCT VIEW COMPONENT (Professional & Scaled) ---

const ASSETS = {
  logoJordan: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png",
  logoNike: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
  thumbPurple: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=100&auto=format&fit=crop",
  thumbGreen: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=100&auto=format&fit=crop",
  thumbRed: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop", 
};

// const Navbar = () => {
//   const { cart, setView, setIsMenuOpen } = useAppContext();
//   return (
//     <nav className="fixed top-0 w-full z-[100] px-6 py-6 mix-blend-difference text-white font-black uppercase italic tracking-tighter">
//       <div className="max-w-[1800px] mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-6 flex-1">
//           <div className="flex items-center space-x-6 filter invert">
//             <img src={ASSETS.logoJordan} alt="Jordan" className="h-8 w-auto" />
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <h1 onClick={() => setView('home')} className="text-3xl cursor-pointer">
//             SNKR<span className="text-[#CCFF00]"></span>
//           </h1>
//         </div>
//         <div className="flex items-center justify-end gap-6 flex-1">
//           <Search size={22} className="cursor-pointer hover:text-[#CCFF00] transition-colors" strokeWidth={2.5} />
//           <button onClick={() => setView('cart')} className="relative group hover:scale-110 transition-transform">
//             <ShoppingBag size={24} />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-[#CCFF00] text-black text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-bold">
//                 {cart.length}
//               </span>
//             )}
//           </button>
//           <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border border-[#CCFF00]/20 cursor-pointer hover:border-[#CCFF00] transition-colors">
//             <User size={20} className="text-[#CCFF00]" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// --- TECHNICAL BUFFER SECTION ---
const TechnicalSpecs = () => {
  return (
    <section className="bg-[#050505] py-40 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-[#c2c2c2] opacity-[0.04] blur-[140px] pointer-events-none" />

      {/* LAYOUT FIX: 
          1. Changed to lg:grid-cols-[1.4fr_1fr] to give the text even more breathing room.
          2. Increased gap to 24 (96px) to match the luxury spacing in the image.
      */}
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-24 items-center relative z-20">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="space-y-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-4 text-[#c2c2c2] text-[10px] font-black uppercase tracking-[0.5em]">
            <div className="h-[2px] w-10 bg-[#CCFF00]" /> 
            <span>Lab_Report_V4</span>
          </div>
          
          <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-white">
            Structural <br /> 
            <span className="text-[#CCFF00]">Analysis.</span>
          </h2>
          
          <div className="border-l-2 border-[#CCFF00]/30 pl-8 max-w-lg">
             <p className="text-zinc-500 text-xl leading-relaxed italic font-medium">
                Deconstructing movement to its base elements. 
                High-fidelity performance meets industrial aesthetics.
             </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Info Cards Grid */}
        {/* GAP FIX: 
            Increased gap-x to 12 and gap-y to 12 to ensure boxes never touch.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-12 w-full">
          {[
            { icon: Ruler, title: "Precision", val: "0.01m" },
            { icon: Cpu, title: "Module", val: "A-Grade" },
            { icon: Activity, title: "Impact", val: "99.1%" },
            { icon: Zap, title: "Torque", val: "Max" }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-10 border border-white/5 bg-white/[0.01] hover:border-[#CCFF00]/40 transition-all duration-500 group flex flex-col justify-between min-h-[280px] w-full relative"
            >
              <div className="space-y-6">
                <item.icon 
                  className="text-[#CCFF00] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" 
                  size={32} 
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[#c2c2c2] text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2">
                    {item.title}
                  </p>
                  <p className="text-3xl xl:text-4xl font-black italic text-white group-hover:text-[#CCFF00] transition-colors leading-none">
                    {item.val}
                  </p>
                </div>
              </div>
              
              {/* The "Corner" bracket seen in your second image */}
              <div className="absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-white/10 group-hover:border-[#CCFF00]/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Gradients for the Video Section transition */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

// --- OPTIMIZED SCROLL VIDEO SECTION ---
const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // No-lag spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 60,
    mass: 0.1,
    restDelta: 0.0001
  });

  useEffect(() => {
    let requestID: number;
    const updateVideoFrame = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const duration = video.duration;
        const targetTime = duration * smoothProgress.get();
        if (Math.abs(video.currentTime - targetTime) > 0.008) {
          video.currentTime = targetTime;
        }
      }
      requestID = requestAnimationFrame(updateVideoFrame);
    };
    requestID = requestAnimationFrame(updateVideoFrame);
    return () => cancelAnimationFrame(requestID);
  }, [smoothProgress]);

  return (
    <section ref={containerRef} className="h-[500vh] relative bg-[#c2c2c2]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* BOTTOM SHADE ONLY: Blends Platinum video into the dark grid below */}
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-[#050505] to-transparent z-10" />

        <video
          ref={videoRef}
          src="/shoe video.mp4" 
          muted playsInline preload="auto"
          className="w-full h-full object-cover pointer-events-none"
          style={{ willChange: "transform", transform: "translateZ(0)" }} 
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
           <motion.h2 
            style={{ 
                opacity: useTransform(smoothProgress, [0.05, 0.2, 0.35], [0, 1, 0]),
                scale: useTransform(smoothProgress, [0.05, 0.2], [0.8, 1])
            }}
            className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#CCFF00]"
           >
             Precision.
           </motion.h2>
           <motion.h2 
            style={{ 
                opacity: useTransform(smoothProgress, [0.6, 0.8, 0.95], [0, 1, 0]),
                y: useTransform(smoothProgress, [0.6, 0.8], [50, 0])
            }}
            className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-white"
           >
             Movement.
           </motion.h2>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart, setView, setSelectedProduct } = useAppContext();

  // Navigation handler
  const handleViewDetails = () => {
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo(0, 0); // Reset scroll position for the new page
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="group relative cursor-pointer"
    >
      {/* Clicking the image container triggers navigation */}
      <div 
        onClick={handleViewDetails}
        className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-3xl border border-white/5"
      >
        <motion.img 
          whileHover={{ scale: 1.05 }} 
          src={product.image} 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700" 
          alt={product.name} 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#CCFF00] text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest italic">Phase_01</span>
        </div>
        
        {/* e.stopPropagation() prevents navigating to details when just adding to cart */}
        <motion.button 
          onClick={(e) => { 
            e.stopPropagation(); 
            addToCart(product); 
          }} 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-[#CCFF00] text-black py-4 font-black uppercase text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-full z-10"
        >
          Add to Vault
        </motion.button>
      </div>

      <div className="mt-6 flex justify-between items-start px-2" onClick={handleViewDetails}>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#CCFF00] mb-1">{product.brand}</p>
          <h3 className="text-2xl font-black tracking-tighter uppercase italic leading-none">{product.name}</h3>
        </div>
        <p className="text-lg font-light text-gray-500 italic">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

// --- 4. UPDATED MAIN APPLICATION ---
export default function FashionApp() {
  return (
    <AppProvider>
      <AppBody />
    </AppProvider>
  );
}



function AppBody() {
  const { view, setView, selectedProduct } = useAppContext();

  return (
    <div className="bg-[#050505] text-white selection:bg-[#CCFF00] selection:text-black">
      {/* <Navbar /> */}

      <AnimatePresence mode="wait">
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection/>
            <TechnicalSpecs />
            <ScrollVideoSection />
            
            <section className="max-w-[1800px] mx-auto px-6 py-40 bg-[#050505]">
              <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none uppercase drop-shadow-[0_0_20px_rgba(194,194,194,0.1)]">
                  Active <br /> <span className="text-[#CCFF00]">Drops.</span>
                </h2>
                <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Inventory_Ready: Live</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-32">
          {RECENT_DROPS.map((item) => (
            /* FIX: Wrap each individual card in its own Link */
            <Link key={item.id} href={`/product/${item.id}`}>
              <ProductCard product={item} />
            </Link>
          ))}
        </div>
              <Link href='/products'>
              <div className="mt-32 flex justify-center">
                <button 
                  onClick={() => setView('products')} 
                  className="group relative flex items-center gap-6 bg-transparent border-2 border-[#CCFF00] text-[#CCFF00] px-12 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-[#CCFF00] hover:text-black transition-all duration-500 active:scale-95"
                >
                  <span>View Full Inventory</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  <div className="absolute inset-0 rounded-full bg-[#CCFF00] blur-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                </button>
              </div>
              </Link>
            </section>

            <section className="px-6 py-40 bg-[#CCFF00] text-black text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[30vw] font-black italic opacity-5 leading-none select-none">APEX</div>
                <h2 className="text-7xl md:text-[140px] font-black tracking-tighter uppercase leading-[0.8] italic mb-12 relative z-10">Secure <br /> Registry.</h2>
                <button className="bg-black text-white px-16 py-8 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:scale-105 transition-transform relative z-10 shadow-2xl active:scale-95">Initialize Join</button>
            </section>
          </motion.div>
        )}

        {/* --- PRODUCTS INVENTORY VIEW --- */}
        {view === 'products' && (
          <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <ProductsPage />
          </motion.div>
        )}

        {/* --- NEW: INDIVIDUAL PRODUCT DETAIL VIEW --- */}
        {view === 'product-detail' && selectedProduct && (
          <motion.div 
            key="product-detail" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
             <ProductView product={selectedProduct} />
          </motion.div>
        )}

        {/* --- CART VIEW --- */}
        {view === 'cart' && (
          <motion.div key="cart" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="min-h-screen pt-40 px-6 max-w-6xl mx-auto pb-40 text-white">
             <button onClick={() => setView('home')} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#CCFF00] hover:text-white mb-16 transition-colors italic">
                <ArrowRight className="rotate-180" size={18} /> Back to Catalog
            </button>
            <h1 className="text-8xl md:text-[120px] font-black italic uppercase tracking-tighter mb-20 leading-none">Your <span className="text-[#CCFF00]">Vault.</span></h1>
            <CartLogic />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="px-6 py-24 border-t border-white/5 bg-black text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">
        © 2026 APEX_LABS_GLOBAL. SYSTEMS_NOMINAL.V4
      </footer>
    </div>
  );
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setView, setSelectedProduct } = useAppContext();

  const filteredProducts = selectedCategory === "All" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 bg-[#050505]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16">
          <h1 className="text-8xl md:text-[120px] font-black italic uppercase tracking-tighter leading-none mb-12">
            Full <br /> <span className="text-[#CCFF00]">Inventory.</span>
          </h1>
          
          <div className="flex gap-4 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.3em] transition-all ${
                  selectedCategory === cat
                    ? "bg-[#CCFF00] text-black"
                    : "border border-white/20 text-white hover:border-[#CCFF00]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-32">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

const CartLogic = () => {
  const { cart, removeFromCart, totalPrice } = useAppContext();
  if (cart.length === 0) return (
    <div className="py-20 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
        <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-sm italic italic text-gray-600">The vault is currently empty / Registry_Offline.</p>
    </div>
  );
  return (
    <div className="grid grid-cols-1 gap-16">
      <div className="space-y-12">
        {cart.map((item: any) => (
          <div key={item.cartId} className="flex flex-col md:flex-row gap-12 items-center border-b border-white/5 pb-12 group">
            <img src={item.image} className="w-32 h-40 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all border border-white/10" alt={item.name} />
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-[0.4em]">{item.brand}</span>
              <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mt-1">{item.name}</h3>
              <p className="text-gray-500 mt-6 font-bold text-2xl tracking-tighter italic">₹{item.price.toLocaleString()}</p>
            </div>
            <button onClick={() => removeFromCart(item.cartId)} className="text-gray-700 hover:text-red-500 transition-colors"><Trash2 size={28} strokeWidth={1.5} /></button>
          </div>
        ))}
      </div>
      <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div>
            <span className="text-gray-600 font-black uppercase text-[10px] tracking-[0.5em] italic">Total Payload Assessment</span>
            <p className="text-7xl md:text-9xl font-black italic tracking-tighter mt-4">₹{totalPrice.toLocaleString()}</p>
        </div>
        <button className="bg-[#CCFF00] text-black px-16 py-8 font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-[0_30px_60px_rgba(204,255,0,0.2)] active:scale-95">Finalize Transaction</button>
      </div>
    </div>
  );
};
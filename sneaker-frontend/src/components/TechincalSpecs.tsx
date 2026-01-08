import { Ruler, Cpu, Activity, Zap } from "lucide-react";
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

export default TechnicalSpecs;
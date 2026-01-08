import redshoe from "../../public/red.png";
import yell from '../../public/yell.png';
import rose from '../../public/rose.png';
import pair from '../../public/pair.png';

export const CATEGORIES = ["All", "Performance", "Lifestyle", "Limited"];

export const ALL_PRODUCTS = [
  { id: 1, name: "Volt_Grip 97", brand: "APEX", price: 24000, category: "Performance", image: yell.src },
  { id: 2, name: "Midnight_Neon", brand: "NOIR", price: 18500, category: "Lifestyle", image: redshoe.src },
  { id: 3, name: "Cyber_Tech Low", brand: "KINETIC", price: 12000, category: "Performance", image: rose.src },
  { id: 4, name: "Ghost_Spec Hi", brand: "PHANTOM", price: 32000, category: "Limited", image: pair.src },
  { id: 5, name: "Volt_Apex 01", brand: "APEX", price: 21000, category: "Performance", image: yell.src },
  { id: 6, name: "Neon_Drift", brand: "KINETIC", price: 15500, category: "Lifestyle", image: redshoe.src },
  { id: 7, name: "Onyx_Edge", brand: "NOIR", price: 28000, category: "Limited", image: "https://images.unsplash.com/photo-1512374382149-4332c6c75d61?q=80&w=800" },
  { id: 8, name: "Synth_Runner", brand: "PHANTOM", price: 19000, category: "Lifestyle", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800" },
];

export const RECENT_DROPS = ALL_PRODUCTS.slice(0, 4);
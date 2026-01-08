import "./globals.css";
import { AppProvider } from "@/app/context/AppContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] antialiased text-white selection:bg-[#CCFF00] selection:text-black">
        <AppProvider>
          <Navbar />
          {children} {/* This renders the content of each specific route */}
        </AppProvider>
      </body>
    </html>
  );
}
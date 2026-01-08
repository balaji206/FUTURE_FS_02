"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="text-[#CCFF00] animate-spin" size={40} />
      </div>
    );
  }

  return <>{children}</>;
}
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  // 1. Persist Session on Refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 2. Auth Actions
  const login = (userData: { name: string; role: 'seller' | 'buyer' }) => {
    setUser(userData);
    localStorage.setItem("user_session", JSON.stringify(userData));
    // Set Cookies for Middleware to read
    document.cookie = "clearance_token=authorized_v4; path=/";
    document.cookie = `user_role=${userData.role}; path=/`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
    document.cookie = "clearance_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/login";
  };

  // 3. Cart Actions
  const addToCart = (product: any) => {
    setCart((prev) => [...prev, { ...product, cartId: Math.random(), quantity: 1 }]);
  };

  const updateQuantity = (cartId: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    ));
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, updateQuantity, totalPrice }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
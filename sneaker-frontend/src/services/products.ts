import { Sneaker } from "@/types/product";

const MEN_API = "https://dummyjson.com/products/category/mens-shoes";
const WOMEN_API = "https://dummyjson.com/products/category/womens-shoes";

// 1. Existing function to get all sneakers
export async function getSneakers(): Promise<Sneaker[]> {
  try {
    const [menRes, womenRes] = await Promise.all([
      fetch(MEN_API, { next: { revalidate: 3600 } }),
      fetch(WOMEN_API, { next: { revalidate: 3600 } }),
    ]);

    if (!menRes.ok || !womenRes.ok) return [];

    const menData = await menRes.json();
    const womenData = await womenRes.json();

    const allShoes = [
      ...(menData?.products ?? []), 
      ...(womenData?.products ?? [])
    ];

    return allShoes.map((item: any) => ({
      id: item.id,
      name: item.title,
      brand: item.brand ?? "PREMIUM",
      price: Math.floor(item.price * 80), 
      image: item.thumbnail,
      description: item.description,
      sizes: [6, 7, 8, 9, 10],
    }));
  } catch (error) {
    console.error("Fetch Failure:", error);
    return [];
  }
}

// 2. NEW: The missing function for the Detail Page
export async function getSneakerById(id: string): Promise<Sneaker | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store", // Ensure we always get the latest data for specific assets
    });

    if (!res.ok) return null;

    const item = await res.json();

    return {
      id: item.id,
      name: item.title,
      brand: item.brand ?? (item.category ? item.category.toUpperCase() : "PREMIUM"),
      price: Math.floor(item.price * 80),
      image: item.thumbnail,
      description: item.description,
      sizes: [6, 7, 8, 9, 10],
    };
  } catch (error) {
    console.error(`Failure retrieving asset ${id}:`, error);
    return null;
  }
}
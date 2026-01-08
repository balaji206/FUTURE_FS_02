import { ALL_PRODUCTS } from "@/data/products";
import ProductView from "@/app/product/[id]/ProductView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound(); // Triggers the default Next.js 404 page
  }

  return <ProductView product={product} />;
}
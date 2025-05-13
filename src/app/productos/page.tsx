"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/components/ProductList";
import SidebarCategoryFilter from "@/components/SidebarCategoryFilter";
import { ProductData } from "@/types/generalTypes";
import { useProductContext } from "@/context/ProductContext";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  const { getProductsByCategory, setCategoryProducts } = useProductContext();

  useEffect(() => {
    if (!categorySlug) return;

    const cached = getProductsByCategory(categorySlug);
    if (cached) {
      setProducts(cached);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?category=${categorySlug}`);
        const data = await res.json();
        setProducts(data);
        setCategoryProducts(categorySlug, data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  if (loading)
    return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="max-w-7xl mx-auto flex gap-8 px-6 py-20">
        <SidebarCategoryFilter />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Nuestros productos
          </h1>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

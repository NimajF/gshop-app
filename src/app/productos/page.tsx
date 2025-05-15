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

  const {
    getProductsByCategory,
    setCategoryProducts,
    setCategoryData,
    getCategoryData,
  } = useProductContext();

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

        if (data.length > 0 && typeof data[0].category === "object") {
          setCategoryData(categorySlug, data[0].category);
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const category = categorySlug ? getCategoryData(categorySlug) : null;
  const categoryName = category?.name || categorySlug;

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-lime-500 border-solid"></div>
        <p className="ml-4 text-lg font-medium text-gray-600">
          Cargando productos...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf7f7] mt-10">
      <div className="bg-white max-w-7xl mx-auto flex gap-8 px-6 py-20">
        <SidebarCategoryFilter />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {categorySlug ? categoryName : "Todos los productos"}
          </h1>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

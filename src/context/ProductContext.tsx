"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProductData } from "@/types/generalTypes";

interface ProductContextType {
  productsByCategory: Record<string, ProductData[]>;
  setCategoryProducts: (categorySlug: string, products: ProductData[]) => void;
  getProductsByCategory: (categorySlug: string) => ProductData[] | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, ProductData[]>
  >({});

  const setCategoryProducts = (
    categorySlug: string,
    products: ProductData[]
  ) => {
    setProductsByCategory((prev) => ({
      ...prev,
      [categorySlug]: products,
    }));
  };

  const getProductsByCategory = (categorySlug: string) => {
    return productsByCategory[categorySlug];
  };

  return (
    <ProductContext.Provider
      value={{ productsByCategory, setCategoryProducts, getProductsByCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

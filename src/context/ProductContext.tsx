"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProductData, CategoryType } from "@/types/generalTypes";

interface ProductContextType {
  productsByCategory: Record<string, ProductData[]>;
  categoriesMap: Record<string, CategoryType>;
  setCategoryData: (categorySlug: string, category: CategoryType) => void;
  setCategoryProducts: (categorySlug: string, products: ProductData[]) => void;
  getProductsByCategory: (categorySlug: string) => ProductData[] | undefined;
  getCategoryData: (categorySlug: string) => CategoryType | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, ProductData[]>
  >({});
  const [categoriesMap, setCategoriesMap] = useState<
    Record<string, CategoryType>
  >({});

  const setCategoryData = (categorySlug: string, category: CategoryType) => {
    setCategoriesMap((prev) => ({
      ...prev,
      [categorySlug]: category,
    }));
  };

  const getCategoryData = (categorySlug: string) => {
    return categoriesMap[categorySlug];
  };

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
      value={{
        productsByCategory,
        setCategoryProducts,
        getProductsByCategory,
        categoriesMap,
        setCategoryData,
        getCategoryData,
      }}
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

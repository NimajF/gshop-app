"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductData } from "@/types/generalTypes";

export type CartItem = ProductData & {
  quantity: number;
  currentPrice: number;
};

export type CartMap = Record<string, CartItem>;

export interface CartContextType {
  cart: CartMap;
  addToCart: (product: ProductData) => void;
  removeFromCart: (productId: string) => void;
  resetCart: () => void;
  selectQuantity: (quantity: number, productId: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartMap>({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductData) => {
    setCart((prev) => {
      const prevItem = prev[product._id];
      const quantity = prevItem?.quantity || 0;
      const price = prevItem?.currentPrice || 0;

      return {
        ...prev,
        [product._id]: {
          ...product,
          quantity: quantity + 1,
          currentPrice: price || product.price,
        },
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const resetCart = () => setCart({});

  const selectQuantity = (quantity: number, productId: string) => {
    const product = cart[productId];
    if (!product) return;

    setCart((prev) => {
      return {
        ...prev,
        [productId]: {
          ...product,
          quantity: quantity,
          currentPrice: quantity * product.price,
        },
      };
    });
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, resetCart, selectQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within CartProvider");
  return context;
}

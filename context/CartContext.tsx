"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string | number;
  quantity: number;
  sizes: string;
  price: number;
  title: string;
  imageurl: string;
  // Add other item properties as needed (price, name, etc.)
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  decreaseItem: (item: Omit<CartItem, "quantity">) => void;
  resetItem: (item: Omit<CartItem, "quantity">) => void;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addItem: () => {},
  decreaseItem: () => {},
  resetItem: () => {},
  resetCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      // 1. Fixed find (implicit return)
      const existingItem = prev.find(
        (i) => i.id === item.id && i.sizes === item.sizes, // Add size comparison
      );

      // 2. Check both ID and size when updating
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.sizes === item.sizes // Check size here too
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decreaseItem = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.sizes === item.sizes,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prev.map((i) =>
            i.id === item.id && i.sizes === item.sizes
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          );
        }
        // Remove item if quantity would become 0
        return prev.filter(
          (i) => !(i.id === item.id && i.sizes === item.sizes),
        );
      }
      return prev;
    });
  };

  const resetItem = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) =>
      prev.filter(
        (itemx: CartItem) =>
          !(itemx.id === item.id && itemx.sizes === item.sizes),
      ),
    );
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, decreaseItem, resetItem, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

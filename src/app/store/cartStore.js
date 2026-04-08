"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      animateCart: false,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + (product.quantity || 1),
                    }
                  : item,
              ),
              animateCart: true,
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: product.quantity || 1 }],
            animateCart: true,
          };
        }),

      stopCartAnimation: () => set({ animateCart: false }),

      updateQty: (id, newQty) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
      }),
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (menu: { menuId: number; menuName: string; unitPrice: number; imageUrl: string | null }) => void;
  removeItem: (menuId: number) => void;
  updateQuantity: (menuId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (menu) =>
        set((state) => {
          const existing = state.items.find((i) => i.menuId === menu.menuId);
          if (existing) {
            return { items: state.items.map((i) => (i.menuId === menu.menuId ? { ...i, quantity: i.quantity + 1 } : i)) };
          }
          return { items: [...state.items, { ...menu, quantity: 1 }] };
        }),
      removeItem: (menuId) => set((state) => ({ items: state.items.filter((i) => i.menuId !== menuId) })),
      updateQuantity: (menuId, quantity) =>
        set((state) => {
          if (quantity <= 0) return { items: state.items.filter((i) => i.menuId !== menuId) };
          return { items: state.items.map((i) => (i.menuId === menuId ? { ...i, quantity } : i)) };
        }),
      clearCart: () => set({ items: [] }),
      totalAmount: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    { name: 'cart-storage' },
  ),
);

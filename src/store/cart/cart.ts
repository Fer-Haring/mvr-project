import { CartItem } from '@webapp/sdk/actions/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  cart: CartItem[];
  addToCart: (product: CartItem, unitQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cart: [],
      addToCart: (product, unitQuantity) => {
        set((state) => {
          const found = state.cart.find((item) => item.productId === product.productId);
          if (found) {
            // Si el producto ya está en el carrito, incrementa la cantidad y recalcula el subtotal
            return {
              cart: state.cart.map((item) =>
                item.productId === product.productId
                  ? {
                      ...item,
                      unitQuantity: item.unitQuantity + unitQuantity,
                      subTotal: (item.unitQuantity + unitQuantity) * item.unitPrice,
                    }
                  : item
              ),
            };
          } else {
            // Si el producto no está en el carrito, añádelo con la cantidad especificada y calcula el subtotal
            return {
              cart: [
                ...state.cart,
                {
                  ...product,
                  unitQuantity: unitQuantity,
                  subTotal: unitQuantity * product.unitPrice, // Calcula el subtotal
                },
              ],
            };
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => {
          const updatedCart = state.cart
            .map((item) => {
              if (item.productId === productId) {
                const newUnitQuantity = item.unitQuantity - 1;
                const newSubTotal = newUnitQuantity * item.unitPrice;

                return {
                  ...item,
                  unitQuantity: newUnitQuantity,
                  subTotal: newSubTotal,
                };
              }
              return item;
            })
            .filter((item) => item.unitQuantity > 0);

          return { cart: updatedCart };
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart',
      getStorage: () => localStorage,
    }
  )
);

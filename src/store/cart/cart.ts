import { CartItem } from '@webapp/sdk/types/cart-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


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
          const found = state.cart.find((item) => item.product_id === product.product_id);
          if (found) {
            // Si el producto ya está en el carrito, incrementa la cantidad y recalcula el subtotal
            return {
              cart: state.cart.map((item) =>
                item.product_id === product.product_id
                  ? {
                      ...item,
                      unitQuantity: item.quantity + unitQuantity,
                      subTotal: (item.quantity + unitQuantity) * item.unit_price,
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
                  subTotal: unitQuantity * product.unit_price, // Calcula el subtotal
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
              if (item.product_id === productId) {
                const newUnitQuantity = item.quantity - 1;
                const newSubTotal = newUnitQuantity * item.unit_price;

                return {
                  ...item,
                  unitQuantity: newUnitQuantity,
                  subTotal: newSubTotal,
                };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);

          return { cart: updatedCart };
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
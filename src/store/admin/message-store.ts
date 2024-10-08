// store/message-store.ts
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MessageStore {
  address: string;
  setAddress: (address: string) => void;
  msgCity: string;
  setMsgCity: (msgCity: string) => void;
  name: string;
  setName: (name: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  deliverValue: number;
  setDeliverValue: (deliverValue: number) => void;
  order: OrderRequest;
  setOrder: (order: OrderRequest) => void;
  deleteMessageStore: () => void;
  transferImage: string | null; // Nuevo estado para la imagen de transferencia
  setTransferImage: (image: string | null) => void;
}

export const useMessageStore = create(
  persist<MessageStore>(
    (set) => ({
      address: '',
      setAddress: (address: string) => set({ address }),
      msgCity: '',
      setMsgCity: (msgCity: string) => set({ msgCity }),
      name: '',
      setName: (name: string) => set({ name }),
      lastName: '',
      setLastName: (lastName: string) => set({ lastName }),
      deliverValue: 0,
      setDeliverValue: (deliverValue: number) => set({ deliverValue }),
      order: {
        cart_items: [],
        total_products: 0,
        total_order_amount_usd: 0,
        total_order_amount_ars: 0,
        status: '',
        currency_used_to_pay: '',
        payment_method: '',
        delivery_type: '',
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: '',
          username: '',
          email: '',
          password: '',
          address: '',
          admin: false,
          city: '',
          delivery_zone: '',
          delivery_type: '',
          delivery_cost: 0,
          last_name: '',
          name: '',
          payment_method: '',
          phone: '',
          preferred_currency: '',
          profile_picture: '',
        },
      },
      setOrder: (order: OrderRequest) => set({ order }),
      deleteMessageStore: () =>
        set({
          address: '',
          msgCity: '',
          name: '',
          lastName: '',
          deliverValue: 0,
          order: {
            cart_items: [],
            total_products: 0,
            total_order_amount_usd: 0,
            total_order_amount_ars: 0,
            status: '',
            currency_used_to_pay: '',
            payment_method: '',
            delivery_type: '',
            created_at: new Date(),
            updated_at: new Date(),
            user: {
              id: '',
              username: '',
              email: '',
              password: '',
              address: '',
              admin: false,
              city: '',
              delivery_zone: '',
              delivery_type: '',
              delivery_cost: 0,
              last_name: '',
              name: '',
              payment_method: '',
              phone: '',
              preferred_currency: '',
              profile_picture: '',
            },
          },
          transferImage: null, // Resetear la imagen de transferencia
        }),
      transferImage: null,
      setTransferImage: (image: string | null) => set({ transferImage: image }),
    }),
    {
      name: 'message-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

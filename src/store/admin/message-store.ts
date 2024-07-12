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
          deliver_zone: '',
          delivery_type: '',
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
              deliver_zone: '',
              delivery_type: '',
              last_name: '',
              name: '',
              payment_method: '',
              phone: '',
              preferred_currency: '',
              profile_picture: '',
            },
          },
        }),
    }),
    {
      name: 'message-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { Order } from '@webapp/sdk/types/user-types';
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
  order: Order;
  setOrder: (order: Order) => void;
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
        order_id: '',
        user_id: '',
        cart_items: [],
        total_products: 0,
        total_order_amount_usd: 0,
        total_order_amount_ars: 0,
        status: '',
        currency_used_to_pay: '',
        payment_method: '',
        delivery_type: '',
        create_at: new Date(),
        updated_at: new Date(),
      },
      setOrder: (order: Order) => set({ order }),
      deleteMessageStore: () =>
        set({
          address: '',
          name: '',
          lastName: '',
          msgCity: '',
          order: {
            order_id: '',
            user_id: '',
            cart_items: [],
            total_products: 0,
            total_order_amount_usd: 0,
            total_order_amount_ars: 0,
            status: '',
            currency_used_to_pay: '',
            payment_method: '',
            delivery_type: '',
            create_at: new Date(),
            updated_at: new Date(),
          },
        }),
    }),
    {
      name: 'message-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

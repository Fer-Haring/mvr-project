// store/message-store.ts
import { OrderRequest } from '@webapp/service/types/orders-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MessageStore {
  deliverValue: number;
  setDeliverValue: (deliverValue: number) => void;
  order: OrderRequest;
  setOrder: (order: OrderRequest) => void;
  deleteMessageStore: () => void;
  transferImage: string | null;
  setTransferImage: (image: string | null) => void;
}

export const useMessageStore = create(
  persist<MessageStore>(
    (set) => ({
      deliverValue: 0,
      setDeliverValue: (deliverValue: number) => set({ deliverValue }),
      order: {
        cart_items: [],
        total_products: 0,
        total_order_amount_usd: 0,
        total_order_amount_ars: 0,
        status: 'pending',
        currency_used_to_pay: '',
        payment_method: '',
        delivery_type: '',
        delivery_zone: '',
        delivery_cost: 0,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: '',
        // Los datos del usuario se copiarán del UserData store cuando sea necesario
      },
      setOrder: (order: OrderRequest) => set({ order }),
      deleteMessageStore: () =>
        set({
          deliverValue: 0,
          order: {
            cart_items: [],
            total_products: 0,
            total_order_amount_usd: 0,
            total_order_amount_ars: 0,
            status: 'pending',
            currency_used_to_pay: '',
            payment_method: '',
            delivery_type: '',
            delivery_zone: '',
            delivery_cost: 0,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: '',
          },
          transferImage: null,
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

// store/message-store.ts
import { OrderRequest } from '@webapp/service/types/orders-types';
import { create } from 'zustand';

interface MessageStore {
  deliverValue: number;
  setDeliverValue: (deliverValue: number) => void;
  order: OrderRequest;
  setOrder: (order: OrderRequest) => void;
  deleteMessageStore: () => void;
  transferImage: string | null;
  setTransferImage: (image: string | null) => void;
  shippingAddress: string;
  setShippingAddress: (address: string) => void;
  shippingCity: string;
  setShippingCity: (city: string) => void;
  shippingCost: number;
  setShippingCost: (cost: number) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
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
      shippingAddress: '',
      shippingCity: '',
      shippingCost: 0,
    }),
  transferImage: null,
  setTransferImage: (image: string | null) => set({ transferImage: image }),
  shippingAddress: '',
  setShippingAddress: (address: string) => set({ shippingAddress: address }),
  shippingCity: '',
  setShippingCity: (city: string) => set({ shippingCity: city }),
  shippingCost: 0,
  setShippingCost: (cost: number) => set({ shippingCost: cost }),
}));

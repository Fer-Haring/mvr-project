import { Order } from '@webapp/sdk/users-types';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';


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

export const useMessageStore = create(persist<MessageStore>((set) => ({
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
    orderId: '',
    userId: '',
    cartItems: [],
    totalProducts: 0,
    totalOrderAmountUSD: 0,
    totalOrderAmountARS: 0,
    status: '',
    currencyUsedToPay: '',
    paymentMethod: '',
    deliveryType: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setOrder: (order: Order) => set({ order }),
  deleteMessageStore: () => set({ address: '', name: '', lastName: '', msgCity: '', order: {
    orderId: '',
    userId: '',
    cartItems: [],
    totalProducts: 0,
    totalOrderAmountUSD: 0,
    totalOrderAmountARS: 0,
    status: '',
    currencyUsedToPay: '',
    paymentMethod: '',
    deliveryType: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  } }),
}), {
  name: 'message-store',
  getStorage: () => localStorage,
}));
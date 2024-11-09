import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderResponse } from '@webapp/services/types/orders-types';

export interface CompletedOrdersState {
  orders: OrderResponse[];
  order: OrderResponse | null;
  editingOrder: EditingOrderState;
}

interface Order {
  orderId: string;
  productIds: string[];
  quantity: number;
  status: string;
  // Agrega otros campos necesarios para tu pedido
}

interface EditingOrderState {
  currentOrder: Order | null;
  isEditing: boolean;
  error: string | null;
}

const initialState: CompletedOrdersState = {
  orders: [],
  order: null,
  editingOrder: {
    currentOrder: null,
    isEditing: false,
    error: null,
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderResponse>) => {
      state.order = action.payload;
    },
    setOrders: (state, action: PayloadAction<OrderResponse[]>) => {
      state.orders = action.payload;
    },
    resetStore: (state) => {
      state.orders = [];
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.editingOrder.currentOrder = action.payload;
      state.editingOrder.isEditing = true;
    },
    clearCurrentOrder: (state) => {
      state.editingOrder.currentOrder = null;
      state.editingOrder.isEditing = false;
    },
    updateOrderStatus: (state, action: PayloadAction<string>) => {
      if (state.editingOrder.currentOrder) {
        state.editingOrder.currentOrder.status = action.payload;
      }
    },
    updateOrderQuantity: (state, action: PayloadAction<number>) => {
      if (state.editingOrder.currentOrder) {
        state.editingOrder.currentOrder.quantity = action.payload;
      }
    },
    setOrderError: (state, action: PayloadAction<string>) => {
      state.editingOrder.error = action.payload;
    },
    clearOrderError: (state) => {
      state.editingOrder.error = null;
    },
  },
});

export const {
  setOrders,
  resetStore,
  setCurrentOrder,
  clearCurrentOrder,
  updateOrderStatus,
  updateOrderQuantity,
  setOrderError,
  clearOrderError,
} = ordersSlice.actions;

export default ordersSlice.reducer;

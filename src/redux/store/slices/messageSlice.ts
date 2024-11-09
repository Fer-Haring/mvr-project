import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderRequest } from '@webapp/services/types/orders-types';

export interface MessageStoreState {
  address: string;
  msgCity: string;
  name: string;
  lastName: string;
  deliverValue: number;
  order: OrderRequest | null;
  transferImage: string | null;
}

const initialState: MessageStoreState = {
  address: '',
  msgCity: '',
  name: '',
  lastName: '',
  deliverValue: 0,
  order: null,
  transferImage: null,
};

const messageStoreSlice = createSlice({
  name: 'messageStore',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setMsgCity: (state, action: PayloadAction<string>) => {
      state.msgCity = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setDeliverValue: (state, action: PayloadAction<number>) => {
      state.deliverValue = action.payload;
    },
    setOrder: (state, action: PayloadAction<OrderRequest>) => {
      state.order = action.payload;
    },
    setTransferImage: (state, action: PayloadAction<string | null>) => {
      state.transferImage = action.payload;
    },
    deleteMessageStore: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAddress,
  setMsgCity,
  setName,
  setLastName,
  setDeliverValue,
  setOrder,
  setTransferImage,
  deleteMessageStore,
} = messageStoreSlice.actions;

export default messageStoreSlice.reducer;

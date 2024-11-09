/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@webapp/services/types/products-types';

interface ColumnSortState {
  columnOrder: string[];
}

interface FilterState {
  filters: Record<string, any>;
}

interface BulkEditState {
  selectedProducts: Product[];
}

export interface AdminTableState {
  columnSort: ColumnSortState;
  filter: FilterState;
  bulkEdit: BulkEditState;
}

const initialState: AdminTableState = {
  columnSort: {
    columnOrder: [],
  },
  filter: {
    filters: {},
  },
  bulkEdit: {
    selectedProducts: [],
  },
};

const adminTableSlice = createSlice({
  name: 'adminTable',
  initialState,
  reducers: {
    setColumnOrder: (state, action: PayloadAction<string[]>) => {
      state.columnSort.columnOrder = action.payload;
    },
    setFilters: (state, action: PayloadAction<Record<string, any>>) => {
      state.filter.filters = action.payload;
    },
    addSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.bulkEdit.selectedProducts.push(action.payload);
    },
    setSelectedProducts: (state, action: PayloadAction<Product[]>) => {
      state.bulkEdit.selectedProducts = action.payload;
    },
    removeSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.bulkEdit.selectedProducts = state.bulkEdit.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
    clearSelectedProducts: (state) => {
      state.bulkEdit.selectedProducts = [];
    },
  },
});

export const { setColumnOrder, setFilters, addSelectedProduct, removeSelectedProduct, setSelectedProducts } =
  adminTableSlice.actions;

export default adminTableSlice.reducer;

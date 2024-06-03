import { Products } from '@webapp/sdk/users-types';
import { create } from 'zustand';

// Define el estado inicial de la tienda
interface BulkEditState {
  products: Products[];
  selectedProducts: Products[];
  originalSelectedProducts: Products[];
}

// Define las acciones que se pueden despachar
interface BulkEditActions {
  setProducts: (products: Products[]) => void;
  setSelectedProducts: (products: Products[]) => void;
  updateSelectedProducts: (updatedFields: Partial<Products>) => void;
  clearSelectedProducts: () => void;
}

// Crea la tienda
const useBulkEditStore = create<BulkEditState & BulkEditActions>((set) => ({
  products: [],
  selectedProducts: [],
  originalSelectedProducts: [],
  setProducts: (products) => set({ products }),
  setSelectedProducts: (products) => set({
    selectedProducts: products,
    originalSelectedProducts: JSON.parse(JSON.stringify(products)), // Guardamos una copia de los productos originales
  }),
  updateSelectedProducts: (updatedFields) => set((state) => ({
    selectedProducts: state.selectedProducts.map((product) => ({
      ...product,
      ...updatedFields,
    })),
    products: state.products.map((product) =>
      state.selectedProducts.some((selected) => selected.productId === product.productId)
        ? { ...product, ...updatedFields }
        : product
    ),
  })),
  clearSelectedProducts: () => set({ selectedProducts: [], originalSelectedProducts: [] }),
}));

export default useBulkEditStore;

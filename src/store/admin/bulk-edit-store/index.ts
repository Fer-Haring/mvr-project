
import { Product } from '@webapp/sdk/mutations/products/types';
import { create } from 'zustand';

// Define el estado inicial de la tienda
interface BulkEditState {
  products: Product[];
  selectedProducts: Product[];
  originalSelectedProducts: Product[];
}

// Define las acciones que se pueden despachar
interface BulkEditActions {
  setProducts: (products: Product[]) => void;
  setSelectedProducts: (products: Product[]) => void;
  updateSelectedProducts: (updatedFields: Partial<Product>) => void;
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
      state.selectedProducts.some((selected) => selected.id === product.id)
        ? { ...product, ...updatedFields }
        : product
    ),
  })),
  clearSelectedProducts: () => set({ selectedProducts: [], originalSelectedProducts: [] }),
}));

export default useBulkEditStore;

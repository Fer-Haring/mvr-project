import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearProductState } from '@webapp/redux/store/slices/productsSlice';
import {
  addNewProductThunk,
  deleteProductThunk,
  getProductByIdThunk,
  getProductsListThunk,
  updateProductThunk,
  uploadImagesArrayThunk,
} from '@webapp/redux/store/thunks/productsThunks';
import { Product } from '@webapp/services/types/products-types';

export const useProduct = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.products);
  const { products } = productState;

  const fetchProductsList = (page: number, limit: number) => dispatch(getProductsListThunk({ page, limit }));
  const fetchProductById = (productId: string) => dispatch(getProductByIdThunk(productId));
  const modifyProduct = (productId: string, productData: Product, file?: File | null) =>
    dispatch(updateProductThunk({ productId, productData, file }));
  const removeProduct = (productId: string) => dispatch(deleteProductThunk(productId));
  const resetProductState = () => dispatch(clearProductState());

  return {
    ...productState,
    products,
    fetchProductsList,
    fetchProductById,
    modifyProduct,
    removeProduct,
    resetProductState,
  };
};

export const useUploadImagesArray = () => {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);

  const uploadImages = async (productId: string, files: File[]) => {
    const updatedProduct = await dispatch(uploadImagesArrayThunk({ productId, files }));
    return updatedProduct;
  };

  return {
    product,
    loading,
    error,
    uploadImages,
  };
};

export const useAddNewProduct = (product: Product, file?: File) => {
  const dispatch = useAppDispatch();
  const { product: createdProduct, loading, error } = useAppSelector((state) => state.products);

  const addProduct = () => {
    dispatch(addNewProductThunk({ product, file }));
  };

  return {
    createdProduct,
    loading,
    error,
    addProduct,
  };
};

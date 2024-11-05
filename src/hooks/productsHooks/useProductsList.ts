// src/hooks/useProducts.ts
import { getProductsListThunk } from '@webapp/redux/store/thunks/productsThunks';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux-hooks';

export const useProducts = (page: number, limit: number) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(getProductsListThunk({ page, limit }));
  }, [dispatch, page, limit]);

  return { products, loading, error };
};

import { getDollarValueThunk } from '@webapp/redux/store/thunks/adminThunks';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux-hooks';

export const useDollarValue = () => {
  const dispatch = useAppDispatch();
  const dollarValue = useAppSelector((state) => state.admin.dollarValue);
  const loading = useAppSelector((state) => state.admin.loading);
  const error = useAppSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(getDollarValueThunk());
  }, [dispatch]);

  return { dollarValue, loading, error };
};

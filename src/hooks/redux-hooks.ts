import { RootState } from '@webapp/redux/store/reducer';
import { AppDispatch } from '@webapp/redux/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

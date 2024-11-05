import { userSignInThunk } from '@webapp/redux/store/thunks/userThunks';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../redux-hooks';

export interface LoginError {
  detail: string;
}

interface UseLoginReturn {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | LoginError | null;
}

export const useLogin = (): UseLoginReturn => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.user.signIn);
  const [error, setError] = useState<string | LoginError | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await dispatch(userSignInThunk(credentials)).unwrap();

      toast.success('Inicio de sesión exitoso con el usuario: ' + response.user_name);
    } catch (err) {
      console.error('Error de autenticación:', err);

      setError(typeof err === 'string' ? { detail: err } : (err as LoginError));

      toast.error('Error al iniciar sesión: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login: login,
    isLoading,
    isAuthenticated,
    error,
  };
};

import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearSignUpState, clearUpdateUserState, clearUserByIdState } from '@webapp/redux/store/slices/userSlices';
import {
  getUserByIdThunk,
  sendRecoveryCodeThunk,
  updateUserThunk,
  userSignInThunk,
  userSignUpThunk,
  verifyCodeThunk,
} from '@webapp/redux/store/thunks/userThunks';
import { SendCodePayload } from '@webapp/services/actions/auth/password/send-password-recovery-code';
import { VerifyCodePayload } from '@webapp/services/actions/auth/password/verify-recovery-code';
import { SignupPayload, UpdateUserPayload } from '@webapp/services/types/user-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

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

export const useGetUserById = (userId: string) => {
  const dispatch = useAppDispatch();
  const userByIdState = useAppSelector((state) => state.user.userById);

  const fetchUserById = () => dispatch(getUserByIdThunk(userId));
  const clearUserById = () => dispatch(clearUserByIdState());

  return {
    ...userByIdState,
    fetchUserById,
    clearUserById,
  };
};

export const useUserSignUp = () => {
  const dispatch = useAppDispatch();

  const userSignUpState = useAppSelector((state) => state.user?.signUp);

  const signUpUser = (payload: SignupPayload) => {
    dispatch(userSignUpThunk(payload));
  };

  const clearSignUp = () => {
    dispatch(clearSignUpState());
  };

  return {
    user: userSignUpState?.user || null,
    loading: userSignUpState?.loading || false,
    error: userSignUpState?.error || null,
    signUpUser,
    clearSignUp,
  };
};

export const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { updatedUser, loading, error } = useAppSelector((state) => state.user.updateUser);

  const updateUser = (userId: string, payload: UpdateUserPayload, file?: File | null) => {
    dispatch(updateUserThunk({ userId, payload, file }));
  };

  const clearUpdateUser = () => {
    dispatch(clearUpdateUserState());
  };

  return {
    updatedUser,
    loading,
    error,
    updateUser,
    clearUpdateUser,
  };
};

export const useSendCode = () => {
  const dispatch = useAppDispatch();
  const {
    message = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.user?.passwordRecovery || {});

  const sendCode = (payload: SendCodePayload) => {
    dispatch(sendRecoveryCodeThunk(payload));
  };

  return { message, loading, error, sendCode };
};

export const useVerifyCode = () => {
  const dispatch = useAppDispatch();
  const {
    message = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.user?.passwordRecovery || {});

  const verifyCode = (payload: VerifyCodePayload) => {
    dispatch(verifyCodeThunk(payload));
  };

  return { message, loading, error, verifyCode };
};

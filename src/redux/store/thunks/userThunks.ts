/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '@webapp/services/actions/auth/get-user-by-id';
import { SendCodePayload, SendCodeResponse, sendPasswordRecoveryCode } from '@webapp/services/actions/auth/password/send-password-recovery-code';
import { VerifyCodePayload, VerifyCodeResponse, verifyRecoveryCode } from '@webapp/services/actions/auth/password/verify-recovery-code';
import { userSignIn } from '@webapp/services/actions/auth/user-sign-in';
import { userSignup } from '@webapp/services/actions/auth/user-sign-up';
import { updateUser } from '@webapp/services/actions/auth/user-update';
import { LoginPayload, LoginResponse, SignupPayload, SignupResponse, UpdateUserPayload, User } from '@webapp/services/types/user-types';


export const userSignInThunk = createAsyncThunk<LoginResponse, LoginPayload>(
  'userSignIn/userSignIn',
  async (payload, { rejectWithValue }) => {
    try {
      return await userSignIn(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserByIdThunk = createAsyncThunk<User, string>(
  'user/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserById(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para actualizar el usuario
export const updateUserThunk = createAsyncThunk<
  SignupResponse,
  { userId: string; payload: UpdateUserPayload; file?: File | null }
>('user/updateUser', async ({ userId, payload, file }, { rejectWithValue }) => {
  try {
    return await updateUser(userId, payload, file);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk para registrarse
export const userSignUpThunk = createAsyncThunk<SignupResponse, SignupPayload>(
  'user/userSignUp',
  async (payload, { rejectWithValue }) => {
    try {
      return await userSignup(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const sendRecoveryCodeThunk = createAsyncThunk<SendCodeResponse, SendCodePayload>(
  'passwordRecovery/sendCode',
  async (payload, { rejectWithValue }) => {
    try {
      return await sendPasswordRecoveryCode(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCodeThunk = createAsyncThunk<VerifyCodeResponse, VerifyCodePayload>(
  'passwordRecovery/verifyCode',
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyRecoveryCode(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
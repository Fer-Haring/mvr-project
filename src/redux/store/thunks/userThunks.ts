import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '@webapp/services/actions/auth/get-user-by-id';
import { userSignIn } from '@webapp/services/actions/auth/user-sign-in';
import { LoginPayload, LoginResponse, User } from '@webapp/services/types/user-types';


export const userSignInThunk = createAsyncThunk<LoginResponse, LoginPayload>(
  'userSignIn/userSignIn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userSignIn(payload);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
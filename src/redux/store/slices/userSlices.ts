// slices/userSlices.ts
import { LoginResponse, User } from '@webapp/services/types/user-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getUserByIdThunk, userSignInThunk } from '../thunks/userThunks';

export interface UserSignInState {
  userInfo: LoginResponse | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface GetUserByIdState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  signIn: UserSignInState;
  userById: GetUserByIdState;
}

const initialState: UserState = {
  signIn: {
    userInfo: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  userById: {
    user: null,
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.signIn = initialState.signIn;
    },
    clearUserByIdState: (state) => {
      state.userById = initialState.userById;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignInThunk.pending, (state) => {
        state.signIn.loading = true;
        state.signIn.error = null;
      })
      .addCase(userSignInThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.signIn.loading = false;
        state.signIn.userInfo = action.payload;
        state.signIn.isAuthenticated = true;
      })
      .addCase(userSignInThunk.rejected, (state, action) => {
        state.signIn.loading = false;
        state.signIn.error = action.payload as string;
      })
      .addCase(getUserByIdThunk.pending, (state) => {
        state.userById.loading = true;
        state.userById.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.userById.loading = false;
        state.userById.user = action.payload;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.userById.loading = false;
        state.userById.error = action.payload as string;
      });
  },
});

export const { clearUserState, clearUserByIdState } = userSlice.actions;
export default userSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SendCodeResponse } from '@webapp/services/actions/auth/password/send-password-recovery-code';
import { VerifyCodeResponse } from '@webapp/services/actions/auth/password/verify-recovery-code';
import { LoginResponse, SignupResponse, User } from '@webapp/services/types/user-types';

import {
  getUserByIdThunk,
  sendRecoveryCodeThunk,
  updateUserThunk,
  userSignInThunk,
  userSignUpThunk,
  verifyCodeThunk,
} from '../thunks/userThunks';

interface UserDataState {
  user: User | null;
  email: string;
  loading: boolean;
  error: string | null;
}

interface UserSignInState {
  userInfo: LoginResponse | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface UserSignUpState {
  user: SignupResponse | null;
  loading: boolean;
  error: string | null;
}

interface GetUserByIdState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UpdateUserState {
  updatedUser: SignupResponse | null;
  loading: boolean;
  error: string | null;
}

interface PasswordRecoveryState {
  message: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  signIn: UserSignInState;
  signUp: UserSignUpState;
  userById: GetUserByIdState;
  updateUser: UpdateUserState;
  passwordRecovery: PasswordRecoveryState;
  userData: UserDataState;
}

const initialState: UserState = {
  signIn: {
    userInfo: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  signUp: {
    user: null,
    loading: false,
    error: null,
  },
  userById: {
    user: null,
    loading: false,
    error: null,
  },
  updateUser: {
    updatedUser: null,
    loading: false,
    error: null,
  },
  passwordRecovery: {
    message: null,
    loading: false,
    error: null,
  },
  userData: {
    user: null,
    email: '',
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSignUpState: (state) => {
      state.signUp = initialState.signUp;
    },
    clearUserState: (state) => {
      state.signIn = initialState.signIn;
    },
    clearUserByIdState: (state) => {
      state.userById = initialState.userById;
    },
    clearUpdateUserState: (state) => {
      state.updateUser = initialState.updateUser;
    },
    clearPasswordRecoveryState: (state) => {
      state.passwordRecovery = initialState.passwordRecovery;
    },
    clearUserDataState: (state) => {
      state.userData = initialState.userData;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData.user = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      if (!state.userData) {
        state.userData = { user: null, email: '', loading: false, error: null };
      }
      state.userData.email = action.payload;
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
        state.signIn.error = action.error.message || 'Error de autenticación';
      })
      .addCase(userSignUpThunk.pending, (state) => {
        state.signUp.loading = true;
        state.signUp.error = null;
      })
      .addCase(userSignUpThunk.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.signUp.loading = false;
        state.signUp.user = action.payload;
      })
      .addCase(userSignUpThunk.rejected, (state, action) => {
        state.signUp.loading = false;
        state.signUp.error = action.error.message || 'Error al registrarse';
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
        state.userById.error = action.error.message || 'Error al obtener usuario';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.updateUser.loading = false;
        state.updateUser.updatedUser = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.error = action.error.message || 'Error al actualizar usuario';
      })
      .addCase(sendRecoveryCodeThunk.pending, (state) => {
        state.passwordRecovery = state.passwordRecovery || initialState.passwordRecovery;
        state.passwordRecovery.loading = true;
        state.passwordRecovery.error = null;
      })
      .addCase(sendRecoveryCodeThunk.fulfilled, (state, action: PayloadAction<SendCodeResponse>) => {
        state.passwordRecovery = state.passwordRecovery || initialState.passwordRecovery;
        state.passwordRecovery.loading = false;
        state.passwordRecovery.message = action.payload.message;
      })
      .addCase(sendRecoveryCodeThunk.rejected, (state, action) => {
        state.passwordRecovery = state.passwordRecovery || initialState.passwordRecovery;
        state.passwordRecovery.loading = false;
        state.passwordRecovery.error = action.error.message || 'Error al enviar el código de recuperación';
      })
      .addCase(verifyCodeThunk.pending, (state) => {
        state.passwordRecovery.loading = true;
        state.passwordRecovery.error = null;
      })
      .addCase(verifyCodeThunk.fulfilled, (state, action: PayloadAction<VerifyCodeResponse>) => {
        state.passwordRecovery.loading = false;
        state.passwordRecovery.message = action.payload.message;
      })
      .addCase(verifyCodeThunk.rejected, (state, action) => {
        state.passwordRecovery.loading = false;
        state.passwordRecovery.error = action.error.message || 'Error al verificar el código de recuperación';
      });
  },
});

export const {
  clearSignUpState,
  clearUserState,
  clearUserByIdState,
  clearUpdateUserState,
  clearPasswordRecoveryState,
  setUserData,
  setEmail,
} = userSlice.actions;
export default userSlice.reducer;

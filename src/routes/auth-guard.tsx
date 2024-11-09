import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { logOut } from '@webapp/redux/store/slices/userSlices';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isPublicRoute } from './utils';

const SIGN_IN_PATH = '/sign-in';

const AuthGuard: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user.signIn);
  const { token } = useAppSelector((state) => state.user);

  const location = useLocation();

  // Validar el token solo si está presente
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await fetch('https://mvr-prod.onrender.com/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Token validation failed');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          dispatch(logOut());
        }
      } else {
        dispatch(logOut());
      }
    };

    validateToken();
  }, [token, dispatch]);

  if (isAuthenticated) {
    if (location.pathname.includes(SIGN_IN_PATH)) {
      return <Navigate to={'/home'} replace />;
    }
  } else {
    if (!isPublicRoute(location.pathname)) {
      return <Navigate to={SIGN_IN_PATH} replace />;
    }
  }

  return <Outlet />;
};

export default AuthGuard;

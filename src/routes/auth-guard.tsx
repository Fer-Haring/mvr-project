import { useUserStore } from '@webapp/store/auth/session';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isPublicRoute } from './utils';
import { useUserGoogleStore } from '@webapp/store/auth/google-sessions';

interface AuthGuardProps {
  children?: React.ReactNode;
}

const SIGN_IN_PATH = '/sign-in';

const AuthGuard: React.FunctionComponent<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isGoogleLoggedIn = useUserGoogleStore((state) => state.isLoggedIn);
  const accessToken = localStorage.getItem('access_token');
  const refreshTokenStored = localStorage.getItem('refresh_token');
  const location = useLocation();

  // Validar el token sólo si hay un token presente
  useEffect(() => {
    const validateToken = async () => {
      if (accessToken) {
        try {
          const response = await fetch("https://mvr-prod.onrender.com/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error("Token validation failed");
          }

          const data = await response.json();
          if (!data.isValid) {
            useUserGoogleStore.getState().logOut();
          }
        } catch (error) {
          useUserGoogleStore.getState().logOut();
          console.error("Token validation error:", error);
        }
      }
    };
    if (accessToken === null || refreshTokenStored === undefined) {
      useUserGoogleStore.getState().logOut();
      useUserStore.getState().logOut();
    }

    validateToken();
  }, [accessToken, refreshTokenStored]);

  if (isGoogleLoggedIn || isLoggedIn) {
    if (location.pathname.includes(SIGN_IN_PATH)) {
      return <Navigate to={'/home'} replace />;
    }
  } else {
    if (!isPublicRoute(location.pathname)) {
      return <Navigate to={SIGN_IN_PATH} replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default AuthGuard;

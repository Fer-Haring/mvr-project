import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarUtils from "@webapp/components/snackbar";
import { emitter } from '@webapp/sdk/actions/auth/event-emitter';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectToLogin = () => {
      localStorage.clear();
      navigate('/sign-in', { replace: true });
      SnackbarUtils.error('La Sesión ha expirado, por favor inicie sesión nuevamente.');
    };

    emitter.on('redirectToLogin', handleRedirectToLogin);

    return () => {
      emitter.off('redirectToLogin', handleRedirectToLogin);
    };
  }, [navigate]);

  return {};
};
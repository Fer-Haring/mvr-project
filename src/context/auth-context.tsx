import SnackbarUtils from '@webapp/components/snackbar';
import { emitter } from '@webapp/services/actions/auth/event-emitter';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

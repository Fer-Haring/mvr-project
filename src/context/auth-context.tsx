import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emitter } from '@webapp/service/actions/auth/event-emitter';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectToLogin = () => {
      localStorage.clear();
      navigate('/sign-in', { replace: true });
      toast.error('La Sesión ha expirado, por favor inicie sesión nuevamente.');
    };

    emitter.on('redirectToLogin', handleRedirectToLogin);

    return () => {
      emitter.off('redirectToLogin', handleRedirectToLogin);
    };
  }, [navigate]);

  return {};
};
// useNavigateToLogin.ts
import { useNavigate } from 'react-router-dom';
import  SnackbarUtils from "@webapp/components/snackbar";

export function useNavigateToLogin() {
  const navigate = useNavigate();
  return () => {
    localStorage.clear();
    navigate('/login', { replace: true });
    SnackbarUtils.error('La Sesión ha expirado, por favor inicie sesión nuevamente.');
  };
}

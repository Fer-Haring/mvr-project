// useNavigateToLogin.ts
import { useNavigate } from 'react-router-dom';
import  toast from "@webapp/components/snackbar";

export function useNavigateToLogin() {
  const navigate = useNavigate();
  return () => {
    localStorage.clear();
    navigate('/login', { replace: true });
    toast.error('La Sesión ha expirado, por favor inicie sesión nuevamente.');
  };
}

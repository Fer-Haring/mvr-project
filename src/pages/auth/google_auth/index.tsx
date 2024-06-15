import { useUserGoogleStore } from '@webapp/store/auth/google-sessions';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const logIn = useUserGoogleStore((state) => state.logIn);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const googleToken = params.get('google_token');

    localStorage.setItem("Access Token:", accessToken!);
    localStorage.setItem("Google Token:", googleToken!);

    if (accessToken && googleToken) {
      try {
        // Decode the JWT token to extract the user information
        const userInfo: { sub: string; name: string } = jwtDecode<{ sub: string; name: string }>(accessToken);
        console.log("User Info:", userInfo);

        logIn(userInfo.sub, userInfo.name, accessToken);
        // Optionally store googleToken in case you need it for future use
        localStorage.setItem('google_token', googleToken);
        navigate('/home'); // Redirigir al home después de iniciar sesión
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate('/sign-in'); // Redirigir al login si hay un error al decodificar
      }
    } else {
      navigate('/sign-in'); // Redirigir al login si faltan tokens
    }
  }, [navigate, logIn]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;

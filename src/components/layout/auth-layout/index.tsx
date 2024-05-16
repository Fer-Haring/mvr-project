import { styled } from '@mui/material/styles';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import Card from '@webapp/components/card';
import LogoHeader from '@webapp/components/logo-header';
import React, { FunctionComponent } from 'react';

export interface AuthLayoutProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * The AuthLayout component provides a standard layout for authentication-related pages.
 *
 * @param {AuthLayoutProps} props - The props for the component.
 * @returns {React.ReactElement} - A styled div containing the layout.
 */
const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ className, children }) => {
  return (
    <MainWrapper>
      <BackgroundVideoStyle autoPlay loop muted className="bg-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </BackgroundVideoStyle>
      <Wrapper
        className={className || ''}
        role="main" // Define the role as "main" for the main content area
        aria-label="Main Content" // Provide an ARIA label for the main content area
      >
        <LogoHeader className="header" aria-label="Page Header" />

        <Card className="card" role="region" aria-label="Authentication Card">
          {children}
        </Card>
      </Wrapper>
    </MainWrapper>
  );
};

export default AuthLayout;

const MainWrapper = styled('div')(({ theme }) => ({
  position: 'relative', // Establecer la posición relativa aquí permite que el video se posicione absolutamente en relación a este contenedor
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  paddingBlockStart: theme.spacing(4),
  paddingBlockEnd: theme.spacing(4),
  width: '100vw',
  height: '100vh', // Asegúrate de que el contenedor ocupe toda la ventana gráfica
  overflow: 'hidden', // Esto evitará cualquier desbordamiento si el video es más grande que el contenedor
}));

const BackgroundVideoStyle = styled('video')({
  position: 'absolute', // Posición absoluta para cubrir todo el contenedor
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto asegurará que el video cubra todo el espacio disponible sin perder su proporción
  zIndex: -1, // Coloca el video detrás de todo el contenido
});

const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100dvh',
  width: '100vw',
  display: 'grid',
  placeItems: 'center',

  [theme.breakpoints.down('lg')]: {
    placeItems: 'inherit',
  },

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1),
    paddingBlockEnd: theme.spacing(4),
  },

  '.header': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
    },
  },

  '.card': {
    width: '35vw',
    transition: theme.transitions.create(['width'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),

    [theme.breakpoints.down('xl')]: {
      width: '50vw',
    },

    [theme.breakpoints.down('lg')]: {
      width: '60vw',
      justifySelf: 'center',
      alignSelf: 'center',
    },

    [theme.breakpoints.down('md')]: {
      width: '75vw',
    },

    [theme.breakpoints.down('sm')]: {
      width: `calc(100vw - ${theme.spacing(4)})`,
    },
  },
}));

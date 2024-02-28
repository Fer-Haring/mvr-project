import { Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import BackgroundImage from '@webapp/assets/images/content/background.jpg';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import { NAVBAR_HEIGHT } from '@webapp/mobile/components/sidebar';
import { FunctionComponent } from 'react';

export const MobileHomePage: FunctionComponent = () => {
  return (
    <Wrapper>
      <Box
        className="content"
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <InsideContent>
          <Typography variant="h1" component="h1" sx={{ fontFamily: 'WordMean' }}>
            Medicine Vape Room proximamente disponible para dispositivos móviles
          </Typography>
        </InsideContent>
      </Box>
    </Wrapper>
  );
};

export default ContentWrapper;

const Wrapper = styled('main')(() => ({
  position: 'relative',
  width: '100vw',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 0,
  margin: 0,
}));

const InsideContent = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  overflow: 'hidden',
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),

  '.content': {
    width: '100%',
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    margin: 0,
  },
}));

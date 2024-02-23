import Box from '@mui/material/Box';
import VapeHomeImage from '@webapp/assets/images/home/liquid-home.png';
import ContentWrapper from '@webapp/components/content-wrapper';
import { FunctionComponent } from 'react';

export const MobileHomePage: FunctionComponent = () => {
  return (
    <ContentWrapper>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <img src={VapeHomeImage} alt="Vape Home" style={{ width: '100%', height: '100%' }} />
      </Box>
    </ContentWrapper>
  );
};

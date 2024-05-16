import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import BackgroundImage from '@webapp/assets/images/content/background.jpg';
import { easing } from '@webapp/components/framer';
import Navbar from '@webapp/components/navbar';
import Sidebar, { NAVBAR_HEIGHT } from '@webapp/components/sidebar';
import { motion } from 'framer-motion';
import React, { FunctionComponent } from 'react';

import FullscreenLoading from '../fullscreen-loading';

interface ContentWrapperProps {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
}
const ContentWrapper: FunctionComponent<ContentWrapperProps> = ({ className, children, loading }) => {
  return (
    <Wrapper className={className || ''}>
      <Sidebar />
      <InsideContent>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ...easing }}
          style={{ width: '100%' }}
        >
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
            {children}
          </Box>
        </motion.div>
      </InsideContent>
      {loading && <FullscreenLoading />}
    </Wrapper>
  );
};

export default ContentWrapper;

const Wrapper = styled('main')(() => ({
  position: 'relative',
  width: '100vw',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: 0,
  margin: 0,
}));

const InsideContent = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
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
    alignItems: 'flex-start',
    padding: theme.spacing(2, 3),
    margin: 0,
  },
}));

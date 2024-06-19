import { styled } from '@mui/material/styles';
// Import necessary dependencies
import { easing } from '@webapp/components/framer';
import { useIsTablet } from '@webapp/hooks/is-tablet';
import { motion } from 'framer-motion';
import React, { FunctionComponent } from 'react';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import { url } from 'inspector';

/**
 * `HalfAndHalf` is a component that divides the screen into two sections, allowing content
 * in the left and right sections. It provides animation and control over the content of each section.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} [props.className] - Additional CSS classes for styling.
 * @param {React.ReactNode} props.leftContent - Content for the left section.
 * @param {boolean} [props.leftOverflow] - Whether the left section allows content overflow.
 * @param {React.ReactNode} props.rightContent - Content for the right section.
 * @param {boolean} [props.rightOverflow] - Whether the right section allows content overflow.
 * @param {string} [props.mainSection] - The main section, either 'left' or 'right'.
 */

export interface HalfAndHalfProps {
  className?: string;
  leftContent: React.ReactNode;
  leftOverflow?: boolean;
  rightContent: React.ReactNode;
  rightOverflow?: boolean;
  mainSection?: 'left' | 'right';
}

const HalfAndHalf: FunctionComponent<HalfAndHalfProps> = ({
  className,
  leftContent,
  leftOverflow,
  rightContent,
  rightOverflow,
  mainSection = 'left',
}) => {
  const isTablet = useIsTablet();
  return (
    <Section
      className={`${className || ''} ${mainSection ? `${mainSection}-first` : ''}`}
      role="region"
      aria-label={mainSection === 'left' ? 'Left Section' : 'Right Section'}
    >
      <motion.div
        className="left"
        initial={isTablet ? { opacity: 0 } : { x: '-100%', opacity: 0 }}
        animate={isTablet ? { opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{
          ...easing,
          opacity: {
            duration: 0.5,
          },
        }}
        role="region"
        aria-label="Left Section Content"
      >
        {isTablet && mainSection === 'left' && (
          <VideoBackground autoPlay loop muted>
            <source src={BackgroundVideo} type="video/mp4" />
          </VideoBackground>
        )}
        <div className={`left-content ${leftOverflow && !isTablet ? 'overflow' : ''}`}>{leftContent}</div>
      </motion.div>
      <motion.div
        className="right"
        initial={isTablet ? { opacity: 0 } : { x: '100%', opacity: 0 }}
        animate={isTablet ? { opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{
          ...easing,
          opacity: {
            duration: 0.5,
          },
        }}
        role="region"
        aria-label="Right Section Content"
      >
        <div className={`right-content ${rightOverflow && !isTablet ? 'overflow' : ''}`}>{rightContent}</div>
      </motion.div>
    </Section>
  );
};

/**
 * Default props for the `HalfAndHalf` component.
 */
HalfAndHalf.defaultProps = {
  className: '',
  leftOverflow: false,
  rightOverflow: false,
  mainSection: 'left',
};

export default HalfAndHalf;

const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  [theme.breakpoints.down('md')]: {
    '&.left-first': {
      flexDirection: 'column',
      '.right': {
        display: 'none',
      },
    },
    '&.right-first': {
      flexDirection: 'column-reverse',
      '.left': {
        display: 'none',
      },
    },
  },
  '.left': {
    width: '50vw',
    height: '100vh',
    maxHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxHeight: 'none',
    },
    '.left-content': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  },
  '.right': {
    width: '50vw',
    height: '100vh',
    maxHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxHeight: 'none',
    },
    '.right-content': {
      width: '100%',
      height: '100%',
    },
  },
  '.overflow': {
    overflowY: 'auto',
  },
}));

const VideoBackground = styled('video')({
  position: 'absolute', // Posición absoluta para cubrir todo el contenedor
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto asegurará que el video cubra todo el espacio disponible sin perder su proporción
  zIndex: -1, // Coloca el video detrás de todo el contenido
});
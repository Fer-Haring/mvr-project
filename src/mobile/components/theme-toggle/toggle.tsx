import { alpha, styled } from '@mui/material/styles';
import { easing } from '@webapp/mobile/components/framer';
import { motion } from 'framer-motion';
import React, { FunctionComponent } from 'react';

/**
 * Props for the Toggle component.
 * @prop {string} className Optional class name for the toggle component.
 * @prop {boolean} isActive Indicates whether the toggle is active.
 * @prop {() => void} onClick Callback function for click events.
 */
interface ToggleProps {
  className?: string;
  isActive?: boolean;
}

const TOGGLE_CIRCLE_SIZE = 16;
const TOGGLE_WIDTH_WHEN_INACTIVE = TOGGLE_CIRCLE_SIZE; // Renamed for clarity
const TOGGLE_WIDTH_WHEN_ACTIVE = TOGGLE_CIRCLE_SIZE * 2 + 4; // Full width when active
const TOGGLE_HEIGHT_WITH_SPACING = TOGGLE_CIRCLE_SIZE + 4; // Height including spacing

const Toggle: FunctionComponent<ToggleProps> = ({ className, isActive = false }) => {
  const [active, setActive] = React.useState(isActive);

  React.useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const BackgroundVariants = {
    rest: {
      width: TOGGLE_WIDTH_WHEN_INACTIVE,
      height: TOGGLE_CIRCLE_SIZE,
      opacity: 0,
      transition: {
        width: {
          duration: 0.8,
          ...easing,
        },
        opacity: {
          duration: 0.8,
          ...easing,
        },
      },
    },
    hover: {
      width: TOGGLE_WIDTH_WHEN_ACTIVE,
      height: TOGGLE_HEIGHT_WITH_SPACING,
      opacity: 1,
      transition: {
        width: {
          duration: 0.4,
          ...easing,
        },
        opacity: {
          duration: 0.4,
          ...easing,
        },
      },
    },
  };

  return (
    <ToggleContainer className={className || ''} initial="rest" whileHover="hover" animate="rest" aria-pressed={active}>
      <ToggleBackground className="toggle-background" variants={BackgroundVariants} />
      <ToggleCircle className={`toggle-circle ${active ? 'active' : ''}`} data-active={active} />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled(motion.div)(({ theme }) => ({
  '--toggle-circle-size': `${TOGGLE_CIRCLE_SIZE}px`,

  position: 'relative',
  cursor: 'pointer',
  height: 'var(--toggle-circle-size)',
  width: `calc(var(--toggle-circle-size) * 2 + ${theme.spacing(0.5)})`,
  display: 'inline-flex', // Ensures it's focusable
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    '.toggle-circle': {
      '&.active, &[data-active="true"]': {
        left: theme.spacing(0.5),
      },
    },
  },
}));

const ToggleBackground = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-0.25),
  right: theme.spacing(-0.25),
  display: 'flex',
  padding: 0,
  backgroundColor: alpha(theme.palette.text.primary, 0.25),
  borderRadius: 'calc(var(--toggle-circle-size) + 2px)',
}));

const ToggleCircle = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  left: `calc(var(--toggle-circle-size) + ${theme.spacing(0.5)})`,
  pointerEvents: 'none',
  width: 'var(--toggle-circle-size)',
  height: 'var(--toggle-circle-size)',
  aspectRatio: '1',
  borderRadius: '50%',
  backgroundColor: theme.palette.common.black, // Default color
  transition: theme.transitions.create(['background-color', 'left'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeIn,
  }),

  '&.active, &[data-active="true"]': {
    backgroundColor: theme.palette.common.white, // Active color
  },
}));

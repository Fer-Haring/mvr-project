import { alpha, styled } from '@mui/material/styles';
import { easing } from '@webapp/components/framer';
import { motion, useReducedMotion } from 'framer-motion';
import React, { FunctionComponent } from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  role?: React.AriaRole;
}

const Card: FunctionComponent<CardProps> = ({ className, children }) => {
  const shouldReduceMotion = useReducedMotion();

  const CardVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <CardComp
      className={className || ''}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={shouldReduceMotion ? {} : CardVariants}
      transition={{
        duration: 0.5,
        ...easing,
      }}
    >
      {children}
    </CardComp>
  );
};

export default Card;

const CardComp = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(8, 6),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: `0 1px 1px 0 ${
    theme.palette.mode === 'dark' ? alpha(theme.palette.text.primary, 0.5) : alpha(theme.palette.text.primary, 0.1)
  } inset, 0 24px 48px 0 ${alpha(theme.palette.text.primary, 0.06)} inset, 0 0 24px ${alpha(
    theme.palette.common.black,
    0.2
  )}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${alpha(theme.palette.background.default, 0.5)} !important`,
  backdropFilter: 'blur(10px)',

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 3),
    width: '100%',
  },
}));

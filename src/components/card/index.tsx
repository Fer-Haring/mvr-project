import { alpha, styled } from '@mui/material/styles';
import { easing } from '@webapp/components/framer';
import { motion, useReducedMotion } from 'framer-motion';
import React, { FunctionComponent } from 'react';


interface CardProps {
  className?: string;
  children: React.ReactNode;
  role?: React.AriaRole;
  background_color?: 'black' | 'white' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'default';
  opacity?: number;
}

const Card: FunctionComponent<CardProps> = ({ className, children, background_color = 'default', opacity = 0.8 }) => {
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
      className={className ?? ''}
      initial="hidden"
      animate="show"
      exit="hidden"
      background_color={background_color}
      opacity={opacity}
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

const CardComp = styled(motion.div)<{ background_color: string, opacity: number }>(({ theme, background_color, opacity }) => {
  const backgroundColors: Record<string, string> = {
    black: theme.palette.common.black,
    white: theme.palette.common.white,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    default: theme.palette.background.default,
  };


  const bgColor = backgroundColors[background_color] || theme.palette.background.default;

  return {
    padding: theme.spacing(8, 6),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 1px 1px 0 ${
      theme.palette.mode === 'dark' ? alpha(theme.palette.text.primary, 0.5) : alpha(theme.palette.text.primary, 0.1)
    } inset, 0 24px 48px 0 ${alpha(theme.palette.text.primary, 0.06)} inset, 0 0 24px ${alpha(
      theme.palette.common.black,
      0.2
    )}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${alpha(bgColor, opacity)} !important`, // Aplica el color con alpha
    backdropFilter: 'blur(10px)',

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 3),
      width: '100%',
    },
  };
});
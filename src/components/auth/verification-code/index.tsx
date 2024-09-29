import { FunctionComponent } from 'react';

import ReactInputVerificationCode from 'react-input-verification-code';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

const codeLength = 6;

const Wrapper = styled(Box)(({ theme }) => ({
  '.ReactInputVerificationCode__container': {
    gap: theme.spacing(1),
    width: 'auto',
    maxWidth: `calc( var(--ReactInputVerificationCode-itemWidth) * ${codeLength} + var(--ReactInputVerificationCode-itemSpacing) * (${codeLength} - 1) )`,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
    },
  },
  '.ReactInputVerificationCode__input': {
    [theme.breakpoints.down('sm')]: {
      left: '0 !important',
    },
  },
  '.ReactInputVerificationCode__item': {
    position: 'relative',
    color: theme.palette.text.primary,
    border: '3px solid',
    borderColor: alpha(theme.palette.text.primary, 0.75),
    boxShadow: 'none',
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    transition: theme.transitions.create(['border-color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    aspectRatio: '1/1',

    [theme.breakpoints.down('sm')]: {
      minWidth: '30%',
      flexGrow: 0,
    },

    '&:after': {
      content: '""',
      width: 0,
      position: 'absolute',
      bottom: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
      height: 2,
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['background-color', 'width'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    '&.is-active': {
      boxShadow: 'none',
      borderColor: theme.palette.primary.main,
      '&:after': {
        width: '30%',
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '&.error': {
    '.ReactInputVerificationCode__item': {
      borderColor: theme.palette.error.main,
    },
  },
  '&.success': {
    '.ReactInputVerificationCode__item': {
      borderColor: theme.palette.success.main,
    },
  },
}));

interface VerificationCodeCtrlProps {
  className?: string;
  value?: string; // Add value prop
  placeholder?: string;
  length?: number;
  error?: boolean;
  success?: boolean;
  onChange: (data: string) => void;
  onCompleted: (data: string) => void;
}

const VerificationCodeCtrl: FunctionComponent<VerificationCodeCtrlProps> = ({
  className,
  value, // Use value prop
  placeholder,
  length = codeLength,
  error,
  success,
  onChange,
  onCompleted,
}) => {
  return (
    <Wrapper
      className={`${className || ''} ${error ? 'error' : ''} ${success ? 'success' : ''}`}
      role="group"
      aria-label="Verification Code Input"
    >
      <ReactInputVerificationCode
        length={length}
        autoFocus
        placeholder={placeholder || ''}
        value={value} // Pass value prop
        onChange={(data) => onChange(data)}
        onCompleted={(data) => onCompleted(data)}
        aria-label="Verification Code Input"
      />
    </Wrapper>
  );
};


export default VerificationCodeCtrl;

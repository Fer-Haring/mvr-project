import React, { FunctionComponent } from 'react';

import { SxProps, styled, Theme } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  border: 0,
  maxWidth: 700,
  backgroundColor: theme.palette.customBackground.main,
}));

interface PaperWrapperProps {
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PaperWrapper: FunctionComponent<PaperWrapperProps> = ({ className, children, sx }) => {
  return (
    <Wrapper className={className || ''} sx={{ ...sx }} role="region">
      {children}
    </Wrapper>
  );
};

export default PaperWrapper;

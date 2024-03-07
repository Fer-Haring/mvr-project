import React, { FunctionComponent } from 'react';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface TitleBarProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

const TitleBar: FunctionComponent<TitleBarProps> = ({ className, title, children }) => {
  return (
    <Wrapper className={className || ''}>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      {children}
    </Wrapper>
  );
};

export default TitleBar;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  gap: theme.spacing(2),
  marginBlockEnd: theme.spacing(2),
}));

import React, { FunctionComponent } from 'react';

import { default as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { alpha, styled } from '@mui/material/styles';

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 180,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

interface MenuProps extends MuiMenuProps {
  className?: string;
  children: React.ReactNode;
}

const Menu: FunctionComponent<MenuProps> = ({ className, children, ...props }) => {
  return (
    <StyledMenu
      className={className || ''}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      role="menu" // Add a role attribute to indicate that this is a menu
      aria-labelledby="menu-button" // Provide an ARIA label indicating the element that triggers the menu
      {...props}
    >
      {children}
    </StyledMenu>
  );
};

export default Menu;

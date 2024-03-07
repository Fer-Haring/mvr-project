import React, { FunctionComponent } from 'react';

import { PaletteMode } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { alpha, styled, useTheme } from '@mui/material/styles';

/**
 * Type definition for the properties of the sidebar item.
 */
export type SidebarItemType = {
  icon: React.ReactNode;
  label: string;
  to: string;
  private: boolean;
};

/**
 * Props for the SidebarItem component.
 */
interface SidebarItemProps {
  className?: string;
  collapsed?: boolean;
  active?: boolean;
  item: SidebarItemType;
  disabled?: boolean;
  onClick: () => void;
}

/**
 * A component that renders an individual item in a sidebar.
 * It changes appearance based on whether the sidebar is collapsed
 * and whether the item is currently active.
 *
 * @component
 * @param {SidebarItemProps} props - The properties of the component.
 * @returns {JSX.Element} The SidebarItem component.
 */
const SidebarItem: FunctionComponent<SidebarItemProps> = ({
  className,
  collapsed,
  active,
  item,
  disabled,
  onClick,
}) => {
  const theme = useTheme();
  const colorMode = theme.palette.mode;

  // Use Tooltip for collapsed items and apply appropriate ARIA
  return collapsed ? (
    <Tooltip title={item.label} placement="right" arrow>
      <Item
        className={className || ''}
        colorMode={colorMode}
        data-active={active}
        selected={active}
        disabled={disabled}
        data-collapsed={true}
        aria-label={item.label}
        aria-selected={active} // Reflects the selection state to assistive technologies
        role="menuitem" // Identifies the element as a menuitem for accessibility purposes
        onClick={onClick}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
      </Item>
    </Tooltip>
  ) : (
    // For non-collapsed items, display the icon and text
    <Item
      className={className || ''}
      colorMode={colorMode}
      data-active={active}
      selected={active}
      disabled={disabled}
      aria-label={item.label}
      aria-selected={active} // Reflects the selection state to assistive technologies
      role="menuitem" // Identifies the element as a menuitem for accessibility purposes
      onClick={onClick}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </Item>
  );
};

export default SidebarItem;

/**
 * Styled component for the sidebar item button with support for theming and accessibility features.
 *
 * @param {PaletteMode} colorMode - The mode of the color palette (light or dark).
 * @returns {JSX.Element} A styled ListItemButton with theming based on the `colorMode` prop.
 */
const Item = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'colorMode',
})<{ colorMode?: PaletteMode }>(({ theme, colorMode }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5, 2, 1.5, 3),
  gap: theme.spacing(2),
  color: theme.palette.text.primary,
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 2,
    opacity: 0,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  '&:hover': {
    backgroundColor:
      colorMode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.primary.dark, 0.1),
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.text.primary,
    maxWidth: 'unset',
    minWidth: 'unset',
    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(3),
    },
  },
  '&[data-active="true"]': {
    color: theme.palette.primary.main,
    backgroundColor:
      colorMode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.primary.dark, 0.1),
    '&:hover': {
      backgroundColor:
        colorMode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.primary.dark, 0.1),
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '&:after': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
      boxShadow: `${theme.spacing(-1, 0, 2)} ${theme.palette.primary.main}, ${theme.spacing(-1, -1, 2)} ${alpha(
        theme.palette.primary.main,
        0.5
      )}`,
    },
  },
  '&[data-collapsed="true"]': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.25),
    width: 42,
    // margin: '0 auto',
    '&:after': {
      content: 'none',
      position: 'unset',
      top: 'unset',
      right: 'unset',
      bottom: 'unset',
      left: 'unset',
      width: 'unset',
      backgroundColor: 'unset',
    },
  },
}));

import { default as MuiAvatar } from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { logout } from '@webapp/sdk/firebase/auth';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const AvatarWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  width: 40,
  height: 40,
  transition: theme.transitions.create(['outline'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&[data-highlight="true"]': {
    outline: `1px solid ${theme.palette.secondary.light}`,
    '& .mui-avatar': {
      width: 40,
      height: 40,
    },
  },
  '& .avatar-button': {
    width: 40,
    height: 40,
  },
  '& .mui-avatar': {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(0.5),
    width: 40,
    height: 40,
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '& .mui-avatar-text': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.h4.fontSize,
    },
  },
}));

const DangerMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
  '&:hover:not(&.Mui-selected)': {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.light, 0.25),
  },
}));

interface AvatarProps {
  className?: string;
  active?: boolean;
  fullName: string;
  imageSrc?: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ className, active, fullName, imageSrc }) => {
  const intl = useIntl();
  const theme = useTheme();
  const navigate = useNavigate();
  const { cleanUserLogout } = useUserData();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const getAvatarSizeWithMargin = () => {
    if (window.innerWidth > theme.breakpoints.values.md) {
      return 72;
    }
    return 40;
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = async () => {
    await logout();
    cleanUserLogout();
    navigate('/sign-in');
  };

  return (
    <AvatarWrapper className={className || ''} data-highlight={active}>
      <IconButton
        className="avatar-button"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
          }
        }}
        size="small"
        aria-controls={open ? 'avatar-menu' : undefined} // ARIA attribute for controlling the menu
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined} // ARIA attribute for menu state
      >
        <MuiAvatar className="mui-avatar" variant="square" src={imageSrc}>
          {!imageSrc && (
            <Typography className="mui-avatar-text" variant="body2" color="inherit">
              {getInitials(fullName)}
            </Typography>
          )}
        </MuiAvatar>
      </IconButton>
      <Popover
        id="avatar-menu"
        className="avatar-menu"
        aria-labelledby="avatar-button" // ARIA attribute to specify the label for the menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: getAvatarSizeWithMargin(),
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: theme.spacing(1),
            boxShadow: theme.shadows[4],
            width: 200,
            backgroundColor: theme.palette.common.black,
          },
        }}
      >
        <MenuItem
          divider={false}
          onClick={handleProfile}
          aria-label={intl.formatMessage({ id: 'PROFILE.TITLE' })}
          tabIndex={
            open ? 0 : -1 // ARIA attribute to specify the tab order of the element
          }
          sx={{ color: '#FFFFFF' }}
        >
          {intl.formatMessage({ id: 'PROFILE.TITLE' })}
        </MenuItem>
        <DangerMenuItem
          onClick={() => handleLogout()}
          aria-label={intl.formatMessage({ id: 'PROFILE.LOGOUT' })}
          tabIndex={
            open ? 0 : -1 // ARIA attribute to specify the tab order of the element
          }
        >
          {intl.formatMessage({ id: 'PROFILE.LOGOUT' })}
        </DangerMenuItem>
      </Popover>
    </AvatarWrapper>
  );
};

export default Avatar;

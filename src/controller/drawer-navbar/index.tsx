import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ImageLogo from '@webapp/assets/images/content/name-image.png';
import { COLLAPSED_SIDEBAR_WIDTH } from '@webapp/components/sidebar';
import SidebarItem from '@webapp/components/sidebar/sidebar-item';
import { sidebarItems } from '@webapp/components/sidebar/sidebarItems';
import { useUserData } from '@webapp/store/users/user-data';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const DrawerNavbar = () => {
  const { user } = useUserData();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="content">
        <img src={ImageLogo} alt="Logo" onClick={() => navigate('/home')} className="logo" />
        <List>
          {sidebarItems
            .filter((item) => !item.private || (item.private && user?.admin))
            .filter((item) => !item.private || item.private)
            .map((item) => (
              <SidebarItem
                key={item.to}
                collapsed={false}
                active={location.pathname.startsWith(item.to)}
                item={item}
                onClick={() => handleNavigate(item.to)}
              />
            ))}
        </List>
        <List className="positioned-button">
          <SidebarItem
            active={location.pathname === '/profile'}
            collapsed={false}
            onClick={() => handleNavigate('/profile')}
            item={{
              icon: <AccountBoxRoundedIcon />,
              label: 'Profile',
              to: '/profile',
              private: false,
            }}
          />
        </List>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ width: '6vw', height: '6vw' }} />
      </IconButton>
      <SidebarContainer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </SidebarContainer>
    </div>
  );
};

export default DrawerNavbar;

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  height: '100vh',
  background: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.common.black,
    transition: 'width 0.2s',
  },
  '& .logo': {
    width: '100%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  '&[data-collapsed="true"]': {
    width: COLLAPSED_SIDEBAR_WIDTH,
    paddingBlockEnd: theme.spacing(2),
    '& .wrapper-logo': {
      padding: theme.spacing(1),
    },
    '& .content': {
      '.MuiList-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
      },
    },
  },
  '.MuiList-root': {
    width: '100%',
    padding: 0,
  },
  '& .content': {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(4),
  },
  '& .positioned-button': {
    position: 'absolute',
    top: '92vh',
  },
}));

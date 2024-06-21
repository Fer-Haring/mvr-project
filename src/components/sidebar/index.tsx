import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import MvpLogo from '@webapp/assets/images/content/logo.png';
import ImageLogo from '@webapp/assets/images/content/name-image.png';
import { useUserData } from '@webapp/store/users/user-data';
import { motion, useReducedMotion } from 'framer-motion';
import React, { FunctionComponent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { easing } from '../framer';
import SidebarItem, { SidebarItemType } from './sidebar-item';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useUserStore } from '@webapp/store/auth/session';
import { User } from '@webapp/sdk/actions/auth/types';

const sidebarItems: SidebarItemType[] = [
  {
    icon: <HomeRoundedIcon />,
    label: 'Home',
    to: '/home',
    private: false,
  },
  {
    icon: <Inventory2RoundedIcon />,
    label: 'Productos',
    to: '/productos',
    private: false,
  },
  // {
  //   icon: <InfoRoundedIcon />,
  //   label: 'Sobre Nosotros',
  //   to: '/sobre-nosotros',
  //   private: false,
  // },
  {
    icon: <CallRoundedIcon />,
    label: 'Contacto',
    to: '/contacto',
    private: false,
  },
  {
    icon: <AdminPanelSettingsRoundedIcon />,
    label: 'Admin',
    to: '/admin-dashboard',
    private: true,
  },
];

/**
 * Props for `<Sidebar />`.
 *
 * @prop {string} [className] Optional CSS class to customize styling.
 */
interface SidebarProps {
  className?: string;
}

export const NAVBAR_HEIGHT = 70;
export const EXPANDED_SIDEBAR_WIDTH = 260;
export const COLLAPSED_SIDEBAR_WIDTH = 70;

/**
 * Sidebar component that can toggle between expanded and collapsed states.
 *
 * @component
 * @param {SidebarProps} props The props for this component.
 * @returns {React.ReactElement} The Sidebar component.
 */
const Sidebar: FunctionComponent<SidebarProps> = ({ className }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useUserData();
  const [collapsed, setCollapsed] = React.useState<boolean>(localStorage.getItem('sidebarCollapsed') === 'true');
  const userData = useGetUserByIdMutation(useUserStore((state) => state.userInfo?.userId) || '');

  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
    document.body.dataset.sidebarCollapsed = String(collapsed);
  }, [collapsed]);

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  useEffect(() => {
      if (userData) {
        setUser(userData.data as User);
      }
  }, [userData.data]);

  return (
    <SidebarContainer
      className={className || ''}
      role="complementary" // ARIA role for secondary sidebar content
      aria-expanded={!collapsed} // ARIA attribute to indicate expandable content
      animate={{
        width: shouldReduceMotion ? undefined : collapsed ? COLLAPSED_SIDEBAR_WIDTH : EXPANDED_SIDEBAR_WIDTH,
      }}
      transition={
        shouldReduceMotion
          ? {}
          : {
              duration: 0.2,
              ...easing,
            }
      }
      data-collapsed={collapsed}
    >
      <div className="wrapper-logo" aria-label="Site logo">
        {collapsed ? (
          <img src={MvpLogo} alt="Logo" onClick={() => navigate('/home')} />
        ) : (
          <img src={ImageLogo} alt="Logo" onClick={() => navigate('/home')} /> // ARIA hidden since it's purely decorative when collapsed
        )}
      </div>
      <div className="content">
        <List>
          {sidebarItems
            // .filter((item) => !item.private || (item.private && user.admin ))
            .filter((item) => !item.private || (item.private ))
            .map((item) => (
              <SidebarItem
                key={item.to}
                collapsed={collapsed}
                active={location.pathname.startsWith(item.to)}
                item={item}
                onClick={() => handleNavigate(item.to)}
              />
            ))}
        </List>
        <List>
          <SidebarItem
            active={location.pathname === '/profile'}
            collapsed={collapsed}
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
      <div className="positioned-button">
        <ExpandButton
          whileHover={{
            scale: 1.25,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <KeyboardArrowRightRoundedIcon htmlColor={theme.palette.text.primary} />
          ) : (
            <KeyboardArrowLeftRoundedIcon htmlColor={theme.palette.text.primary} />
          )}
        </ExpandButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  width: EXPANDED_SIDEBAR_WIDTH,
  zIndex: theme.zIndex.appBar,
  height: '100vh',
  background: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  position: 'relative',
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
  '& .wrapper-logo': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: NAVBAR_HEIGHT,
    padding: theme.spacing(1, 2),
    '& .logo, & .isologo': {
      height: '100%',
      width: 'auto',
    },
    '& .logo': {
      maxWidth: 200,
    },
    '& .isologo': {
      width: 40,
      height: 40,
    },
  },
  '& .content': {
    width: '100%',
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(4),
  },
  '& .positioned-button': {
    position: 'absolute',
    // top: `calc(${NAVBAR_HEIGHT}px / 2)`,
    top: '50vh',
    right: 5,
    transform: 'translate(70%, -50%)',
  },
}));

const ExpandButton = styled(motion.button)(({ theme }) => ({
  width: 26,
  height: 26,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

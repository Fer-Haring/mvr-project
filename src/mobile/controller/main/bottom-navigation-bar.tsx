import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { styled, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { auth } from '@webapp/sdk/firebase/firebase';
import { getUser } from '@webapp/sdk/firebase/user';
import { useUserStore } from '@webapp/store/auth/session';
import { useUserData } from '@webapp/store/users/user-data';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigationBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const userId = auth.currentUser?.uid;
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isMobile = useIsMobile();
  const { user, setUser } = useUserData();

  React.useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(userId!);
      if (userData) {
        setUser(userData);
      }
    };

    fetchData();
  }, [setUser, userId]);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    isLoggedIn &&
    isMobile && (
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: theme.palette.grey[600] }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{ backgroundColor: theme.palette.grey[900] }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <CustomBottomNavigationAction
            label="Inicio"
            value="/home"
            icon={<HomeRoundedIcon />}
            onClick={() => navigate('/home')}
          />
          <CustomBottomNavigationAction
            label="Productos"
            value="/productos"
            icon={<Inventory2RoundedIcon />}
            onClick={() => navigate('/productos')}
          />
          <CustomBottomNavigationAction
            label="Contacto"
            value="/contacto"
            icon={<CallRoundedIcon />}
            onClick={() => navigate('/contacto')}
          />
          <CustomBottomNavigationAction
            label="Perfil"
            value="/profile"
            icon={<AccountBoxRoundedIcon />}
            onClick={() => navigate('/profile')}
          />
          {user?.admin && (
            <CustomBottomNavigationAction
              label="Admin"
              value="/admin-dashboard"
              icon={<AdminPanelSettingsRoundedIcon />}
              onClick={() => navigate('/admin-dashboard')}
            />
          )}
        </BottomNavigation>
      </Paper>
    )
  );
};

export default BottomNavigationBar;

const CustomBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.grey[200],
  '& .MuiBottomNavigationAction-label': {
    display: 'none',
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    width: 24,
    height: 24,
    '& .MuiBottomNavigationAction-label': {
      display: 'block',
    },
    // border: `2px solid ${theme.palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '50%',
      width: 52,
      height: 52,
      padding: 4,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { auth } from '@webapp/sdk/firebase/firebase';
import { getUser } from '@webapp/sdk/firebase/user';
import { useUserData } from '@webapp/store/users/user-data';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNavigationBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const userId = auth.currentUser?.uid;
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

  return (
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
        <BottomNavigationAction label="Inicio" icon={<HomeRoundedIcon />} onClick={() => navigate('/home')} />
        <BottomNavigationAction
          label="Productos"
          icon={<Inventory2RoundedIcon />}
          onClick={() => navigate('/productos')}
        />
        <BottomNavigationAction label="Contacto" icon={<CallRoundedIcon />} onClick={() => navigate('/contacto')} />
        <BottomNavigationAction label="Perfil" icon={<AccountBoxRoundedIcon />} onClick={() => navigate('/profile')} />
        {user?.admin && (
          <BottomNavigationAction
            label="Admin"
            icon={<AdminPanelSettingsRoundedIcon />}
            onClick={() => navigate('/admin-dashboard')}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;

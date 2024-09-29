import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { SidebarItemType } from './sidebar-item';

export const sidebarItems: SidebarItemType[] = [
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

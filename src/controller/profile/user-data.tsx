import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { User } from '@webapp/sdk/actions/auth/types';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import PaymentTypeButtons from './botones-metodo-pago';
import DeliveryTypeButtons from './botones-tipo-entrega';
import UserInfoPersonal from './user-info-personal';

interface UserDataProps {
  className?: string;
  userData: User;
}

const UserData: FunctionComponent<UserDataProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const { user } = useUserData();

  return (
    <Box
      className={className || ''}
      sx={{ padding: 6, paddingLeft: 8 }}
      aria-label={formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
    >
      <Stack gap={4} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <UserInfoPersonal userData={user} />
        <DeliveryTypeButtons userData={user} />
        <PaymentTypeButtons userData={user} />
      </Stack>
    </Box>
  );
};

export default UserData;

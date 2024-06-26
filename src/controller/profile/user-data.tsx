import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { User } from '@webapp/sdk/types/user-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import PaymentTypeButtons from './botones-metodo-pago';
import DeliveryTypeButtons from './botones-tipo-entrega';
import UserInfoPersonal from './user-info-personal';

interface UserDataProps {
  className?: string;
  userData: User;
}

const UserData: FunctionComponent<UserDataProps> = ({ className, userData }) => {
  const { formatMessage } = useIntl();

  return (
    <Box
      className={className || ''}
      sx={{ padding: 6, paddingLeft: 8 }}
      aria-label={formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
    >
      <Stack gap={4} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <UserInfoPersonal userData={userData} />
        <DeliveryTypeButtons userData={userData} />
        <PaymentTypeButtons userData={userData} />
      </Stack>
    </Box>
  );
};

export default UserData;

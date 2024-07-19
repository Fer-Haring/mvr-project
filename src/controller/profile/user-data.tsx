import Stack from '@mui/material/Stack';
import { User } from '@webapp/sdk/types/user-types';
import React from 'react';

import PaymentTypeButtons from './botones-metodo-pago';
import DeliveryTypeButtons from './botones-tipo-entrega';

interface UserDataProps {
  className?: string;
  userData: User;
}

const UserData: React.FunctionComponent<UserDataProps> = ({ userData }) => {
  return (
    <Stack gap={4} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <DeliveryTypeButtons userData={userData} />
      <PaymentTypeButtons userData={userData} />
    </Stack>
  );
};

export default UserData;

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { updateUserInDb } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import { useUserId } from '@webapp/store/users/user-id';
import React from 'react';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';


interface CurrencySelectButtonsProps {
  className?: string;
  userData: User;
}

const CurrencySelectButtons: FunctionComponent<CurrencySelectButtonsProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { userId } = useUserId();
  const { setUser } = useUserData();
  const [preferredCurrency, setPreferredCurrency] = useState(userData.preferred_currency);
  const { setOrder, order } = useMessageStore();

  const handleSelectDollar = () => {
    setPreferredCurrency('USD');
    handleOnChange('USD');
  };

  const handleSelectArs = () => {
    setPreferredCurrency('ARS');
    handleOnChange('ARS');
  };

  const handleOnChange = (selectedCurrency: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ignoredUserId, ...restOfUserData } = userData;
    updateUserInDb({ userId, ...restOfUserData, preferredCurrency: selectedCurrency });
    setUser({ ...userData, preferred_currency: selectedCurrency });
    setOrder({ ...order, currency_used_to_pay: selectedCurrency });
  };

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={'1.6vw'}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'CART.PAYMENT.SELECT.CURRENCY' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Button
          onClick={handleSelectDollar}
          onSelect={() => handleOnChange('USD')}
          color={preferredCurrency === 'USD' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'CART.PAYMENT.USD' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.USD' })}
        </Button>
        <Button
          onClick={handleSelectArs}
          onSelect={() => handleOnChange('ARS')}
          color={preferredCurrency === 'ARS' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'CART.PAYMENT.ARS' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.ARS' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default CurrencySelectButtons;
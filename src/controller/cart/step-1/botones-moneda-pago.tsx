import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import React from 'react';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface CurrencySelectButtonsProps {
  className?: string;
  userData: User;
  setUser: (user: User) => void;
  setIsCurrencyPayValid: (isValid: boolean) => void;
}

const CurrencySelectButtons: FunctionComponent<CurrencySelectButtonsProps> = ({
  userData,
  setIsCurrencyPayValid,
  setUser,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [preferredCurrency, setPreferredCurrency] = useState(userData?.preferred_currency);
  const setOrder = useMessageStore((state) => state.setOrder);
  const order = useMessageStore((state) => state.order);

  const handleSelectDollar = () => {
    setPreferredCurrency('USD');
    handleOnChange('USD');
  };

  const handleSelectArs = () => {
    setPreferredCurrency('ARS');
    handleOnChange('ARS');
  };

  const handleOnChange = async (selectedCurrency: string) => {
    const updatedUserData = { ...userData, preferred_currency: selectedCurrency };
    setIsCurrencyPayValid(true);
    setUser(updatedUserData);
    setOrder({ ...order, currency_used_to_pay: selectedCurrency });
  };

  React.useEffect(() => {
    if (userData?.preferred_currency) {
      setIsCurrencyPayValid(true);
    }
  }, [userData?.preferred_currency]);

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={isMobile ? '3vw' : '1.6vw'}
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
          size="small"
          onClick={handleSelectDollar}
          color={preferredCurrency === 'USD' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'CART.PAYMENT.USD' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.USD' })}
        </Button>
        <Button
          size="small"
          onClick={handleSelectArs}
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

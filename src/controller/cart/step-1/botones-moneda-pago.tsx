import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { User } from '@webapp/sdk/users-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface CurrencySelectButtonsProps {
  className?: string;
  userData: User;
}

const CurrencySelectButtons: FunctionComponent<CurrencySelectButtonsProps> = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [deliveryType, setDeliveryType] = useState('');
  const { setOrder, order } = useMessageStore();

  const handleSelectDollar = () => {
    setDeliveryType('USD');
    handleOnChange('USD');
  };

  const handleSelectArs = () => {
    setDeliveryType('ARS');
    handleOnChange('ARS');
  };

  const handleOnChange = (selectedDelivery: string) => {
    setOrder({ ...order, currencyUsedToPay: selectedDelivery });
  };

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={24}
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
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={handleSelectDollar}
          onSelect={() => handleOnChange('USD')}
          sx={{
            width: '100%',
            maxWidth: '236px',
            height: '48px',
            backgroundColor: deliveryType === 'USD' ? theme.palette.primary.main : theme.palette.grey[200],
            border: deliveryType === 'USD' ? 'none' : `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: deliveryType === 'USD' ? theme.palette.primary.main : theme.palette.grey[300],
              border: deliveryType === 'USD' ? 'none' : `1px solid ${theme.palette.divider}`,
            },
          }}
          aria-label={formatMessage({ id: 'CART.PAYMENT.USD' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.USD' })}
        </Button>
        <Button
          onClick={handleSelectArs}
          onSelect={() => handleOnChange('ARS')}
          sx={{
            width: '100%',
            maxWidth: '236px',
            height: '48px',
            backgroundColor: deliveryType === 'ARS' ? theme.palette.primary.main : theme.palette.grey[200],
            border: deliveryType === 'ARS' ? 'none' : `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: deliveryType === 'ARS' ? theme.palette.primary.main : theme.palette.grey[300],
              border: deliveryType === 'ARS' ? 'none' : `1px solid ${theme.palette.divider}`,
            },
          }}
          aria-label={formatMessage({ id: 'CART.PAYMENT.ARS' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.ARS' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default CurrencySelectButtons;

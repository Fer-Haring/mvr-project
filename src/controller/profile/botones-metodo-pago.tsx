import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface PaymentTypeButtonsProps {
  className?: string;
  userData: User;
}

const PaymentTypeButtons: FunctionComponent<PaymentTypeButtonsProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const { setUser } = useUserData();
  const theme = useTheme();
  const { mutate } = useUpdateUser(userData?.id);

  const [selectedPaymentType, setSelectedPaymentType] = useState(userData?.payment_method || '');

  const selectPaymentType = (paymentType: string) => {
    setSelectedPaymentType(paymentType);
    handleOnChange(paymentType);
  };

  const handleOnChange = (selected_delivery: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ignoredUserId, ...restOfUserData } = userData;
    mutate({ payload: { ...restOfUserData, payment_method: selected_delivery } });
    setUser({ ...userData, payment_method: selected_delivery });
  };

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={16}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.PAYMENT' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4,
            maxWidth: '236px',
            width: '100%',
          }}
        >
          <Button
            onClick={() => selectPaymentType('Efectivo')}
            color={selectedPaymentType === 'Efectivo' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CASH' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CASH' })}
          </Button>
          <Button
            onClick={() => selectPaymentType('Tarjeta de crédito')}
            color={selectedPaymentType === 'Tarjeta de crédito' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CREDIT_CARD' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CREDIT_CARD' })}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4,
            maxWidth: '236px',
            width: '100%',
          }}
        >
          <Button
            onClick={() => selectPaymentType('Transferencia bancaria')}
            color={selectedPaymentType === 'Transferencia bancaria' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.BANK_TRANSFER' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.BANK_TRANSFER' })}
          </Button>
          <Button
            onClick={() => selectPaymentType('Pago contra entrega')}
            color={selectedPaymentType === 'Pago contra entrega' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.DELIVERY_PAY' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.DELIVERY_PAY' })}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 4,
          maxWidth: '236px',
          width: '100%',
          mt: 2,
        }}
      >
        <Button
          onClick={() => selectPaymentType('Pago con Crypto')}
          color={selectedPaymentType === 'Pago con Crypto' ? 'primary' : 'unselected'}
          aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CRYPTO' })}
        >
          {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CRYPTO' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default PaymentTypeButtons;

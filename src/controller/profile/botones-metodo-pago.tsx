import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';

interface PaymentTypeButtonsProps {
  className?: string;
  userData: User;
}

const PaymentTypeButtons: FunctionComponent<PaymentTypeButtonsProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const { setUser } = useUserData();
  const theme = useTheme();
  const {mutate} = useUpdateUser(userData?.id);

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

  const buttonStyle = (paymentType: string) => ({
    width: '100%',
    maxWidth: '236px',
    height: '48px',
    backgroundColor: selectedPaymentType === paymentType ? theme.palette.primary.main : theme.palette.grey[200],
    border: selectedPaymentType === paymentType ? 'none' : `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: selectedPaymentType === paymentType ? theme.palette.primary.main : theme.palette.grey[300],
      border: selectedPaymentType === paymentType ? 'none' : `1px solid ${theme.palette.divider}`,
    },
  });

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
            sx={buttonStyle('Efectivo')}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CASH' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CASH' })}
          </Button>
          <Button
            onClick={() => selectPaymentType('Tarjeta de crédito')}
            sx={buttonStyle('Tarjeta de crédito')}
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
            sx={buttonStyle('Transferencia bancaria')}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.BANK_TRANSFER' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.BANK_TRANSFER' })}
          </Button>
          <Button
            onClick={() => selectPaymentType('Pago contra entrega')}
            sx={buttonStyle('Pago contra entrega')}
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
          sx={buttonStyle('Pago con Crypto')}
          aria-label={formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CRYPTO' })}
        >
          {formatMessage({ id: 'COMMON.SELECTED.PAYMENT.CRYPTO' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default PaymentTypeButtons;

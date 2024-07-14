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
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface PaymentTypeButtonsProps {
  className?: string;
  userData: User;
  onValidChange?: (isValid: boolean) => void;
}

const PaymentTypeButtons: FunctionComponent<PaymentTypeButtonsProps> = ({ userData, onValidChange }) => {
  const { formatMessage } = useIntl();
  const { userId } = useUserId();
  const { setUser } = useUserData();
  const theme = useTheme();
  const { setOrder, order } = useMessageStore();

  const [selectedPaymentType, setSelectedPaymentType] = useState(userData?.payment_method || '');

  const selectPaymentType = (paymentType: string) => {
    setSelectedPaymentType(paymentType);
    handleOnChange(paymentType);
  };

  const handleOnChange = (selectedDelivery: string) => {
    if (onValidChange) {
      onValidChange(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ignoredUserId, ...restOfUserData } = userData;
    updateUserInDb({ userId, ...restOfUserData, paymentMethod: selectedDelivery });
    setUser({ ...userData, payment_method: selectedDelivery });
    setOrder({ ...order, payment_method: selectedDelivery });
  };

  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!userData?.payment_method);
    }
  }, []);

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={'1.6vw'}
        sx={{ mb: 2, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.PAYMENT' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 2,
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

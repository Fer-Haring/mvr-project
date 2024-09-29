import { Paper, alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React from 'react';
import { useIntl } from 'react-intl';

interface UserDataProps {
  order?: OrderResponse | undefined;
}

const UserData: React.FC<UserDataProps> = ({ order }) => {
  const { formatMessage } = useIntl();

  const translateStatus = (status: string | undefined) => {
    switch (status) {
      case 'pending':
      case 'Pending':
        return formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.STATUS.PENDING' });
      case 'canceled':
      case 'Canceled':
        return formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.STATUS.CANCELED' });
      case 'completed':
      case 'Completed':
        return formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.STATUS.COMPLETED' });
      default:
        return '';
    }
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(new Date(date), timeZone);
    const formattedDate = format(zonedDate, 'dd/MM/yyyy');

    return formattedDate;
  };

  return (
    <CustomAdminPaper>
      <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
        {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.DETAILS' })}
      </Typography>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ gap: 2 }}>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.ID' })}:</strong> {order?.order_id}
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.STATUS' })}:</strong>{' '}
            {translateStatus(order?.status)}
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.DATE' })}:</strong>{' '}
            {formatDate(order?.created_at)}
          </Typography>
        </Box>
        <Box sx={{ marginTop: '0px !important' }}>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.CLIENT' })}</strong> {order?.user?.name}{' '}
            {order?.user?.last_name}
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PAYMENT' })}:</strong>{' '}
            {order?.payment_method}
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.DELIVERY' })}:</strong>{' '}
            {order?.delivery_type}
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.CURRENCY.TO.PAY' })}:</strong>{' '}
            {order?.currency_used_to_pay}
          </Typography>
        </Box>
        <Box sx={{ marginTop: '0px !important' }}>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.DELIVERY_COST' })}</strong>{' '}
            $ {order?.delivery_cost} ARS
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.TOTAL_USD' })}:</strong> ${' '}
            {order?.total_order_amount_usd?.toFixed(2)} USD
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.TOTAL_ARS' })}:</strong> ${' '}
            {order?.total_order_amount_ars?.toFixed(2)} ARS
          </Typography>
        </Box>
      </Stack>
    </CustomAdminPaper>
  );
};

export default UserData;

const CustomAdminPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  height: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  border: 'none',
  boxShadow: theme.shadows[6],
  color: theme.palette.text.primary,
}));

import { Box, Stack, Typography } from '@mui/material';
import { CompletedOrder } from '@webapp/sdk/types/user-types';
import React from 'react';
import { useIntl } from 'react-intl';

interface OrderDetailModalContentProps {
  orderDetail: CompletedOrder;
}

const OrderDetailModalContent: React.FC<OrderDetailModalContentProps> = ({ orderDetail }) => {
  const { formatMessage } = useIntl();
  if (!orderDetail.cart_items) {
    return <Typography variant="h6">No items in this order</Typography>;
  }

  const formatStatus = (status: string | undefined) => {
    switch (status) {
      case 'completed':
      case 'Completed':
        return formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS.COMPLETED' });
      case 'canceled':
      case 'Canceled':
        return formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS.CANCELED' });
      case 'pending':
      case 'Pending':
        return formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS.PENDING' });
      default:
        return status;
    }
  };

  return (
    <Stack>
      {orderDetail.cart_items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {item.product_name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {item.product_category}
          </Typography>
          {item.price_currency === 'ARS' ? (
            <Typography variant="body1">
              {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.QUANTITY' })} {item.quantity} x ${item.unit_price} ARS
            </Typography>
          ) : (
            <Typography variant="body1">
              {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.QUANTITY' })} {item.quantity} x ${item.unit_price} USD
            </Typography>
          )}

          <Typography variant="body1">
            {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.SUBTOTAL' })}: ${item.sub_total} {item.price_currency}{' '}
          </Typography>
          <hr />
        </Box>
      ))}
      <Typography variant="body1" textAlign={'right'}>
        {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS' })}: {formatStatus(orderDetail.status)}
      </Typography>
      <Box>
        {orderDetail.currency_used_to_pay === 'ARS' ? (
          <Typography variant="h6">
            {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.TOTAL' })}: ${orderDetail.total_order_amount_ars} ARS
          </Typography>
        ) : (
          <Typography variant="h6">
            {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.TOTAL' })}: ${orderDetail.total_order_amount_usd} USD
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default OrderDetailModalContent;

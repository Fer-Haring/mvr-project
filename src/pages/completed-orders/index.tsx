import { Stack, Typography } from '@mui/material';
import ContentWrapper from '@webapp/components/content-wrapper';
import OrderData from '@webapp/controller/admin/edit-pending-orders/order-data';
import UserData from '@webapp/controller/admin/edit-pending-orders/user-data';
import { useCompletedOrderStore } from '@webapp/store/orders/get-completed-order';
import React from 'react';
import { useIntl } from 'react-intl';

interface CompletedOrderPageProps {
  className?: string;
}

export const CompletedOrderPage: React.FC<CompletedOrderPageProps> = () => {
  const { formatMessage } = useIntl();
  const { order } = useCompletedOrderStore();

  return (
    <ContentWrapper>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
        {formatMessage({ id: 'ADMIN.VIEW.COMPLETED.ORDERS.PAGE.TITLE' })}
      </Typography>
      <Stack
        spacing={4}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <UserData order={order} />
        <OrderData order={order} isCompleted={true} />
      </Stack>
    </ContentWrapper>
  );
};

import { Box, Stack, Typography } from '@mui/material';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import OrderData from '@webapp/controller/admin/edit-pending-orders/order-data';
import UserData from '@webapp/controller/admin/edit-pending-orders/user-data';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import { useUpdatePendingOrder } from '@webapp/sdk/mutations/orders/update-pending-order-mutation';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { useEditingOrderStore } from '@webapp/store/orders/editing-order-store';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

interface EditPendingOrdersPageProps {
  className?: string;
}

export const EditPendingOrdersPage: React.FC<EditPendingOrdersPageProps> = () => {
  const orderId = useParams<{ id: string }>().id;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { orders, resetStore } = useEditingOrderStore();
  const saveOrder = useUpdatePendingOrder();
  const pendingOrders = useGetPendingOrders();

  const handleSaveOrder = async () => {
    if (!orders[0]) return;

    const order = orders[0];
    console.log(orderId, order);

    await saveOrder.mutateAsync({ id: orderId!, order: order as OrderResponse });
    await pendingOrders.refetch();
    navigate('/admin-dashboard');
    resetStore();
  };

  return (
    <ContentWrapper>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
        {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.TITLE' })}
      </Typography>
      <Stack
        spacing={4}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <UserData order={orders[0]} />
        <OrderData order={orders[0]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 5, maxWidth: '20vw' }}
            disabled={saveOrder.isPending}
            onClick={() => {
              navigate('/admin-dashboard');
              resetStore();
            }}
          >
            {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.CANCEL.EDIT.ORDER' })}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 5, maxWidth: '20vw' }}
            loading={saveOrder.isPending}
            onClick={handleSaveOrder}
          >
            {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.SAVE.ORDER' })}
          </Button>
        </Box>
      </Stack>
    </ContentWrapper>
  );
};

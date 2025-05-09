import { Box, Stack, Typography } from '@mui/material';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import OrderData from '@webapp/controller/admin/edit-pending-orders/order-data';
import UserData from '@webapp/controller/admin/edit-pending-orders/user-data';
import { useGetPendingOrders } from '@webapp/service/mutations/orders/get-pending-orders-query';
import { useUpdatePendingOrder } from '@webapp/service/mutations/orders/update-pending-order-mutation';
import { useUpdateProductStock } from '@webapp/service/mutations/products/update-pproduct-stock-mutation';
import { CartItem, OrderResponse } from '@webapp/service/types/orders-types';
import { useEditingOrderStore } from '@webapp/store/orders/editing-order-store';
import React, { useEffect, useState } from 'react';
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
  const updateProductStockMutation = useUpdateProductStock();

  const [originalOrder, setOriginalOrder] = useState<OrderResponse | null>(null);

  // Al cargar el componente, guarda el estado original del pedido
  useEffect(() => {
    if (orders[0]) {
      setOriginalOrder(JSON.parse(JSON.stringify(orders[0]))); // Hacemos una copia profunda del pedido original
    }
  }, [orders]);

  const handleSaveOrder = async () => {
    if (!orders[0] || !originalOrder) return;

    const order = orders[0];

    // Comparar cantidades y actualizar solo si se modificaron
    if (order.cart_items && originalOrder.cart_items) {
      for (const item of order.cart_items) {
        const originalItem = originalOrder.cart_items.find((orig: CartItem) => orig.product_id === item.product_id);

        if (originalItem && originalItem.quantity !== item.quantity) {
          // Calcula el delta de stock
          const stockDelta = originalItem.quantity - item.quantity;
          await updateProductStockMutation.mutateAsync({
            productId: item.product_id,
            stockDelta: stockDelta,
          });
        }
      }
    }

    // Guardar la orden después de actualizar los stocks de los productos modificados
    await saveOrder.mutateAsync({ id: orderId!, order: order as OrderResponse });
    await pendingOrders.refetch();
    navigate('/admin-dashboard/pedidos-pendientes');
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
              navigate('/admin-dashboard/pedidos-pendientes');
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

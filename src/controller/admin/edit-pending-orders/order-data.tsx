import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Paper, Tooltip, alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import { useGetDollarValue } from '@webapp/sdk/mutations/admin/get-dollar-value-query';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { useEditingOrderStore } from '@webapp/store/orders/editing-order-store';
import React from 'react';
import { useIntl } from 'react-intl';

import AddProductModalContainer from './add-product-modal-container';

interface OrderDataProps {
  order: OrderResponse | undefined;
}

const OrderData: React.FC<OrderDataProps> = ({ order }) => {
  const { formatMessage } = useIntl();
  const [addProductModal, setAddProductModal] = React.useState(false);
  const { orders, setOrders } = useEditingOrderStore();
  const exchangeRate = useGetDollarValue();
  const dollarValue = exchangeRate.data?.venta || 1;

  const updateOrderInStore = (updatedOrder: OrderResponse) => {
    const updatedOrders = orders.map((o) => (o.order_id === updatedOrder.order_id ? updatedOrder : o));
    setOrders(updatedOrders);
  };

  const calculateSubTotal = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (fromCurrency === toCurrency) return amount;
    if (Number(dollarValue) === 0) return amount;
    return fromCurrency === 'USD' ? amount * Number(dollarValue) : amount / Number(dollarValue);
  };

  const updateOrderTotal = (updatedCartItems: CartItem[]) => {
    if (!order || !updatedCartItems) return null;

    const currencyUsedToPay = order.currency_used_to_pay;

    let totalUSD = 0;
    let totalARS = 0;

    updatedCartItems.forEach((item) => {
      if (item.price_currency === 'USD') {
        totalUSD += item.sub_total || 0;
        totalARS += convertCurrency(item.sub_total || 0, 'USD', 'ARS');
      } else {
        totalARS += item.sub_total || 0;
        totalUSD += convertCurrency(item.sub_total || 0, 'ARS', 'USD');
      }
    });

    // Añadir el costo de entrega del campo `delivery_cost`
    const deliveryCostARS = order.delivery_cost || 0;
    totalARS += deliveryCostARS;
    totalUSD += convertCurrency(deliveryCostARS, 'ARS', 'USD');

    return {
      total_order_amount_usd: currencyUsedToPay === 'USD' ? totalUSD : convertCurrency(totalARS, 'ARS', 'USD'),
      total_order_amount_ars: currencyUsedToPay === 'ARS' ? totalARS : convertCurrency(totalUSD, 'USD', 'ARS'),
      total_products: updatedCartItems.length,
    };
  };

  console.log(order)

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (order && order.cart_items) {
      const updatedCartItems = order.cart_items
        .map((item) =>
          item.product_id === productId
            ? {
                ...item,
                quantity: newQuantity,
                sub_total: calculateSubTotal(newQuantity, item.unit_price),
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedTotals = updateOrderTotal(updatedCartItems);

      if (updatedTotals) {
        const updatedOrder = {
          ...order,
          cart_items: updatedCartItems,
          ...updatedTotals,
        };
        updateOrderInStore(updatedOrder);
      }
    }
  };

  const decreaseQuantity = (productId: string) => {
    const item = order?.cart_items?.find((item) => item.product_id === productId);
    if (item && item.quantity > 0) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  const increaseQuantity = (productId: string) => {
    const item = order?.cart_items?.find((item) => item.product_id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const removeProduct = (productId: string) => {
    if (order && order.cart_items) {
      const updatedCartItems = order.cart_items.filter((item) => item.product_id !== productId);
      const updatedTotals = updateOrderTotal(updatedCartItems);

      if (updatedTotals) {
        const updatedOrder = {
          ...order,
          cart_items: updatedCartItems,
          ...updatedTotals,
        };
        updateOrderInStore(updatedOrder);
      }
    }
  };

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
          {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCTS.LIST' })}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ maxWidth: '15vw', color: '#FFFFFF', fontSize: '0.9vw' }}
          onClick={() => {
            setAddProductModal(true);
          }}
        >
          {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ADD.PRODUCT.TO.ORDER' })}
        </Button>
      </Box>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {order?.cart_items?.map((product) => (
          <Stack
            key={product.product_id}
            sx={{
              width: '100%',
              gap: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body1" color="secondary">
                <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.NAME' })}:</strong>{' '}
                {product.product_name}
              </Typography>
              <Typography variant="body1" color="secondary">
                <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.CATEGORY' })}:</strong>{' '}
                {product.product_category}
              </Typography>
              <Typography variant="body1" color="secondary">
                <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.QUANTITY' })}:</strong>{' '}
                {product.quantity}
              </Typography>
              <Typography variant="body1" color="secondary">
                <strong>{formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.TOTAL' })}:</strong>{' '}
                {product.sub_total} {product.price_currency}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Tooltip title={formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.QUANTITY.DECREASE' })}>
                <IconButton aria-label="delete" color="secondary" onClick={() => decreaseQuantity(product.product_id)}>
                  <RemoveRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.QUANTITY.INCREASE' })}>
                <IconButton aria-label="add-one" color="secondary" onClick={() => increaseQuantity(product.product_id)}>
                  <AddRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ORDER.PRODUCT.REMOVE' })}>
                <IconButton aria-label="remove-one" color="error" onClick={() => removeProduct(product.product_id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        ))}
      </Stack>
      <Modal
        open={addProductModal}
        onClose={() => setAddProductModal(false)}
        title={formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.ADD.PRODUCT.TO.ORDER' })}
        customContent={<AddProductModalContainer setAddProductModal={setAddProductModal} />}
      />
    </CustomAdminPaper>
  );
};

export default OrderData;

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

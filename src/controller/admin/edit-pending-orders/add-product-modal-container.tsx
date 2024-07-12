import { Autocomplete, Box, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { Product } from '@webapp/sdk/types/products-types';
import { useEditingOrderStore } from '@webapp/store/orders/editing-order-store';
import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

interface AddProductModalContainerProps {
  setAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModalContainer: React.FC<AddProductModalContainerProps> = ({ setAddProductModal }) => {
  const { id: orderId } = useParams<{ id: string }>();
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { data: productListData, isLoading } = useProductListQuery(1, 500);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const { orders, setOrders } = useEditingOrderStore();

  // Reset selectedProduct when modal opens
  React.useEffect(() => {
    setSelectedProduct(null);
  }, []);

  console.log(selectedProduct);

  const addProductToOrder = () => {
    if (!selectedProduct || !orderId) return;

    const updatedOrders = orders.map((order: OrderResponse) => {
      if (order.order_id?.toString() !== orderId) return order;

      const updatedCartItems = [...(order.cart_items || [])];
      const existingItemIndex = updatedCartItems.findIndex((item) => item.product_id === selectedProduct.product_id);

      if (existingItemIndex > -1) {
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1,
          sub_total:
            (updatedCartItems[existingItemIndex].quantity + 1) * updatedCartItems[existingItemIndex].unit_price,
        };
      } else {
        updatedCartItems.push({
          product_id: selectedProduct.id,
          product_name: selectedProduct.product_name,
          unit_price: Number(selectedProduct.sale_price),
          product_category: selectedProduct.product_category,
          product_description: selectedProduct.description || '',
          price_currency: selectedProduct.price_currency,
          sub_total: Number(selectedProduct.sale_price),
          quantity: 1,
        });
      }

      const totalProducts = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmountUSD = updatedCartItems.reduce(
        (sum, item) => sum + (item.price_currency === 'USD' ? item.sub_total : 0),
        0
      );
      const totalAmountARS = updatedCartItems.reduce(
        (sum, item) => sum + (item.price_currency === 'ARS' ? item.sub_total : 0),
        0
      );

      return {
        ...order,
        cart_items: updatedCartItems,
        total_products: totalProducts,
        total_order_amount_usd: totalAmountUSD,
        total_order_amount_ars: totalAmountARS,
      };
    });

    setOrders(updatedOrders);
    setSelectedProduct(null);
    setAddProductModal(false);
  };

  return (
    <Stack
      spacing={4}
      sx={{
        paddingX: '20px',

        '& .add-product-button': {
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 4,
        },
      }}
    >
      <Typography variant="h4">
        {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.MODAL.SEARCH.PRODUCT' })}
      </Typography>
      <Autocomplete
        options={productListData?.products || []}
        getOptionLabel={(option: Product) => option.product_name + ' - ' + option.product_category}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product"
            sx={{
              '& .MuiInputBase-root': {
                height: '50px',
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: 'white',
              },
              '& .MuiInputLabel-outlined': {
                color: 'white !important',
              },
            }}
          />
        )}
        loading={isLoading}
        value={selectedProduct}
        onChange={(event, newValue) => {
          setSelectedProduct(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={option.product_id}
            style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
          >
            {option.product_name + ' - ' + option.product_category}
          </li>
        )}
        sx={{
          '& .MuiAutocomplete-listbox': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
          '& .MuiAutocomplete-option': {
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      />
      <Box className="add-product-button">
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => setAddProductModal(false)}>
          {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.MODAL.CANCEL.ADD.PRODUCT' })}
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addProductToOrder}>
          {formatMessage({ id: 'ADMIN.EDIT.PENDING.ORDERS.PAGE.MODAL.ADD.PRODUCT' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default AddProductModalContainer;

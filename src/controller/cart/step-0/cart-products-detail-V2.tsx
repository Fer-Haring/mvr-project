import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, CircularProgress, IconButton, Typography, styled, useTheme } from '@mui/material';
import Stack from '@mui/system/Stack';
import NoImageProd from '@webapp/assets/images/prod-no-image.png';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddToCart } from '@webapp/service/mutations/cart/add-to-cart-mutation';
import { useRemoveItemFromCart } from '@webapp/service/mutations/cart/delete-item-from-cart-mutation';
import { useGetUserCart } from '@webapp/service/mutations/cart/get-cart-query';
import { useUpdateProductStock } from '@webapp/service/mutations/products/update-pproduct-stock-mutation';
import { CartItem } from '@webapp/service/types/cart-types';
import { OrderRequest } from '@webapp/service/types/orders-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { useNavigate } from 'react-router-dom';

interface CartProductsDetailV2Props {
  className?: string;
  cartProducts?: CartItem[];
  order?: OrderRequest;
  setOrder: (order: OrderRequest) => void;
}

export const CartProductsDetailV2: React.FunctionComponent<CartProductsDetailV2Props> = ({ cartProducts }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const { mutateAsync: updateCart, isPending } = useAddToCart();
  const getCart = useGetUserCart();
  const { mutateAsync: updateProductStock } = useUpdateProductStock();
  const [localCartProducts, setLocalCartProducts] = useState<CartItem[]>(cartProducts || []);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const removeFromCart = useRemoveItemFromCart();

  useEffect(() => {
    if (cartProducts) {
      setLocalCartProducts(cartProducts);
    }
  }, [cartProducts]);

  const subTotalValue = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return `$ ${price} ARS`;
    } else if (priceCurrency === 'USD') {
      const convertedPrice = Number(price * Number(dollarValue.value));
      return `$ ${price} USD = ${convertedPrice.toFixed(2)} ARS`;
    }
  };

  const unitValue = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return `$ ${price} ARS`;
    } else if (priceCurrency === 'USD') {
      return `$ ${price} USD`;
    }
  };

  useEffect(() => {
    if (cartProducts) {
      setLocalCartProducts(cartProducts);
    }
  }, [cartProducts]);

  const updateQuantity = async (cartProduct: CartItem, quantityChange: number) => {
    // Calcular el nuevo stockDelta basado en el cambio de cantidad
    const stockDelta = -quantityChange; // negativo al agregar, positivo al restar
    const newQuantity = cartProduct.quantity + quantityChange;

    // Si la nueva cantidad es 0, eliminar el producto
    if (newQuantity <= 0) {
      try {
        // Primero actualizamos el stock
        await updateProductStock({
          productId: cartProduct.product_id,
          stockDelta: stockDelta,
        });

        // Luego eliminamos el item del carrito
        await removeFromCart.mutateAsync(cartProduct.product_id);

        // Actualizamos el estado local
        const filteredCartProducts = localCartProducts.filter((item) => item.product_id !== cartProduct.product_id);
        setLocalCartProducts(filteredCartProducts);

        // Refrescamos el carrito
        getCart.refetch();

        return; // Salimos de la función aquí
      } catch (error) {
        console.error('Error removing item from cart:', error);
        toast.error(formatMessage({ id: 'CART.ERROR.REMOVING.PRODUCT' }));
        return;
      }
    }

    // Si llegamos aquí, es porque la cantidad es > 0
    try {
      await updateProductStock({
        productId: cartProduct.product_id,
        stockDelta: stockDelta,
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error(formatMessage({ id: 'CART.ERROR.UPDATING.STOCK' }));
      return;
    }

    // Actualizar la cantidad en el carrito local
    const updatedCartProducts = localCartProducts.map((item) =>
      item.product_id === cartProduct.product_id
        ? {
            ...item,
            quantity: newQuantity,
            sub_total: item.unit_price * newQuantity,
          }
        : item
    );

    setLocalCartProducts(updatedCartProducts);

    // Mostrar el snack adecuado para aumento o disminución
    if (quantityChange > 0) {
      toast.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.INCREASED' }));
    } else if (quantityChange < 0) {
      toast.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.DECREASED' }));
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const updatedCartProduct = updatedCartProducts.find((item) => item.product_id === cartProduct.product_id);
      if (updatedCartProduct) {
        updateCart({
          product_id: updatedCartProduct.product_id!,
          product_name: updatedCartProduct.product_name,
          unit_price: updatedCartProduct.unit_price,
          price_currency: updatedCartProduct.price_currency,
          sub_total: updatedCartProduct.sub_total,
          product_image: updatedCartProduct.product_image,
          quantity: updatedCartProduct.quantity,
          product_category: updatedCartProduct.product_category,
          product_description: updatedCartProduct.product_description,
        }).then(() => {
          getCart.refetch();
        });
      }
    }, 500);
  };

  const increaseQuantity = (cartProduct: CartItem) => {
    updateQuantity(cartProduct, 1); // Aumenta la cantidad en 1
  };

  const decreaseQuantity = (cartProduct: CartItem) => {
    updateQuantity(cartProduct, -1); // Disminuye la cantidad en 1
  };

  return (
    <Stack direction={'column'} gap={2} width={'100%'}>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
          gap: theme.spacing(8),
        }}
      >
        {localCartProducts.map((cartProduct) => {
          return (
            <ProductDetailContainer direction={'row'} gap={2} key={cartProduct.product_id}>
              {cartProduct.product_image === '' ? (
                <ImageContainer key={cartProduct.product_id} src={NoImageProd} />
              ) : (
                <ImageContainer key={cartProduct.product_id} src={cartProduct.product_image} />
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', paddingLeft: 2 }}>
                <Typography
                  variant={'h5'}
                  onClick={() => {
                    navigate(`/productos/${cartProduct.product_id}`);
                  }}
                  sx={{
                    fontSize: '1.6vw',
                    lineHeight: '30px',
                    textAlign: 'center',
                    color: theme.palette.common.black,
                    ':hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {cartProduct.product_name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: theme.spacing(2),
                    color: theme.palette.common.black,
                  }}
                >
                  <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '0.9vw' }}>
                    {cartProduct.product_category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '0.9vw' }}>
                      {formatMessage({ id: 'CART.HEADER.PRICE' })}
                    </Typography>
                    <Typography variant={'body1'} sx={{ fontSize: '0.9vw' }}>
                      {unitValue(cartProduct.unit_price, cartProduct.price_currency)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(2),
                    justifyContent: 'space-between',
                    color: theme.palette.common.black,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '0.9vw' }}>
                      {formatMessage({ id: 'CART.HEADER.SUBTOTAL' })}
                    </Typography>
                    <Typography variant={'body1'} sx={{ fontSize: '0.9vw' }}>
                      {subTotalValue(cartProduct.sub_total, cartProduct.price_currency)}
                    </Typography>
                  </Box>

                  <Stack
                    direction={'row'}
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                  >
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '0.9vw' }}>
                      {formatMessage({ id: 'CART.HEADER.QUANTITY' })}
                    </Typography>
                    <IconButton
                      size="small"
                      disabled={isPending}
                      onClick={() => {
                        decreaseQuantity(cartProduct);
                      }}
                      aria-label="Disminuir cantidad"
                    >
                      <RemoveCircleOutlineRoundedIcon
                        sx={{
                          width: 18,
                          height: 18,
                          color: isPending ? theme.palette.grey[200] : theme.palette.grey[800],
                        }}
                      />
                    </IconButton>
                    {isPending ? <CircularProgress size={15} /> : cartProduct.quantity}
                    <IconButton
                      size="small"
                      disabled={isPending}
                      onClick={() => {
                        increaseQuantity(cartProduct);
                      }}
                      aria-label="Aumentar cantidad"
                    >
                      <AddCircleOutlineRoundedIcon
                        sx={{
                          width: 18,
                          height: 18,
                          color: isPending ? theme.palette.grey[200] : theme.palette.grey[800],
                        }}
                      />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </ProductDetailContainer>
          );
        })}
      </Box>
    </Stack>
  );
};

const ImageContainer = styled('img')(({ theme }) => ({
  width: '10vw',
  height: 'auto',
  maxHeight: '150px',
  aspectRatio: '1/1',
  borderRadius: 16,
  backgroundColor: theme.palette.common.white,
}));

const ProductDetailContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

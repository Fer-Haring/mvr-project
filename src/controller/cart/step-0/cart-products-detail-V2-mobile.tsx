import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, CircularProgress, IconButton, Typography, styled, useTheme } from '@mui/material';
import Stack from '@mui/system/Stack';
import NoImageProd from '@webapp/assets/images/prod-no-image.png';
import SnackbarUtils from '@webapp/components/snackbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddToCart } from '@webapp/sdk/mutations/cart/add-to-cart-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface CartProductsDetailV2MobileProps {
  className?: string;
  cartProducts?: CartItem[];
  order?: OrderRequest;
  setOrder: (order: OrderRequest) => void;
}

export const CartProductsDetailV2Mobile: React.FunctionComponent<CartProductsDetailV2MobileProps> = ({
  cartProducts,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const { mutateAsync, isPending } = useAddToCart();
  const getCart = useGetUserCart();
  const [localCartProducts, setLocalCartProducts] = useState<CartItem[]>(cartProducts || []);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const updateQuantity = (cartProduct: CartItem, quantityChange: number) => {
    const updatedCartProducts = localCartProducts.map((item) =>
      item.product_id === cartProduct.product_id
        ? {
            ...item,
            quantity: Math.max(item.quantity + quantityChange, 0),
            sub_total: item.unit_price * Math.max(item.quantity + quantityChange, 0),
          }
        : item
    );

    if (cartProduct.quantity === 1 && quantityChange === -1) {
      // Si la cantidad es 1 y se está disminuyendo, eliminar el producto del carrito
      const filteredCartProducts = localCartProducts.filter((item) => item.product_id !== cartProduct.product_id);
      setLocalCartProducts(filteredCartProducts);
      SnackbarUtils.info(formatMessage({ id: 'CART.PRODUCT.REMOVED' }));
    } else {
      setLocalCartProducts(updatedCartProducts);

      // Mostrar el snack adecuado para aumento o disminución
      if (quantityChange > 0) {
        SnackbarUtils.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.INCREASED' }));
      } else if (quantityChange < 0) {
        SnackbarUtils.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.DECREASED' }));
      }
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const updatedCartProduct = updatedCartProducts.find((item) => item.product_id === cartProduct.product_id);
      if (updatedCartProduct) {
        mutateAsync({
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
    updateQuantity(cartProduct, 1);
  };

  const decreaseQuantity = (cartProduct: CartItem) => {
    updateQuantity(cartProduct, -1);
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
            <ProductDetailContainer direction={'column'} gap={2} key={cartProduct.product_id}>
              {cartProduct.product_image === '' ? (
                <ImageContainer key={cartProduct.product_id} src={NoImageProd} />
              ) : (
                <ImageContainer key={cartProduct.product_id} src={cartProduct.product_image} />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <Typography
                  variant={'h5'}
                  onClick={() => {
                    navigate(`/productos/${cartProduct.product_id}`);
                  }}
                  sx={{
                    fontSize: '4vw',
                    lineHeight: '1.2',
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
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: theme.spacing(2),
                    color: theme.palette.common.black,
                  }}
                >
                  <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '3vw' }}>
                    {cartProduct.product_category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '3vw' }}>
                      {formatMessage({ id: 'CART.HEADER.PRICE' })}
                    </Typography>
                    <Typography variant={'body1'} sx={{ fontSize: '3vw' }}>
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '3vw' }}>
                      {formatMessage({ id: 'CART.HEADER.SUBTOTAL' })}
                    </Typography>
                    <Typography variant={'body1'} sx={{ fontSize: '3vw' }}>
                      {subTotalValue(cartProduct.sub_total, cartProduct.price_currency)}
                    </Typography>
                  </Box>

                  <Stack
                    direction={'row'}
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                  >
                    <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '3vw' }}>
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
                          width: 28,
                          height: 28,
                          color: isPending ? theme.palette.grey[200] : theme.palette.grey[800],
                        }}
                      />
                    </IconButton>
                    {isPending ? (
                      <CircularProgress size={15} />
                    ) : (
                      <Typography variant={'body1'} fontWeight={600} sx={{ fontSize: '3.5vw' }}>
                        {cartProduct.quantity}
                      </Typography>
                    )}
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
                          width: 28,
                          height: 28,
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
  width: '15vw',
  height: 'auto',
  maxHeight: '200px',
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

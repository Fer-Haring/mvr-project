import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import { CartProductsDetail } from '@webapp/controller/cart/step-1/cart-products-detail';
import { useCartStore } from '@webapp/store/cart/cart';
import { FunctionComponent } from 'react';

// import { useNavigate } from 'react-router-dom';

export const CartPage: FunctionComponent = () => {
  const theme = useTheme();
  const { cart } = useCartStore();
  // const navigate = useNavigate();

  return (
    <ContentWrapper>
      <Paper sx={{ p: 2, width: '100%', backgroundColor: alpha(theme.palette.common.white, 0.8) }}>
        <Stack direction={'row'} gap={6} width={'100%'} zIndex={10}>
          <CartProductsDetail cartProducts={cart} />
          <Box></Box>
        </Stack>
      </Paper>
    </ContentWrapper>
  );
};

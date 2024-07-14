/* eslint-disable react/react-in-jsx-scope */
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import { CartProductsDetail } from '@webapp/controller/cart/step-0/cart-products-detail';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Step0Props {
  handleNextStep: () => void;
  cart: CartItem[];
  order: OrderRequest;
  setOrder: (order: OrderRequest) => void;
}

export const Step0: FunctionComponent<Step0Props> = ({ handleNextStep, cart, order, setOrder }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  return (
    <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Box
        sx={{
          p: 2,
          pb: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          [theme.breakpoints.down(1440)]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <CartProductsDetail cartProducts={cart} order={order} setOrder={setOrder} />
      </Box>
      <Button
        onClick={handleNextStep}
        color='primary'
        endIcon={<ArrowForwardIosRoundedIcon />}
      >
        {formatMessage({ id: 'CART.PAYMENT.CHECKOUT' })}
      </Button>
    </Stack>
  );
};

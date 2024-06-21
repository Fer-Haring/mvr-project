import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CartProductsDetail } from '@webapp/controller/cart/step-0/cart-products-detail';
import { CartItem, Order } from '@webapp/sdk/actions/auth/types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Step0Props {
  handleNextStep: () => void;
  cart: CartItem[];
  order: Order;
  setOrder: (order: Order) => void;
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
        variant="contained"
        onClick={handleNextStep}
        sx={{
          maxWidth: 300,
          ': hover': {
            color: theme.palette.grey[200],
          },
        }}
        endIcon={<ArrowForwardIosRoundedIcon />}
      >
        {formatMessage({ id: 'CART.PAYMENT.CHECKOUT' })}
      </Button>
    </Stack>
  );
};

import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import ContentWrapper from '@webapp/components/content-wrapper';
import CartEmptyState from '@webapp/controller/cart/empty-cart';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Step0 } from './steps/step-0';
import { Step1 } from './steps/step-1';
import { Step2 } from './steps/step-2';
import { Step3 } from './steps/step-3';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useUserStore } from '@webapp/store/auth/session';
import { User } from '@webapp/sdk/types/user-types';

// import { useNavigate } from 'react-router-dom';

export const CartPage: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { cart } = useCartStore();
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(useUserData().user);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [checked, setChecked] = useState(false);
  const { setOrders } = useCompletedOrdersStore();
  const {data: cart} = useGetUserCart();
  const userData = useGetUserByIdMutation(useUserStore((state) => state.userInfo?.userId) || '');

  useEffect(() => {
    userData.refetch();
    setUser(userData.data as User);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  console.log('cart', cart);
  const {
    order,
    setOrder,
    setName,
    setLastName,
    msgCity,
    setMsgCity,
    setAddress: setMsgAddress,
    address: msgAddress,
    name: msgName,
    lastName: msgLastName,
  } = useMessageStore();

  const handleNextStep = () => {
    handleCreateMessage();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleCreateMessage = () => {};

  useEffect(() => {
    setName(user.name);
    setLastName(user.last_name);
    setMsgAddress(address);
    setMsgCity(city);
    setOrder({
      ...order,
      orderId: Math.floor(Math.random() * 100000000),
      userId: user.id,
      cartItems: cart,
      currencyUsedToPay: user.preferred_currency,
      deliveryType: user.delivery_type,
      paymentMethod: user.payment_method,
      totalProducts: cart?.length,
      status: 'Pending',
    });
    setOrders([order]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setName, setLastName, setOrder, address, setMsgAddress]);

  const fullMessage = `
  Hola, quiero hacer un pedido.\n
  
  Soy ${msgName} ${msgLastName}.\n

  Mi dirección es: ${msgAddress}, ${msgCity}  \n
  
  Datos de envío: ${order.deliveryType === 'Delivery' ? 'Envío a domicilio' : 'Retiraré en el local'}.

  Datos de pago: ${order.currencyUsedToPay === 'ARS' ? 'Pagaré en pesos argentinos' : 'Pagaré en dólares'}.

  Mi pedido es:
  ${order?.cartItems?.map((product) => `${product.unit_quantity} ${product.product_name}`).join('\n  ')}.

  El total es: $${order.currencyUsedToPay === 'ARS' ? order.totalOrderAmountARS : order.totalOrderAmountUSD}.

  Gracias!`;

  return (
    <ContentWrapper>
      {cart?.length === 0 ? (
        <CartEmptyState />
      ) : (
        <Paper
          sx={{
            p: 2,
            width: '90%',
            backgroundColor: alpha(theme.palette.common.white, 0.6),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {step === 0 && <Step0 handleNextStep={handleNextStep} cart={cart!} order={order} setOrder={setOrder} />}
          {step === 1 && (
            <Step1
              user={user}
              handlePreviousStep={handlePreviousStep}
              handleNextStep={handleNextStep}
              city={city}
              setCity={setCity}
              address={address}
              setAddress={setAddress}
              checked={checked}
              setChecked={setChecked}
            />
          )}

          {step === 2 && (
            <Step2
              step={step}
              cart={cart!}
              fullMessage={fullMessage}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              order={order}
            />
          )}
          {step === 3 && <Step3 step={step} navigate={navigate} />}
        </Paper>
      )}
    </ContentWrapper>
  );
};

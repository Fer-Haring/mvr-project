/* eslint-disable react/react-in-jsx-scope */
import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import ContentWrapper from '@webapp/components/content-wrapper';
import CartEmptyState from '@webapp/controller/cart/empty-cart';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserStore } from '@webapp/store/auth/session';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Step0 } from './steps/step-0';
import { Step1 } from './steps/step-1';
import { Step2 } from './steps/step-2';
import { Step3 } from './steps/step-3';

export const CartPage: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(useUserData().user);
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [checked, setChecked] = useState(false);
  const [updatingUserLoading, setUpdatingUserLoading] = useState(false);
  const { setOrders } = useCompletedOrdersStore();
  const { data: cart } = useGetUserCart();
  const userData = useGetUserByIdMutation(useUserStore((state) => state.userInfo?.userId) || '');
  const userId = useUserStore((state) => state.userInfo?.userId);
  const updateUser = useUpdateUser(userId || '');

  useEffect(() => {
    if (userData.data) {
      setUser(userData.data as User);
      setAddress(userData.data.address || '');
      setCity(userData.data.city || '');
    }
  }, [userData.data]);

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

  console.log('order', order);
  const handle2NextStep = async () => {
    if (checked && userId) {
      setUpdatingUserLoading(true);
      try {
        await updateUser
          .mutateAsync({
            payload: {
              address,
              city,
              payment_method: order.payment_method || user?.payment_method,
              preferred_currency: order.currency_used_to_pay,
              delivery_type: order.delivery_type,
              delivery_zone: order.delivery_zone,
              delivery_cost: order.user?.delivery_cost || 0,
            },
          })
          .then(() => {
            userData.refetch();
            setUpdatingUserLoading(false);
          });
        handleCreateMessage();
        setStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error('Failed to update user data:', error);
      }
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleCreateMessage = () => {};

  useEffect(() => {
    setName(user?.name);
    setLastName(user?.last_name);
    setMsgAddress(address);
    setMsgCity(city);
    setOrder({
      ...order,
      cart_items: cart || [],
      currency_used_to_pay: user?.preferred_currency || order.currency_used_to_pay,
      delivery_type: user?.delivery_type,
      payment_method: user?.payment_method,
      total_products: cart?.length,
      delivery_zone: user?.delivery_zone,
      delivery_cost: user?.delivery_cost || 0,
      status: 'Pending',
      user: {
        ...user,
        delivery_cost: order.user?.delivery_cost || 0,
      },
    });
    setOrders([order]);
  }, [user, setName, setLastName, setOrder, address, setMsgAddress, cart, city]);

  const fullMessage = `
  Hola, quiero hacer un pedido.\n
  
  Soy ${msgName} ${msgLastName}.\n

  Mi dirección es: ${msgAddress}, ${msgCity}  \n
  
  Datos de envío: ${order.delivery_type === 'Delivery' ? 'Envío a domicilio' : 'Retiraré en el local'}.

  Datos de pago: ${order.currency_used_to_pay === 'ARS' ? 'Pagaré en pesos argentinos' : 'Pagaré en dólares'}.

  Mi pedido es:
  ${order?.cart_items?.map((product) => `${product.quantity} ${product.product_name} de ${product.product_category}`).join('\n  ')}.

  El total es: $${order.currency_used_to_pay === 'ARS' ? order.total_order_amount_ars : order.total_order_amount_usd}.

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
              setUser={setUser}
              order={order}
              handlePreviousStep={handlePreviousStep}
              updatingUserLoading={updatingUserLoading}
              handleNextStep={handle2NextStep}
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

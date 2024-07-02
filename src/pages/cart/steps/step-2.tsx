import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@webapp/components/modal';
import { CartPaymentDetail } from '@webapp/controller/cart/step-2/cart-payment-detail';
import { useClearCart } from '@webapp/sdk/mutations/cart/delete-cart-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { useCreateOrder } from '@webapp/sdk/mutations/orders/save-new-order-mutation';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { CartItem } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useCartStore } from '@webapp/store/cart/cart';
import React from 'react';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import ReactWhatsapp from 'react-whatsapp';

interface Step2Props {
  step: number;
  cart: CartItem[];
  fullMessage: string;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  order: OrderRequest;
}

export const Step2: FunctionComponent<Step2Props> = ({
  cart,
  fullMessage,
  handleNextStep,
  handlePreviousStep,
  order,
}) => {
  const { mutateAsync } = useClearCart();
  const getCart = useGetUserCart();
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { deleteMessageStore } = useMessageStore();
  const { clearCart } = useCartStore();
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: saveOrder } = useCreateOrder();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLastStep = async () => {
    await saveOrder(order);
    clearCart();
    mutateAsync().then(() => {
      getCart.refetch();
    });
    deleteMessageStore();
    handleNextStep();
  };

  const WhatsappButton: FunctionComponent = () => {
    return (
      <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <ReactWhatsapp number="5492215248329" message={fullMessage} element="span" rel="noopener noreferrer">
          <Button
            variant="contained"
            onClick={handleLastStep}
            size="medium"
            sx={{
              maxWidth: 300,
              color: theme.palette.grey[800],
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.grey[200],
              },
              '&:disabled': {
                backgroundColor: theme.palette.grey[200],
                color: theme.palette.grey[400],
              },
            }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DETAILS.MODAL.CONFIRM' })}
          </Button>
        </ReactWhatsapp>
        <Button
          variant="contained"
          onClick={handleCloseModal}
          size="medium"
          sx={{
            maxWidth: 300,
            color: theme.palette.grey[800],
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.grey[200],
            },
            '&:disabled': {
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.grey[400],
            },
          }}
        >
          {formatMessage({ id: 'CART.PAYMENT.DETAILS.MODAL.CANCEL' })}
        </Button>
      </Stack>
    );
  };

  return (
    <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Button
        variant="contained"
        onClick={handlePreviousStep}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        sx={{
          maxWidth: 300,
          ': hover': {
            color: theme.palette.grey[200],
          },
        }}
      >
        {formatMessage({ id: 'CART.PAYMENT.BACK' })}
      </Button>
      <CartPaymentDetail cartProducts={cart} />
      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          maxWidth: 300,
          color: theme.palette.grey[800],
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[200],
          },
          '&:disabled': {
            backgroundColor: theme.palette.grey[200],
            color: theme.palette.grey[400],
          },
        }}
      >
        {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION.MESSAGE' })}
      </Button>
      {openModal && (
        <Modal
          open={openModal}
          title={formatMessage({ id: 'CART.PAYMENT.DETAILS.MODAL.TITLE' })}
          subtitle={formatMessage({ id: 'CART.PAYMENT.DETAILS.MODAL.SUBTITLE' })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          customContent={<WhatsappButton />}
        />
      )}
    </Stack>
  );
};

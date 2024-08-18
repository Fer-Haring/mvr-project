import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import { CartPaymentDetail } from '@webapp/controller/cart/step-2/cart-payment-detail';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { uploadTransferReceipt } from '@webapp/sdk/actions/oders/upload-receipt-image';
import { useClearCart } from '@webapp/sdk/mutations/cart/delete-cart-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { useCreateOrder } from '@webapp/sdk/mutations/orders/save-new-order-mutation';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useCartStore } from '@webapp/store/cart/cart';
import { useUserData } from '@webapp/store/users/user-data';
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
  const { user } = useUserData();
  const getCart = useGetUserCart();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { deleteMessageStore, setTransferImage, transferImage } = useMessageStore();
  const { clearCart } = useCartStore();
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: saveOrder } = useCreateOrder();
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleOpenModal = async () => {
    console.log('Opening modal...');

    if (order.payment_method === 'Transferencia bancaria' && !image) {
      setError('Debes subir una imagen de comprobante de transferencia.');
    } else {
      setUploadingImage(true);
      if (image) {
        try {
          const imageUrl = await uploadTransferReceipt(image, user.id);
          setTransferImage(imageUrl);
          setUploadingImage(false);
        } catch (uploadError) {
          setError('Error al subir la imagen. Inténtalo de nuevo.');
          return;
        }
      }
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setError(null);
    }
  };

  const handleLastStep = async () => {
    if (order.payment_method === 'Transferencia bancaria' && !transferImage) {
      setError('Debes subir una imagen de comprobante de transferencia.');
      return;
    }

    await saveOrder(order);
    clearCart();
    mutateAsync().then(() => {
      getCart.refetch();
    });
    deleteMessageStore();
    handleNextStep();
  };

  const fullMessageWithImage = transferImage
    ? `${fullMessage}\n\nImagen del comprobante de transferencia: ${transferImage}`
    : fullMessage;

  const WhatsappButton: FunctionComponent = () => {
    return (
      <Stack
        direction={isMobile ? 'column' : 'row'}
        gap={2}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <ReactWhatsapp number="5492213997379" message={fullMessageWithImage} element="span" rel="noopener noreferrer">
          <Button
            variant="contained"
            onClick={handleLastStep}
            size="medium"
            disabled={order.payment_method === 'Transferencia bancaria' && !image} // Deshabilitar si falta la imagen
            sx={{
              maxWidth: 300,
              color: theme.palette.grey[800],
              backgroundColor: theme.palette.primary.main,
              fontSize: 16,
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
          color="error"
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
      {order.payment_method === 'Transferencia bancaria' && (
        <>
          <Typography variant="h4" color="secondary">
            {formatMessage({ id: 'CART.PAYMENT.TRANSFER.ADVICE' })}
          </Typography>
          {order.currency_used_to_pay === 'ARS' ? (
            <Typography variant="h4" color="secondary">
              {formatMessage({ id: 'CART.PAYMENT.TRANSFER.ARS_ALIAS.ACCOUNT' })}
            </Typography>
          ) : (
            <Typography variant="h4" color="secondary">
              {formatMessage({ id: 'CART.PAYMENT.TRANSFER.USD_ALIAS.ACCOUNT' })}
            </Typography>
          )}
        </>
      )}
      <CartPaymentDetail cartProducts={cart} />
      {order.currency_used_to_pay === null && (
        <Typography color={'error'}>{formatMessage({ id: 'CART.PAYMENT.MISSING.DATA' })}</Typography>
      )}
      {order.payment_method === 'Transferencia bancaria' && (
        <>
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }} // Ocultamos el input real
          />
          <label htmlFor="upload-image">
            <Button variant="outlined" component="span" color={!image ? 'primary' : 'success'}>
              {image ? 'Comprobante Seleccionado' : 'Subir comprobante de pago'}
            </Button>
          </label>
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
      <Button
        variant="contained"
        onClick={handleOpenModal}
        disabled={order.currency_used_to_pay === null || order.payment_method === ''}
        loading={uploadingImage}
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

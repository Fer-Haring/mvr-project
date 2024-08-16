import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { useAddFavorite } from '@webapp/sdk/mutations/auth/add-to-favorites-mutation';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useRemoveFavorite } from '@webapp/sdk/mutations/auth/remove-from-favorites-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useIsMobile } from '../../hooks/is-mobile';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  border: 0,
  width: '100%',
  backgroundColor: 'rgba(230, 235, 241, 0.9)',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.02)',
    transition: 'transform 0.5s',
    boxShadow: '10px 10px 20px 4px rgba(48,111,183,0.9)',
  },
}));

interface ProductCardV2Props {
  id: number;
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  product?: Product;
  image: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  destacado?: 'si' | 'no';
}

const ProductCardV2: FunctionComponent<ProductCardV2Props> = ({
  className,
  sx,
  onClick,
  image,
  name,
  description,
  price,
  currency,
  id,
  product,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();
  const { user } = useUserData();
  const userId = user?.id;
  const strings = description;
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const userData = useGetUserByIdMutation(userId);

  const isFavorite = useMemo(() => {
    return user?.favorite_products?.some((p: Product) => p.id === product?.id);
  }, [user, product]);

  const handleAddFavorite = () => {
    addFavorite.mutateAsync({ userId, product }).then(() => {
      userData.refetch();
    });
  };

  const handleRemoveFavorite = () => {
    removeFavorite.mutateAsync({ userId, productId: product?.id! }).then(() => {
      userData.refetch();
    });
  };

  const modifiedStrings = strings?.replace('Precio por Unidad en USD', '\nPrecio por Unidad en USD');

  const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isFavorite) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
  };

  return (
    <Wrapper className={className || ''} sx={{ ...sx }} role="region" onClick={onClick} key={id}>
      {image && image !== '' && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.common.white,
            borderBottomLeftRadius: 16,
            borderTopLeftRadius: 16,
          }}
        >
          <img
            src={image}
            alt="Product"
            style={{
              width: isMobile ? '30vw' : '11vw',
              height: 'auto',
              aspectRatio: '1/1',
              borderRadius: 16,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          />
        </Box>
      )}

      {image === '' && (
        <Box
          sx={{
            width: '50%',
            height: 'auto',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 16,
            borderTopLeftRadius: 16,
            mt: theme.spacing(2),
            gap: theme.spacing(2),
          }}
        >
          <CameraAltRoundedIcon
            sx={{
              fontSize: isMobile ? 60 : 100,
              color: theme.palette.grey[500],
            }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.grey[500],
              fontWeight: 'bold',
              fontSize: isMobile ? 16 : 24,
            }}
            variant="h6"
          >
            {formatMessage({ id: 'PRODUCT.CARD.PRODUCTS.NO_IMAGE' })}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: theme.spacing(1),
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <Typography
            sx={{
              textAlign: 'left',
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              fontSize: isMobile ? '4vw' : '1.2vw',
            }}
            variant="h6"
          >
            {name}
          </Typography>
          <Typography
            sx={{
              textAlign: 'left',
              color: theme.palette.grey[800],
              whiteSpace: 'pre-line',
              fontSize: isMobile ? '3vw' : '0.8vw',
            }}
            variant="body1"
          >
            {modifiedStrings}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: theme.spacing(2),
              padding: theme.spacing(1),
            }}
          >
            {currency === 'USD' ? (
              <Typography
                sx={{
                  textAlign: 'left',
                  color: theme.palette.grey[800],
                  fontWeight: 'bold',
                  fontSize: isMobile ? '4vw' : '2vw',
                }}
                variant="body1"
              >
                $ {price} USD
              </Typography>
            ) : (
              <Typography
                sx={{
                  textAlign: 'left',
                  color: theme.palette.grey[800],
                  fontWeight: 'bold',
                  fontSize: isMobile ? '4vw' : '2vw',
                }}
                variant="body1"
              >
                $ {price} ARS
              </Typography>
            )}
            <Tooltip title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'} arrow>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  padding: '8px',
                  borderRadius: '50%',
                  ':hover': {
                    backgroundColor: isFavorite ? theme.palette.error.main : theme.palette.success.main,
                  },
                }}
                onClick={handleBookmarkClick}
              >
                {isFavorite ? (
                  <BookmarkRoundedIcon sx={{ width: isMobile ? '3vw' : '1vw', height: isMobile ? '3vw' : '1vw' }} />
                ) : (
                  <BookmarkBorderRoundedIcon
                    sx={{ width: isMobile ? '3vw' : '1vw', height: isMobile ? '3vw' : '1vw' }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default ProductCardV2;

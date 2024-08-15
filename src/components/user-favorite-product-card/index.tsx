import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddFavorite } from '@webapp/sdk/mutations/auth/add-to-favorites-mutation';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useRemoveFavorite } from '@webapp/sdk/mutations/auth/remove-from-favorites-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';

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

interface UserFavoriteProductCardProps {
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

const UserFavoriteProductCard: FunctionComponent<UserFavoriteProductCardProps> = ({
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
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
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
        <img
          src={image}
          alt="Product"
          style={{
            width: !isMobile ? '9vw' : '20vw',
            height: 'auto',
            aspectRatio: '1/1',
            borderRadius: 16,
            backgroundColor: theme.palette.common.white,
          }}
        />
      )}

      {image === '' && (
        <Box
          sx={{
            width: !isMobile ? '15vw' : '28vw',
            height: 'auto',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 1,
            gap: theme.spacing(2),
          }}
        >
          <CameraAltRoundedIcon
            sx={{
              fontSize: '6vw',
              color: theme.palette.grey[500],
            }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.grey[500],
              fontWeight: 'bold',
              fontSize: '2vw',
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
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: theme.spacing(2),
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              fontSize: !isMobile ? '1.5vw' : '3vw',
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
              fontSize: !isMobile ? '1vw' : '2vw',
            }}
            variant="body1"
          >
            {modifiedStrings}
          </Typography>
          {currency === 'USD' ? (
            <Typography
              sx={{
                textAlign: 'left',
                color: theme.palette.grey[800],
                fontWeight: 'bold',
                fontSize: !isMobile ? '1.5vw' : '3vw',
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
                fontSize: !isMobile ? '1.5vw' : '3vw',
              }}
              variant="body1"
            >
              $ {price} ARS
            </Typography>
          )}
        </Box>

        <Tooltip title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'} arrow>
          <IconButton
            sx={{
              alignSelf: 'flex-end', // Alinea el icono a la derecha
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
              <BookmarkRoundedIcon sx={{ width: !isMobile ? '1vw' : '3vw', height: !isMobile ? '1vw' : '3vw' }} />
            ) : (
              <BookmarkBorderRoundedIcon sx={{ width: !isMobile ? '1vw' : '3vw', height: !isMobile ? '1vw' : '3vw' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Wrapper>
  );
};

export default UserFavoriteProductCard;

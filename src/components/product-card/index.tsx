import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { Product } from '@webapp/sdk/types/products-types';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  border: 0,
  maxWidth: 500,
  minWidth: 200,
  width: '100%',
  backgroundColor: 'rgba(230, 235, 241, 0.9)',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
    transition: 'transform 0.5s',
    boxShadow: '10px 10px 20px 4px rgba(48,111,183,0.9)',
  },
}));

interface ProductCardProps {
  id: number;
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  products?: Product[];
  image: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  destacado?: 'si' | 'no';
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
  className,
  sx,
  onClick,
  image,
  name,
  description,
  price,
  currency,
  id,
}) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();

  const strings = description;

  const modifiedStrings = strings?.replace('Precio por Unidad en USD', '\nPrecio por Unidad en USD');

  const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Wrapper className={className || ''} sx={{ ...sx }} role="region" onClick={onClick} key={id}>
      {image && image !== '' && (
        <img
          src={image}
          alt="Product"
          style={{
            width: '100%',
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
            width: '100%',
            height: 'auto',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: theme.spacing(8),
            gap: theme.spacing(2),
          }}
        >
          <CameraAltRoundedIcon
            sx={{
              fontSize: 100,
              color: theme.palette.grey[500],
            }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.grey[500],
              fontWeight: 'bold',
              fontSize: 24,
            }}
            variant="h6"
          >
            {formatMessage({ id: 'PRODUCT.CARD.PRODUCTS.NO_IMAGE' })}
          </Typography>
        </Box>
      )}

      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.grey[800],
          fontWeight: 'bold',
          fontSize: 24,
        }}
        variant="h6"
      >
        {name}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.grey[800],
          whiteSpace: 'pre-line',
        }}
        variant="body1"
      >
        {modifiedStrings}
      </Typography>
      {currency === 'USD' ? (
        <Typography
          sx={{
            textAlign: 'center',
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            fontSize: 28,
          }}
          variant="body1"
        >
          $ {price} USD
        </Typography>
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            fontSize: 28,
          }}
          variant="body1"
        >
          $ {price} ARS
        </Typography>
      )}
      <Tooltip title="Agregar a favoritos" arrow>
        <IconButton
          sx={{
            alignSelf: 'flex-end', // Alinea el icono a la derecha
            backgroundColor: theme.palette.primary.main,
            padding: '8px',
            borderRadius: '50%',
          }}
          onClick={handleBookmarkClick}
        >
          <BookmarkBorderRoundedIcon sx={{ width: '1.5vw', height: '1.5vw' }} />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default ProductCard;

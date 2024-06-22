import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { Product } from '@webapp/sdk/types/products-types';
import React, { FunctionComponent } from 'react';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  border: 0,
  maxWidth: 700,
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

  const strings = description;

  const modifiedStrings = strings?.replace('Precio por Unidad en USD', '\nPrecio por Unidad en USD');

  return (
    <Wrapper className={className || ''} sx={{ ...sx }} role="region" onClick={onClick} key={id}>
      {image ? (
        <img
          src={image}
          alt="Product"
          style={{
            width: '100%',
            maxWidth: 300,
            height: 'auto',
            borderRadius: 16,
          }}
        />
      ) : null}
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
    </Wrapper>
  );
};

export default ProductCard;

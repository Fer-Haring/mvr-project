import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@webapp/mobile/components/button';
import { useResizeObserver } from '@webapp/mobile/pages/admin/product-admin-detail/utils';
import { CustomInputSearch } from '@webapp/mobile/pages/products/products';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { FixedSizeGrid as Grid } from 'react-window';

interface GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const AdminTable = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();
  const { setProduct } = useSingleProduct();
  const { products } = useAdminDataStore();
  const [searchTerms, setSearchTerms] = React.useState('');
  const gridRef = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver(gridRef);

  const filteredAndSortedProducts = React.useMemo(() => {
    return Object.values(products).filter(
      (product) =>
        product.productName?.toLowerCase().includes(searchTerms.toLowerCase()) ||
        product.productCategory?.toLowerCase().includes(searchTerms.toLowerCase())
    );
  }, [products, searchTerms]);

  const Cell: React.FC<GridChildComponentProps> = ({ columnIndex, rowIndex, style }) => {
    const product = filteredAndSortedProducts[rowIndex];
    if (!product) return null;
    const textToShow = columnIndex === 0 ? product.productName : product.productCategory;

    const handleProductClick = () => {
      setProduct(product);
      navigate(`/admin-dashboard/product/${product.productId}`);
    };

    return (
      <Stack
        sx={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: `1px solid ${theme.palette.grey[300]}`,
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          borderLeft: columnIndex === 0 ? `1px solid ${theme.palette.grey[300]}` : 'none',
          borderTop: rowIndex === 0 ? `1px solid ${theme.palette.grey[300]}` : 'none',
          width: width / 2,
          boxSizing: 'border-box',
          minWidth: 100,
        }}
        onClick={() => handleProductClick()}
      >
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.palette.grey[800],
            width: '100%', // Esto debería ser suficiente para contener el texto y no debería necesitar un minWidth.
            boxSizing: 'border-box',
            textAlign: 'left',
            padding: 1,
          }}
        >
          {textToShow}
        </Typography>
      </Stack>
    );
  };

  return (
    <div ref={gridRef} style={{ width: '100%', height: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            textAlign: 'center',
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {formatMessage({ id: 'ADMIN.SEARCH.PRODUCTS.TABLE.MOBILE' })}
        </Typography>
        <Button variant="contained" size="small" onClick={() => navigate('/nuevo-producto')}>
          {formatMessage({ id: 'ADMIN.CREATE.NEW.PRODUCT.MOBILE' })}
        </Button>
        <CustomInputSearch
          size="small"
          value={searchTerms}
          label={formatMessage({ id: 'PRODUCTS.SEARCH' })}
          placeholder={formatMessage({ id: 'PRODUCTS.SEARCH' })}
          onChange={(e) => setSearchTerms(e.target.value)}
          sx={{ width: '100%' }}
        />
        {filteredAndSortedProducts.length > 0 ? (
          <Grid
            columnCount={2}
            columnWidth={width / 2}
            height={500}
            rowCount={filteredAndSortedProducts.length}
            rowHeight={50}
            width={width} // Usa el ancho dinámico del contenedor
          >
            {Cell}
          </Grid>
        ) : (
          <Typography>{formatMessage({ id: 'PRODUCTS.NO_RESULTS' })}</Typography>
        )}
      </Stack>
    </div>
  );
};

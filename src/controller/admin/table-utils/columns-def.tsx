/* eslint-disable @typescript-eslint/no-explicit-any */
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { ColDef } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const currencyFormatter = (params: any) => {
  const { value, data } = params;
  if (!value || !data) return value;
  if (value === 'nan') return '';
  const currency = data.price_currency;
  if (currency === 'ARS') {
    return `$ ${value}`;
  } else if (currency === 'USD') {
    return `u$s ${value}`;
  }
  return value;
};

// Define un CellRenderer personalizado para la columna con el checkbox y el icono
const CheckboxIconCellRenderer: React.FC<ICellRendererParams> = (params) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={'Ver detalles'} placement="top">
        <IconButton
          aria-label="details"
          size="medium"
          onClick={() => {
            navigate(`/productos/${params.data.id}`);
          }}
          style={{ padding: '4px' }}
        >
          <InfoRoundedIcon fontSize="medium" style={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const columnDefs = (): ColDef[] => [
  {
    headerName: '',
    field: 'checks',
    editable: false,
    filter: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    width: 30,
    resizable: false,
    sort: 'asc',
  },
  {
    headerName: 'Nombre del Producto',
    field: 'product_name',
    editable: true,
    filter: true,
  },
  { headerName: 'Descripción', field: 'description', editable: true, filter: true },
  { headerName: 'Categoría Principal', field: 'main_product_category', editable: true, filter: true },
  { headerName: 'Categoría del Producto', field: 'product_category', editable: true, filter: true },
  { headerName: 'Tipo de Moneda', field: 'price_currency', editable: true, filter: true, width: 150 },
  {
    headerName: 'Precio de Costo',
    field: 'cost_price',
    editable: true,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: currencyFormatter,
  },
  {
    headerName: 'Precio de Venta',
    field: 'sale_price',
    editable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    valueFormatter: currencyFormatter,
  },
  {
    headerName: 'Precio Promocional',
    field: 'promo_price',
    editable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    valueFormatter: currencyFormatter,
  },
  { headerName: 'Stock Actual', field: 'actual_stock', editable: true, filter: true },
  { headerName: 'Stock Mínimo', field: 'minimum_stock', editable: true, filter: true },
  { headerName: 'Control de Stock', field: 'stock_control', editable: true, filter: true },
  { headerName: 'Mostrar en Catálogo', field: 'show_in_catalog', editable: true, filter: true },
  {
    headerName: 'Destacado',
    field: 'featured',
    editable: true,
    filter: true,
    cellStyle: { display: 'flex', justifyContent: 'center' },
  },
  { headerName: 'Fracción', field: 'fraction', editable: true, filter: true },
  { headerName: 'Id Producto', field: 'id', hide: true },
  { headerName: 'Id Producto', field: 'product_image', hide: true },
  {
    headerName: 'Acciones',
    field: 'actions',
    hide: false,
    maxWidth: 60,
    pinned: 'right',
    cellRenderer: CheckboxIconCellRenderer,
  },
];

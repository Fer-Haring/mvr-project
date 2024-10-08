/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef } from 'ag-grid-community';

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

export const columnDefs = (navigate: (path: string) => void): ColDef[] => [
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
    onCellClicked: (params) => navigate(`/productos/${params.data.id}`),
    cellClass: 'product-name-cell',
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
];

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef } from 'ag-grid-community';

const currencyFormatter = (params: any) => {
  const { value, data } = params;
  if (!value || !data) return value;
  const currency = data.priceCurrency;
  if (currency === 'ARS') {
    return `$ ${value}`;
  } else if (currency === 'USD') {
    return `u$s ${value}`;
  }
  return value;
};

export const columnDefs: ColDef[] = [
  {
    headerName: '',
    field: 'checks',
    editable: false,
    filter: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    width: 50,
  },
  { headerName: 'Nombre del Producto', field: 'productName', editable: true, filter: true },
  { headerName: 'Descripción', field: 'description', editable: true, filter: true },
  { headerName: 'Categoría Principal', field: 'mainProductCategory', editable: true, filter: true },
  { headerName: 'Categoría del Producto', field: 'productCategory', editable: true, filter: true },
  { headerName: 'Tipo de Moneda', field: 'priceCurrency', editable: true, filter: true },
  {
    headerName: 'Precio de Costo',
    field: 'costPrice',
    editable: true,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: currencyFormatter,
  },
  {
    headerName: 'Precio de Venta',
    field: 'salePrice',
    editable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    valueFormatter: currencyFormatter,
  },
  {
    headerName: 'Precio Promocional',
    field: 'promoPrice',
    editable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    valueFormatter: currencyFormatter,
  },
  { headerName: 'Stock Actual', field: 'actualStock', editable: true, filter: true },
  { headerName: 'Stock Mínimo', field: 'minimumStock', editable: true, filter: true },
  { headerName: 'Control de Stock', field: 'stockControl', editable: true, filter: true },
  { headerName: 'Mostrar en Catálogo', field: 'showInCatalog', editable: true, filter: true },
  { headerName: 'Destacado', field: 'featured', editable: true, filter: true },
  { headerName: 'Fracción', field: 'fraction', editable: true, filter: true },
  { headerName: 'Id Producto', field: 'productId', hide: true },
  { headerName: 'Id Producto', field: 'productImage', hide: true },
];

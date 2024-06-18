/* eslint-disable @typescript-eslint/no-empty-function */
import DensityLargeRoundedIcon from '@mui/icons-material/DensityLargeRounded';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {
  Column,
  ColumnDef,
  Table as ReactTable,
  RowData,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Select from '@webapp/components/form/select';
import SnackbarUtils from '@webapp/components/snackbar';
import { addNewProduct, getProducts } from '@webapp/sdk/firebase/products';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { debounce } from 'lodash';
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useIntl } from 'react-intl';

import EditableCell, { CustomInputField } from './editable-cell';
import AddProductContent from './modal-components/add-new-product-modal-content';
import AddProductModal from './modal-components/add-product-modal';
import { CustomButtonGroup, HeadersTypos, TableBox } from './table-styles';
import { Product } from '@webapp/sdk/mutations/products/types';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
const useStyles = makeStyles({
  table: {
    borderCollapse: 'initial',
    border: 0,
    borderRadius: 16,
  },
});

export const AdminTable: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const { products, setProducts } = useAdminDataStore();
  const theme = useTheme();
  const classes = useStyles();
  const columnHelper = createColumnHelper<Product>();
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(() => Object.values(products));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showHeaderFilter, setShowHeaderFilter] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [rowsDensity, setRowsDensity] = useState<number>(1);
  const { product, resetProduct } = useSingleProduct();
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Lista de Productos',
    sheet: 'Productos',
  });

  useEffect(() => {
    getProducts().then((products) => {
      if (products) {
        setProducts(products);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddProduct = () => {
    addNewProduct(product)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.product_name}`);
        setOpenAddProductModal(false);
        resetProduct();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto:: ${error}`);
      });
  };

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };

  const getPaddingStyle = (density: number) => {
    switch (density) {
      case 1:
        return { padding: '4px' };
      case 2:
        return { padding: '12px' };
      case 3:
        return { padding: '24px' };
      default:
        return { padding: '4px' };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = React.useMemo<ColumnDef<Product, any>[]>(
    () => [
      columnHelper.accessor((row) => row.product_name, {
        id: 'productName',
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="text"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.product_name' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.description, {
        id: 'description',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.DESCRIPTION' })}</HeadersTypos>
          </Stack>
        ),
        size: 175,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="text"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.main_product_category, {
        id: 'mainProductCategory',
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="text"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        header: () => (
          <Stack>
            <HeadersTypos>
              {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.MAIN.PRODUCTCATEGORY' })}
            </HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.product_category, {
        id: 'productCategory',
        header: () => (
          <Stack>
            <HeadersTypos>
              {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.PRODUCTCATEGORY' })}
            </HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="text"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
      }),
      columnHelper.accessor((row) => row.product_code, {
        id: 'productCode',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.PRODUCTCODE' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="text"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.price_currency, {
        id: 'priceCurrency',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.PRICECURRENCY' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="select"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'ARS', label: 'ARS' },
              ]}
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.cost_price, {
        id: 'costPrice',
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="number"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.COSTPRICE' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.sale_price, {
        id: 'salePrice',
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="number"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.SALEPRICE' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.promo_price, {
        id: 'promoPrice',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.PROMOPRICE' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="number"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.actual_stock, {
        id: 'actualStock',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.ACTUALSTOCK' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="number"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.minimum_stock, {
        id: 'minimumStock',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.MINIMUMSTOCK' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="number"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.stock_control, {
        id: 'stockControl',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.STOCKCONTROL' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="select"
              options={[
                { value: 'Si', label: 'Si' },
                { value: 'N0', label: 'No' },
              ]}
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.show_in_catalog, {
        id: 'showInCatalog',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.SHOWINCATALOG' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="select"
              options={[
                { value: 'Si', label: 'Si' },
                { value: 'N0', label: 'No' },
              ]}
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.destacated, {
        id: 'destacated',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.DESTACATED' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="select"
              options={[
                { value: 'Si', label: 'Si' },
                { value: 'N0', label: 'No' },
              ]}
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.fraction, {
        id: 'fraction',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.HEADER.FRACTION' })}</HeadersTypos>
          </Stack>
        ),
        size: 120,
        cell: (info) => {
          return (
            <EditableCell
              initialValue={info.getValue()}
              index={info.row.id as unknown as number}
              productData={info.row.original}
              id={info.column.id}
              valueTypes="bool"
              updateData={
                typeof info.table.options.meta?.updateData === 'function'
                  ? info.table.options.meta.updateData
                  : () => {}
              }
            />
          );
        },
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper, formatMessage]
  );

  function Filter({ column }: { column: Column<Product, unknown>; table: ReactTable<Product> }) {
    // const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
    const columnFilterValue = column.getFilterValue();
    const [inputValue, setInputValue] = useState(columnFilterValue ?? '');

    const debouncedSetFilterValue = React.useMemo(
      () => debounce((value: string) => column.setFilterValue(value), 500),
      [column]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      debouncedSetFilterValue(value);
    };

    return (
      <CustomInputField
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Buscar..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{ width: '100%', mt: 2 }}
      />
    );
  }

  const FilterComponent = ({ column, table }: { column: Column<Product, unknown>; table: ReactTable<Product> }) => {
    const filterComponent = useMemo(() => {
      return <Filter column={column} table={table} />;
    }, [column, table]);

    return filterComponent;
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 40,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onDownload}
          sx={{
            height: 32,
            width: 'auto',
            alignContent: 'center',
            alignSelf: 'end',
            color: theme.palette.grey[200],
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.grey[200],
            },
          }}
        >
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.EXPORT.AS.ECXEL' })}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddProductModal}
          sx={{
            height: 32,
            width: 'auto',
            alignContent: 'center',
            alignSelf: 'end',
            color: theme.palette.grey[200],
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.grey[200],
            },
          }}
        >
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.ADDPRODUCT' })}
        </Button>
        {openAddProductModal && (
          <AddProductModal
            title="Agregar Producto"
            subtitle="Agrega un nuevo producto a la lista"
            open={openAddProductModal}
            onClose={() => setOpenAddProductModal(false)}
            customContent={<AddProductContent />}
            primaryButtonText={formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.ADDPRODUCT' })}
            primaryButtonOnClick={handleAddProduct}
            primaryButtonColor="primary"
            primaryButtonDisabled={false}
            secondaryButtonText={formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.CANCEL' })}
            secondaryButtonOnClick={() => {
              setOpenAddProductModal(false);
              resetProduct();
            }}
            secondaryButtonColor="secondary"
            secondaryButtonDisabled={false}
          />
        )}
        <CustomButtonGroup size="small" aria-label="Slector de densidad de filas">
          <Tooltip title="Densidad pequeña" placement="top" arrow>
            <Box>
              <Button
                variant={rowsDensity === 1 ? 'contained' : 'outlined'}
                onClick={() => setRowsDensity(1)}
                sx={{ color: rowsDensity === 1 ? theme.palette.grey[200] : theme.palette.grey[800], height: 32 }}
              >
                <DensitySmallRoundedIcon />
              </Button>
            </Box>
          </Tooltip>
          <Tooltip title="Densidad media" placement="top" arrow>
            <Box>
              <Button
                variant={rowsDensity === 2 ? 'contained' : 'outlined'}
                onClick={() => setRowsDensity(2)}
                sx={{ color: rowsDensity === 2 ? theme.palette.grey[200] : theme.palette.grey[800], height: 32 }}
              >
                <DensityMediumRoundedIcon />
              </Button>
            </Box>
          </Tooltip>
          <Tooltip title="Densidad grande" placement="top" arrow>
            <Box>
              <Button
                variant={rowsDensity === 3 ? 'contained' : 'outlined'}
                onClick={() => setRowsDensity(3)}
                sx={{ color: rowsDensity === 3 ? theme.palette.grey[200] : theme.palette.grey[800], height: 32 }}
              >
                <DensityLargeRoundedIcon />
              </Button>
            </Box>
          </Tooltip>
        </CustomButtonGroup>
      </Stack>
      <Box style={{ direction: table.options.columnResizeDirection }}>
        <TableContainer component={TableBox}>
          <Table
            ref={tableRef}
            {...{
              className: classes.table,
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            {/* TABLE HEAD */}
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <Stack
                          key={header.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Tooltip title={`Click para filtrar por ${header.column.id}`} placement="top" arrow>
                            <Box
                              key={header.id}
                              sx={{
                                cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => {
                                setShowHeaderFilter(!showHeaderFilter);
                                setActiveFilterColumn(showHeaderFilter ? null : header.id);
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <Box
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className={`resizer ${table.options.columnResizeDirection} ${
                                  header.column.getIsResizing() ? 'isResizing' : ''
                                }`}
                                onDoubleClick={() => header.column.resetSize()}
                                sx={{
                                  display: 'inline-block',
                                  background: theme.palette.primary.main,
                                  width: 4,
                                  height: '100%',
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  transform: 'translateX(50%)',
                                  zIndex: 1,
                                  touchAction: 'none',
                                  '& :hover': {
                                    background: theme.palette.primary.main,
                                  },
                                  '& .isResizing': {
                                    background: theme.palette.primary.main,
                                  },
                                }}
                              />
                            </Box>
                          </Tooltip>
                          {showHeaderFilter && header.id === activeFilterColumn && header.column.getCanFilter() && (
                            <div>
                              <FilterComponent column={header.column} table={table} key={header.column.id} />
                            </div>
                          )}
                        </Stack>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: 20,
              }}
            />
            {/* TABLE BODY */}
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={getPaddingStyle(rowsDensity)}
                          sx={{
                            width: cell.column.getSize(),
                            maxWidth: cell.column.getSize(),
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>

          {/* PAGINATION  */}
        </TableContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CustomButtonGroup size="small" aria-label="Slector de densidad de filas">
              <Tooltip title="Ir a la Primer Pagina" placement="top" arrow>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<<'}
                  </Button>
                </Box>
              </Tooltip>
              <Tooltip title="Pagina Anterior" placement="top" arrow>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<'}
                  </Button>
                </Box>
              </Tooltip>
              <Tooltip title="Siguiente Pagina" placement="top" arrow>
                <Box>
                  <Button variant="outlined" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {'>'}
                  </Button>
                </Box>
              </Tooltip>
              <Tooltip title="Ir a la Ultima Pagina" placement="top" arrow>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {'>>'}
                  </Button>
                </Box>
              </Tooltip>
            </CustomButtonGroup>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography color={theme.palette.grey[800]}>Pagina</Typography>
              <Typography color={theme.palette.grey[800]}>
                <strong>
                  {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </strong>
              </Typography>
            </Box>
          </Box>
          <CustomSelect
            id="select"
            value={table.getState().pagination.pageSize.toString()}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            options={[
              { value: '10', label: 'Mostrar 10 Productos' },
              { value: '20', label: 'Mostrar 20 Productos' },
              { value: '30', label: 'Mostrar 30 Productos' },
              { value: '40', label: 'Mostrar 40 Productos' },
              { value: '50', label: 'Mostrar 50 Productos' },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  maxWidth: 250,
  width: '100%',
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
  },
  '& .MuiSelect-input': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiSelect-select': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[200],
  },
}));

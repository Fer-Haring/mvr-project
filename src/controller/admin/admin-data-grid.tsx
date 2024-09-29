import { Box, CircularProgress, Typography, alpha, styled, useTheme } from '@mui/material';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useUpdateProduct } from '@webapp/sdk/mutations/products/update-product-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { useAgGridColumnSortingStore } from '@webapp/store/admin/ag-grid-column-sort';
import { useAgGridFilterStore } from '@webapp/store/admin/ag-grid-filters';
import useBulkEditStore from '@webapp/store/admin/bulk-edit-store';
import {
  CellEditingStoppedEvent,
  ColDef,
  FilterChangedEvent,
  GetRowIdParams,
  PaginationNumberFormatterParams,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { ref } from 'firebase/database';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import ProductHeaderActions from './table-header-actions';
import { localeText } from './table-utils/ag-grid-text-locale';
import { columnDefs } from './table-utils/columns-def';

interface AdminDataGridProps {}

const AdminDataGrid: React.FC<AdminDataGridProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const gridRef = useRef<AgGridReact>(null);
  const isUserDragging = useRef(false);
  const [rowData, setRowData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { setProducts, setSelectedProducts } = useBulkEditStore();
  const { columnOrder, setColumnOrder } = useAgGridColumnSortingStore();
  const { filters, setFilter } = useAgGridFilterStore();
  const productsList = useProductListQuery(1, 500);
  const { mutate } = useUpdateProduct();
  const [selectedRowProducts, setSelectedRowProducts] = useState<Product[]>([]);
  const isFiltering = useRef(false);

  useEffect(() => {
    setLoading(true);
    if (productsList.data?.products && Array.isArray(productsList.data.products)) {
      const productsArray: Product[] = productsList.data.products;
      setRowData(productsArray);
      setProducts(productsArray);
    } else {
      console.error('Products data is not an array:', productsList.data?.products);
    }
    setLoading(false);
  }, [productsList.data?.products, setProducts]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      const gridApi = gridRef.current.api;

      // Escuchar el evento de movimiento de columnas
      const onColumnMoved = () => {
        const allColumns = gridApi.getColumns();
        const columnOrder = allColumns?.map((col) => col.getColId());
        setColumnOrder(columnOrder || []);
      };

      gridApi.addEventListener('columnMoved', onColumnMoved);

      return () => {
        gridApi.removeEventListener('columnMoved', onColumnMoved);
      };
    }
  }, [gridRef, setColumnOrder]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api && columnOrder && columnOrder.length > 0) {
      const columnApi = gridRef.current.api;

      columnApi.applyColumnState({
        state: columnOrder.map((colId) => ({
          colId,
          order: columnOrder.indexOf(colId),
        })),
        applyOrder: true,
      });
    }
  }, [gridRef.current?.api, columnOrder]);

  useEffect(() => {
    if (gridRef.current && filters && rowData.length > 0 && !loading && !isFiltering.current) {
      isFiltering.current = true;
      const gridApi = gridRef.current.api;

      if (gridApi) {
        gridApi.setFilterModel(filters);
        gridApi.onFilterChanged();
      }

      isFiltering.current = false;
    }
  }, [filters, rowData, loading]);

  const onFilterChanged = (params: FilterChangedEvent) => {
    const appliedFilters = params.api.getFilterModel();
    Object.keys(appliedFilters).forEach((colId) => {
      if (JSON.stringify(filters[colId]) !== JSON.stringify(appliedFilters[colId])) {
        setFilter(colId, appliedFilters[colId]);
      }
    });
  };

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [200, 500, 1000];
  }, []);

  const paginationNumberFormatter = useCallback((params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const onCellEditingStopped = useCallback(
    async (event: CellEditingStoppedEvent) => {
      const updatedData = event.data;
      const id = updatedData.id;
      if (id) {
        const productData: Product = {
          product_name: updatedData.product_name,
          description: updatedData.description,
          main_product_category: updatedData.main_product_category,
          product_category: updatedData.product_category,
          price_currency: updatedData.price_currency,
          cost_price: updatedData.cost_price,
          sale_price: updatedData.sale_price,
          promo_price: updatedData.promo_price,
          actual_stock: updatedData.actual_stock,
          minimum_stock: updatedData.minimum_stock,
          stock_control: updatedData.stock_control,
          show_in_catalog: updatedData.show_in_catalog,
          featured: updatedData.featured,
          fraction: updatedData.fraction,
          product_image: updatedData.product_image,
          id: id,
          currency_type: updatedData.currency_type,
          product_id: updatedData.product_id,
          product_code: updatedData.product_code,
        };
        mutate({ productId: id, productData });
      }
    },
    [mutate]
  );

  const getRowId = (params: GetRowIdParams) => {
    return (params.data as Product).id || '';
  };

  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const allSelectedRows: Product[] = event.api.getSelectedRows();
      setSelectedProducts(allSelectedRows);
      setSelectedRowProducts(allSelectedRows);
    },
    [setSelectedProducts]
  );

  const onGridReady = (params: any) => {
    const gridApi = params.api;

    const onColumnMoved = () => {
      const allColumns = gridApi.getColumns();
      const columnOrder = allColumns.map((col: any) => col.getColId());
      setColumnOrder(columnOrder);
    };

    gridApi.addEventListener('columnMoved', onColumnMoved);

    // Limpia el listener cuando el componente se desmonte
    return () => {
      gridApi.removeEventListener('columnMoved', onColumnMoved);
    };
  };

  const onColumnMoved = useCallback(
    (params: any) => {
      const columnState = params.columnApi.getColumnState();
      const columnOrder = columnState.map((colState: any) => colState.colId);
      setColumnOrder(columnOrder);
    },
    [setColumnOrder]
  );

  const columns = useMemo(() => {
    const originalColumns = columnDefs(navigate);

    if (columnOrder && columnOrder.length > 0) {
      return columnOrder
        .map((colId) => originalColumns.find((col) => col.field === colId))
        .filter((col): col is ColDef<unknown, any> => col !== undefined);
    }

    return originalColumns;
  }, [navigate, columnOrder]);
  return (
    <div>
      <Typography variant="h5" sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mb: 5 }}>
        {formatMessage({ id: 'ADMIN.PRODUCTS.LIST.TITLE' })}
      </Typography>
      <ProductHeaderActions selectedRows={selectedRowProducts} />
      <div className="ag-theme-quartz" style={{ height: 800, width: '100%', marginTop: 25 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={50} />
          </Box>
        ) : (
          <StyledAgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columns}
            pagination={true}
            enterNavigatesVertically={true}
            enterNavigatesVerticallyAfterEdit={true}
            onCellEditingStopped={onCellEditingStopped}
            rowSelection={'multiple'}
            onSelectionChanged={onSelectionChanged}
            getRowId={getRowId}
            localeText={localeText}
            paginationPageSize={500}
            paginationPageSizeSelector={paginationPageSizeSelector}
            paginationNumberFormatter={paginationNumberFormatter}
            suppressServerSideFullWidthLoadingRow={true}
            onFilterChanged={onFilterChanged}
            onGridReady={onGridReady}
            onColumnMoved={onColumnMoved}
            gridOptions={{
              rowSelection: 'multiple',
              rowMultiSelectWithClick: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDataGrid;

const StyledAgGridReact = styled(AgGridReact)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  width: '100%',
  border: 'none',
  textAlign: 'center',
  '& .ag-header-cell': {
    paddingLeft: 0,
  },
  '& .ag-header-cell-text': {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 14,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  '& .ag-row-even': {
    fontSize: 16,
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
    borderRadius: theme.spacing(2),
  },
  '& .ag-row-odd': {
    fontSize: 16,
    borderRadius: theme.spacing(2),
  },
  '& .ag-header': {
    marginBottom: theme.spacing(2),
    border: 0,
  },
  '& .ag-pinned-left-header': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
  },
  '& .ag-cell-last-left-pinned:not': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    border: 'none',
  },
  '& .product-name-cell': {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 18,
    },
  },
  '& .ag-header-container': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    '& .ag-header-cell': {
      border: 0,
    },
  },
}));

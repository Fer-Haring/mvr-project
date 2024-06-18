import { Box, CircularProgress, alpha, styled } from '@mui/material';
import { getProducts } from '@webapp/sdk/firebase/products';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';

import {
  CellEditingStoppedEvent,
  GetRowIdParams,
  PaginationNumberFormatterParams,
  SelectionChangedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ProductHeaderActions from './table-header-actions';
import { localeText } from './table-utils/ag-grid-text-locale';
import { columnDefs } from './table-utils/columns-def';
import useBulkEditStore from '@webapp/store/admin/bulk-edit-store';
import { Product } from '@webapp/sdk/mutations/products/types';

interface AdminDataGridProps {}

const AdminDataGrid: React.FC<AdminDataGridProps> = () => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { setProducts, setSelectedProducts, products } = useBulkEditStore();

  useEffect(() => {
    setLoading(true);
    getProducts().then((products) => {
      if (products && typeof products === 'object') {
        const productsArray: Product[] = Object.values(products);
        setRowData(productsArray);
        setProducts(productsArray);
      } else {
        console.error('Products data is not an array or an object:', products);
      }
      setLoading(false);
    });
  }, [setProducts]);

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [200, 500, 1000];
  }, []);

  const paginationNumberFormatter = useCallback((params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const onCellEditingStopped = useCallback(async (event: CellEditingStoppedEvent) => {
    const updatedData = event.data;
    const id = updatedData.id;
    if (id) {
      const productData: Product = {
        product_name: updatedData.productName,
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
        destacated: updatedData.destacated,
        fraction: updatedData.fraction,
        product_image: updatedData.product_image,
        id: id,
        tipo_de_moneda: updatedData.tipo_de_moneda,
        product_id: updatedData.id,
        product_code: updatedData.product_code,
      };
      await updateProduct(id, productData);
    }
  }, []);

  const getRowId = (params: GetRowIdParams) => {
    return (params.data as Product).id || '';
  };

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const allSelectedRows: Product[] = event.api.getSelectedRows();
    setSelectedProducts(allSelectedRows);
  }, [setSelectedProducts]);

  return (
    <div>
      <ProductHeaderActions rowData={rowData} setRowData={setRowData} selectedRows={products} />
      <div className="ag-theme-quartz" style={{ height: 400, width: '100%', marginTop: 25 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={50} />
          </Box>
        ) : (
          <StyledAgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
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
            gridOptions={{
              rowSelection: 'multiple',
              rowMultiSelectWithClick: true,
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

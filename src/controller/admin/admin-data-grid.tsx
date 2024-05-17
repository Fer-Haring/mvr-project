/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, styled, CircularProgress, Box } from '@mui/material';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';
import { Products } from '@webapp/sdk/users-types';
import { CellEditingStoppedEvent, GetRowIdParams, PaginationNumberFormatterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { localeText } from './table-utils/ag-grid-text-locale';
import { columnDefs } from './table-utils/columns-def';
import ProductHeaderActions from './table-header-actions';
import { getProducts } from '@webapp/sdk/firebase/products';

interface AdminDataGridProps { }

const AdminDataGrid: React.FC<AdminDataGridProps> = () => {
  const [rowData, setRowData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('rowData:', rowData);
  useEffect(() => {
    setLoading(true);
    getProducts().then((products) => {
      console.log('products:', products);
      if (products && typeof products === 'object') {
        // Convertir el objeto en un array de objetos
        const productsArray: Products[] = Object.values(products);
        setRowData(productsArray);
      } else {
        console.error('Products data is not an array or an object:', products);
      }
      setLoading(false);
    });
  }, []);

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [200, 500, 1000];
  }, []);

  const paginationNumberFormatter = useCallback(
    (params: PaginationNumberFormatterParams) => {
      return "[" + params.value.toLocaleString() + "]";
    },
    [],
  );

  const onCellEditingStopped = useCallback(async (event: CellEditingStoppedEvent) => {
    const updatedData = event.data;
    const id = updatedData.productId;
    if (id) {
      const productData: Products = {
        productName: updatedData.productName,
        description: updatedData.description,
        mainProductCategory: updatedData.mainProductCategory,
        productCategory: updatedData.productCategory,
        priceCurrency: updatedData.priceCurrency,
        costPrice: updatedData.costPrice,
        salePrice: updatedData.salePrice,
        promoPrice: updatedData.promoPrice,
        actualStock: updatedData.actualStock,
        minimumStock: updatedData.minimumStock,
        stockControl: updatedData.stockControl,
        showInCatalog: updatedData.showInCatalog,
        destacated: updatedData.destacated,
        fraction: updatedData.fraction,
        productId: id,
      };
      await updateProduct(id, productData);
    }
  }, []);

  const getRowId = (params: GetRowIdParams) => {
    return (params.data as Products).productId || '';
  };

  return (
    <div>
      <ProductHeaderActions rowData={rowData} setRowData={setRowData} />
        <div className="ag-theme-quartz" style={{ height: 400, width: '100%', marginTop: 25 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress size={50}/>
        </Box>
      ) : (
          <StyledAgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            enterNavigatesVertically={true}
            enterNavigatesVerticallyAfterEdit={true}
            onCellEditingStopped={onCellEditingStopped}
            getRowId={getRowId}
            localeText={localeText}
            paginationPageSize={500}
            paginationPageSizeSelector={paginationPageSizeSelector}
            paginationNumberFormatter={paginationNumberFormatter}
            suppressServerSideFullWidthLoadingRow={true}
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

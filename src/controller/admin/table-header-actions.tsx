/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import SnackbarUtils from '@webapp/components/snackbar';
import { addNewProduct } from '@webapp/sdk/firebase/products';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import * as XLSX from 'xlsx';

import AddProductContent from './modal-components/add-new-product-modal-content';
import AddProductModal from './modal-components/add-product-modal';
import BulkEditButton from './table-utils/bulk-edit-button';
import { Product } from '@webapp/sdk/mutations/products/types';

interface ProductHeaderActionsProps {
  setRowData: (value: React.SetStateAction<any[]>) => void;
  rowData: any[];
  selectedRows: Product[];
}

const ProductHeaderActions: React.FC<ProductHeaderActionsProps> = ({ setRowData, rowData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { product, resetProduct } = useSingleProduct();
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);

  const handleOpenExportModal = () => {
    setOpenExportModal(true);
  };

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };

  const handleAddProduct = () => {
    addNewProduct(product)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.product_name}`);
        setOpenAddProductModal(false);
        resetProduct();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto: ${error}`);
      });
  };

  const formatData = (data: Product[]) => {
    return data.map((item) => ({
      'Nombre del producto': item.product_name,
      Descripción: item.description,
      'Categoría Principal': item.main_product_category,
      'Categoría del producto': item.product_category,
      'Tipo de Moneda': item.price_currency,
      'Precio de costo': item.cost_price,
      'Precio de venta': item.sale_price,
      'Precio promocional': item.promo_price,
      'Stock actual': item.actual_stock,
      'Stock mínimo': item.minimum_stock,
      'Control de stock': item.stock_control,
      'Mostrar en catálogo': item.show_in_catalog,
      Destacado: item.featured,
      Fracción: item.fraction,
      id: item.id,
    }));
  };

  const handleFileUploadAndUpdate = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json<Product>(worksheet);

          // Update each product in the database
          for (const product of jsonData) {
            if (product.id) {
              await updateProduct(product.id, product);
            }
          }

          // Update the local state
          if (Array.isArray(jsonData)) {
            setRowData(formatData(jsonData));
          } else {
            console.error('jsonData is not an array:', jsonData);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    };

    input.click();
  };

  const handleExportToExcel = (data: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(rowData)) {
      console.error('rowData is not an array:', rowData);
      return;
    }

    const dataToExport = rowData.map((item: any) => {
      return {
        'Nombre del producto': item.productName || 'N/A',
        Descripción: item.description || 'N/A',
        'Categoría Principal': item.mainProductCategory || 'N/A',
        'Categoría del producto': item.productCategory || 'N/A',
        'Tipo de Moneda': item.priceCurrency || 'N/A',
        'Precio de costo': item.costPrice || 'N/A',
        'Precio de venta': item.salePrice || 'N/A',
        'Precio promocional': item.promoPrice || 'N/A',
        'Stock actual': item.actualStock || 'N/A',
        'Stock mínimo': item.minimumStock || 'N/A',
        'Control de stock': item.stockControl || 'N/A',
        'Mostrar en catálogo': item.showInCatalog || 'N/A',
        Destacado: item.featured || 'N/A',
        Fracción: item.fraction || 'N/A',
        id: item.id || 'N/A',
      };
    });
    console.log('dataToExport:', dataToExport);
    handleExportToExcel(dataToExport, 'Lista de Productos');
    setOpenExportModal(false);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
      <BulkEditButton/>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenExportModal}
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
        onClick={handleFileUploadAndUpdate}
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
        {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.IMPORT.ECXEL' })}
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
      {openExportModal && (
        <Modal
          open={openExportModal}
          onClose={() => setOpenExportModal(false)}
          title="Exportar productos"
          subtitle="Exporta los productos a un archivo Excel"
          primaryButtonText="Exportar"
          primaryButtonOnClick={exportToExcel}
          primaryButtonColor="primary"
        />
      )}
    </Stack>
  );
};

export default ProductHeaderActions;

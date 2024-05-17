/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import SnackbarUtils from '@webapp/components/snackbar';
import { addNewProduct } from '@webapp/sdk/firebase/products';
import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import * as XLSX from 'xlsx';
import AddProductContent from './modal-components/add-new-product-modal-content';
import AddProductModal from './modal-components/add-product-modal';
import Modal from '@webapp/components/modal';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';

interface ProductHeaderActionsProps {
  setRowData: (value: React.SetStateAction<any[]>) => void;
  rowData: any[];
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
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.productName}`);
        setOpenAddProductModal(false);
        resetProduct();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto: ${error}`);
      });
  };

  const formatData = (data: Products[]) => {
    return data.map((item) => ({
      'Nombre del producto': item.productName,
      Descripción: item.description,
      'Categoría Principal': item.mainProductCategory,
      'Categoría del producto': item.productCategory,
      'Tipo de Moneda': item.priceCurrency,
      'Precio de costo': item.costPrice,
      'Precio de venta': item.salePrice,
      'Precio promocional': item.promoPrice,
      'Stock actual': item.actualStock,
      'Stock mínimo': item.minimumStock,
      'Control de stock': item.stockControl,
      'Mostrar en catálogo': item.showInCatalog,
      Destacado: item.destacated,
      Fracción: item.fraction,
      productId: item.productId,
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
          const jsonData = XLSX.utils.sheet_to_json<Products>(worksheet);

          // Update each product in the database
          for (const product of jsonData) {
            if (product.productId) {
              await updateProduct(product.productId, product);
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
      console.error("rowData is not an array:", rowData);
      return;
    }

    const dataToExport = rowData.map((item: any) => {
      console.log('item:', item); // Verifica cada item en rowData
      return {
        'Nombre del producto': item['Nombre del producto'],
        'Descripción': item['Descripción'],
        'Categoría Principal': item['Categoría Principal'],
        'Categoría del producto': item['Categoría del producto'],
        'Tipo de Moneda': item['Tipo de Moneda'],
        'Precio de costo': item['Precio de costo'],
        'Precio de venta': item['Precio de venta'],
        'Precio promocional': item['Precio promocional'],
        'Stock actual': item['Stock actual'],
        'Stock mínimo': item['Stock mínimo'],
        'Control de stock': item['Control de stock'],
        'Mostrar en catálogo': item['Mostrar en catálogo'],
        'Destacado': item['Destacado'],
        'Fracción': item['Fracción'],
        'productId': item['productId'],
      };
    });
    handleExportToExcel(dataToExport, 'Productos');
    setOpenExportModal(false);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
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

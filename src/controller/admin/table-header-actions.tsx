import { Stack, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import SnackbarUtils from '@webapp/components/snackbar';
import { useExportCsvExcel } from '@webapp/sdk/mutations/admin/export-csv-excel-query';
import { useImportXlsxCsv } from '@webapp/sdk/mutations/admin/import-xlsx-csv-mutation';
import { useAddNewProduct } from '@webapp/sdk/mutations/products/add-new-product-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import AddProductContent from './modal-components/add-new-product-modal-content';
import AddProductModal from './modal-components/add-product-modal';
import BulkEditButton from './table-utils/bulk-edit-button';

interface ProductHeaderActionsProps {
  selectedRows: Product[];
}

const ProductHeaderActions: React.FC<ProductHeaderActionsProps> = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { product, resetProduct } = useSingleProduct();
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const addProduct = useAddNewProduct();
  const [fileType, setFileType] = useState<string>('xlsx');
  const exportCsvExcel = useExportCsvExcel();
  const importXlsx = useImportXlsxCsv();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenExportModal = () => {
    setOpenExportModal(true);
  };

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };

  const handleAddProduct = () => {
    addProduct
      .mutateAsync(product)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.product_name}`);
        setOpenAddProductModal(false);
        resetProduct();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto: ${error}`);
      });
  };

  const handleFileUploadAndUpdate = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importXlsx
        .mutateAsync(file)
        .then(() => {
          // Aquí puedes manejar la respuesta del servidor si es necesario
          SnackbarUtils.success('Productos importados con éxito');
          // Si el servidor devuelve los datos actualizados, puedes actualizar el estado aquí
          // setRowData(result);
        })
        .catch((error) => {
          console.error('Error en la importación:', error);
          SnackbarUtils.error(`Error al importar productos: ${error.message}`);
        });
    }
  };

  const exportToExcel = () => {
    setFileType('xlsx');
    exportCsvExcel
      .mutateAsync({
        fileFormat: fileType,
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Lista de Productos.${fileType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setOpenExportModal(false);
      })
      .catch((error) => {
        console.error('Error al exportar:', error);
      });
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
      <BulkEditButton />
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
        loading={importXlsx.isPending}
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".xlsx, .xls"
        onChange={handleFileChange}
      />
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

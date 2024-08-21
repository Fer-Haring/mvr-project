import { Box, Stack, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import SnackbarUtils from '@webapp/components/snackbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useExportCsvExcel } from '@webapp/sdk/mutations/admin/export-csv-excel-query';
import { useImportXlsxCsv } from '@webapp/sdk/mutations/admin/import-xlsx-csv-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import BulkEditButton from './table-utils/bulk-edit-button';

interface ProductHeaderActionsProps {
  selectedRows: Product[];
}

const ProductHeaderActions: React.FC<ProductHeaderActionsProps> = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const theme = useTheme();

  const [openExportModal, setOpenExportModal] = useState(false);
  const [fileType, setFileType] = useState<string>('xlsx');
  const exportCsvExcel = useExportCsvExcel();
  const importXlsx = useImportXlsxCsv();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenExportModal = () => {
    setOpenExportModal(true);
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
          SnackbarUtils.success('Productos importados con éxito');
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
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
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
          onClick={() => navigate('/admin-dashboard/add-new-product')}
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
      </Box>
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

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Box, CircularProgress, Divider, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import Button from '@webapp/components/button';
import Modal from '@webapp/components/modal';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { CompletedOrder } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import { ColDef, IGetRowsParams, PaginationNumberFormatterParams, ValueGetterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { localeText } from '../admin/table-utils/ag-grid-text-locale';
import CustomDetailCellRenderer from './table-utils/detail-cell-renderer';
import OrderDetailModalContent from './table-utils/order-detail-modal-content';

export const ProfileTable: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<CompletedOrder | null>(null);
  const { user } = useUserData();
  const [rowData, setRowData] = useState<CompletedOrder[]>([]);
  const [data] = useState(() => (user?.completed_orders ? [...user.completed_orders] : []));

  const TotalOrderCell: React.FC<ValueGetterParams> = (props) => {
    const { data } = props;
    return (
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontWeight: 100,
          fontSize: 14,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        {data.currency_used_to_pay === 'USD' ? `$${data.total_order_amount_usd}` : `$${data.total_order_amount_ars}`}{' '}
        {data.currency_used_to_pay}
      </Typography>
    );
  };

  const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const productsNameMapped = (params: ValueGetterParams) => {
    return params.data.cart_items.map((item: CartItem) => item.product_name).join(', ');
  };

  const handleRowClick = (order: CompletedOrder) => {
    setSelectedOrder(order);
    setOpenDetailModal(true);
  };

  const columnDefs = (): ColDef[] => [
    {
      headerName: '',
      width: 80,
      cellClass: 'see-more-cell',
      cellRenderer: (params: ValueGetterParams) => (
        <Button
          size="small"
          variant="contained"
          sx={{ width: '90%', height: '80%', borderRadius: 16, boxShadow: 'none' }}
          onClick={() => handleRowClick(params.data)}
        >
          <VisibilityRoundedIcon />
        </Button>
      ),
    },
    {
      headerName: 'Número de Pedido',
      field: 'order_id',
      editable: false,
      filter: true,
      cellClass: 'order-id-cell',
    },
    {
      headerName: 'Nombre del Producto',
      field: 'product_name',
      editable: false,
      filter: true,
      cellRenderer: (params: ValueGetterParams) => productsNameMapped(params),
    },
    { headerName: 'Total de Productos', field: 'total_products', editable: false, filter: true },
    { headerName: 'Tipo de Entrega', field: 'delivery_type', editable: false, filter: true },
    { headerName: 'Metodo de Pago', field: 'payment_method', editable: false, filter: true, width: 150 },
    {
      headerName: 'Total del Pedido',
      valueGetter: (params: ValueGetterParams) => {
        const selectedCurrency = params.data.currency_used_to_pay;
        if (selectedCurrency === 'ARS') {
          return params.data.total_order_amount_ars;
        } else if (selectedCurrency === 'USD') {
          return params.data.total_order_amount_usd;
        }
        return null;
      },
      cellRenderer: (params: ValueGetterParams) => TotalOrderCell(params),
      editable: false,
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Pedido Realizado',
      field: 'created_at',
      editable: false,
      filter: true,
      valueFormatter: (params) => formatDate(params.value),
    },
  ];

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        detailCellRenderer: 'customDetailCellRenderer',
      },
      getDetailRowData: function (params: IGetRowsParams) {
        params.successCallback(params.context.data.cart_items);
      },
    };
  }, []);

  const columns = useMemo(() => columnDefs(), []);

  useEffect(() => {
    setLoading(true);
    if (data && Array.isArray(data)) {
      const productsArray: CompletedOrder[] = data;
      setRowData(productsArray);
    } else {
      console.error('Products data is not an array:', data);
    }
    setLoading(false);
  }, [data]);

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [200, 500, 1000];
  }, []);

  const paginationNumberFormatter = useCallback((params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  return (
    <>
      <Stack spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#000000', fontWeight: 600 }} fontSize={26}>
          {formatMessage({ id: 'COMMON.PROFILE.TABLE.TITLE' })}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 0 }} color="#000000" orientation="horizontal" />
      <div className="ag-theme-quartz" style={{ height: 400, width: '100%', marginTop: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={50} />
          </Box>
        ) : (
          <StyledAgGridReact
            rowData={rowData}
            columnDefs={columns}
            masterDetail={true}
            components={{
              customDetailCellRenderer: CustomDetailCellRenderer,
            }}
            detailCellRendererParams={detailCellRendererParams}
            pagination={false}
            enterNavigatesVertically={true}
            enterNavigatesVerticallyAfterEdit={true}
            localeText={localeText}
            paginationPageSize={500}
            paginationPageSizeSelector={paginationPageSizeSelector}
            paginationNumberFormatter={paginationNumberFormatter}
            suppressServerSideFullWidthLoadingRow={true}
            gridOptions={{
              rowSelection: 'multiple',
              rowMultiSelectWithClick: false,
            }}
          />
        )}
      </div>

      {selectedOrder && (
        <Modal
          open={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          title={formatMessage({ id: 'COMMON.PROFILE.TABLE.MODAL.TITLE' })}
          customContent={<OrderDetailModalContent orderDetail={selectedOrder} />}
          primaryButtonOnClick={() => setOpenDetailModal(false)}
          primaryButtonText={formatMessage({ id: 'COMMON.PROFILE.TABLE.MODAL.CLOSE' })}
          
        />
      )}
    </>
  );
};

const StyledAgGridReact = styled(AgGridReact)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(2),
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
    paddingLeft: theme.spacing(2),
  },
  '& .ag-row-odd': {
    fontSize: 16,
    borderRadius: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  '& .ag-header': {
    marginBottom: theme.spacing(2),
    border: 0,
    paddingLeft: theme.spacing(2),
  },
  '& .ag-full-width-container': {
    paddingLeft: '16px !important',
    // backgroundColor: alpha(theme.palette.grey[200], 0.5),
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
  '& .see-more-cell': {
    paddingLeft: 0,
    paddingRight: 0,
    border: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 18,
    },
  },
  '& .ag-header-container': {
    border: 'none',
  },
  '& .ag-header-group-cell': {
    border: 'none',
  },
  '& .ag-header-cell-label': {
    border: 'none',
  },
  '& .ag-full-width-viewport': {
    border: 'none',
  },
  '& .ag-body': {
    border: 'none',
  },
  '& .ag-center-cols-clipper': {
    border: 'none',
  },
  '& .ag-center-cols-viewport': {
    border: 'none',
  },
  '& .ag-center-cols-container': {
    border: 'none',
  },
  '& .ag-row': {
    border: 'none',
  },
  '& .ag-row-group': {
    border: 'none',
  },
  '& .ag-cell': {
    border: 'none',
  },
  '& .order-id-cell': {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

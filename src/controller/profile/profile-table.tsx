import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import arrowDownAnimation from '@webapp/assets/images/animations/downArrow.json';
import arrowUpAnimation from '@webapp/assets/images/animations/upArrow.json';
import { CompletedOrder } from '@webapp/sdk/types/user-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import Lottie from 'react-lottie';

import EllipsisTooltip from '../admin/elipsis-tooltip';
import ExpandableTableContent from './expandable-table-content';

type ExpandedRowsType = {
  [key: string]: boolean;
};

const useStyles = makeStyles({
  table: {
    borderCollapse: 'initial',
    border: 'none',
    borderRadius: 16,
  },
});

export const ProfileTable: FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const { user } = useUserData();
  const { dollarValue } = useDollarValue();
  const [data] = useState(() => (user.completed_orders ? [...user.completed_orders] : []));
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<CompletedOrder>();
  const [expandedRows, setExpandedRows] = useState<ExpandedRowsType>({});

  const handleExpandClick = (rowId: string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowId]: !prevExpandedRows[rowId],
    }));
  };

  const convertedPrice = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return price;
    } else if (priceCurrency === 'USD') {
      const convertedPrice = Number(price * Number(dollarValue));
      return `${price} USD = ${convertedPrice.toFixed(2)} ARS`;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = React.useMemo<ColumnDef<CompletedOrder, any>[]>(
    () => [
      columnHelper.accessor((row) => row.expandable, {
        id: 'expandable',
        size: 200,
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        header: () => <></>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.order_id, {
        id: 'orderId',
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        header: () => <Stack>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.ORDER.NUMBER' })}</Stack>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.cart_items?.map((cart) => cart.product_name), {
        id: 'productName',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.PRODUCT.NAME' })}</HeadersTypos>
          </Stack>
        ),
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.total_products, {
        id: 'totalProducts',
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.PRODUCT.TOTAL' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('deliveryType', {
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.DELIVERY.TYPE' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('paymentMethod', {
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.PAYMENT.METHOD' })}</HeadersTypos>
          </Stack>
        ),
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('totalOrderAmount', {
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.TOTAL' })}</HeadersTypos>
          </Stack>
        ),
        footer: (info) => info.column.id,
        cell: (info) => {
          const data = info.row.original; // Asumiendo que `original` contiene el objeto de datos completo
          const priceCurrency = data.currency_used_to_pay; // Asegúrate de que este camino de acceso sea correcto
          const price = info.getValue();
          return <CellsTypos>{convertedPrice(price, priceCurrency!)}</CellsTypos>;
        },
      }),
      columnHelper.accessor((row) => row.create_at, {
        id: 'createdAt',
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.DATE' })}</HeadersTypos>
          </Stack>
        ),
        cell: (info) => {
          return <CellsTypos>{info.getValue()}</CellsTypos>;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('status', {
        header: () => (
          <Stack>
            <HeadersTypos>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS' })}</HeadersTypos>
          </Stack>
        ),
        cell: (info) => {
          return <EllipsisTooltip value={info.getValue()} sx={{ width: '100%' }} />;
        },
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper, formatMessage]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <Stack spacing={2} sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#000000', fontWeight: 600 }} fontSize={48}>
          {formatMessage({ id: 'COMMON.PROFILE.TABLE.TITLE' })}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} color="#000000" orientation="horizontal" />
      <TableContainer component={TableBox}>
        <Table className={classes.table}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          {header.id !== 'expandable' &&
                            (header.column.getIsSorted() === 'asc' ? (
                              <Lottie
                                options={{
                                  loop: false,
                                  autoplay: false,
                                  animationData: arrowUpAnimation,
                                  rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                  },
                                }}
                                height={24}
                                width={24}
                                style={{ marginLeft: '10px' }}
                              />
                            ) : (
                              <Lottie
                                options={{
                                  loop: false,
                                  autoplay: false,
                                  animationData: arrowDownAnimation,
                                  rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                  },
                                }}
                                height={24}
                                width={24}
                                style={{ marginLeft: '10px' }}
                              />
                            ))}
                        </Box>
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
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow sx={{ border: 0 }}>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === 'expandable') {
                      const isExpanded = expandedRows[row.original.order_id!];
                      return (
                        <TableCell key={cell.id}>
                          <Tooltip
                            title={
                              isExpanded
                                ? formatMessage({ id: 'PROFILE.USER.TABLE.COLLAPSE.BUTTON.TOOLTIP' })
                                : formatMessage({ id: 'PROFILE.USER.TABLE.EXPAND.BUTTON.TOOLTIP' })
                            }
                            sx={{ color: theme.palette.common.black }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                width: 40,
                                height: 32,
                                minWidth: 24,
                              }}
                              onClick={() => handleExpandClick(row.original.order_id! as string)}
                            >
                              {isExpanded ? (
                                <KeyboardArrowUpRoundedIcon
                                  sx={{
                                    width: 22,
                                    height: 22,
                                  }}
                                />
                              ) : (
                                <KeyboardArrowDownRoundedIcon
                                  sx={{
                                    width: 22,
                                    height: 22,
                                  }}
                                />
                              )}
                            </Button>
                          </Tooltip>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    );
                  })}
                </TableRow>
                {expandedRows[row.original.order_id!] && (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} key={row.original.order_id}>
                      <ExpandableTableContent row={row.original} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const TableBox = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[6],
  marginLeft: 'auto',
  marginRight: 'auto',
  border: 'none',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  '& table': {
    overflowX: 'hidden',
    '& th': {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.common.black,
      fontWeight: theme.typography.fontWeightBold,
      padding: theme.spacing(2),
      textAlign: 'center',
      // borderRight: `1px solid`,
      border: 0,
      '&:first-of-type': {
        borderTopLeftRadius: theme.spacing(2),
        borderBottomLeftRadius: theme.spacing(2),
      },
      '&:last-child': {
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
      },
    },
    '& tr': {
      '&:nth-of-type(odd)': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
      },
    },
    '& td': {
      padding: theme.spacing(1),
      borderBottom: 0,
      // borderRight: `1px solid`,
      // borderColor: alpha(theme.palette.grey[800], 0.5),
      color: theme.palette.common.black,
      fontSize: 12,
      '&:first-of-type': {
        borderTopLeftRadius: theme.spacing(2),
        borderBottomLeftRadius: theme.spacing(2),
      },
      '&:last-child': {
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        borderRight: 0,
      },
    },
  },
}));

const HeadersTypos = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: 14,
  fontWeight: 500,
  textAlign: 'center',
}));

const CellsTypos = styled(Typography)(() => ({
  fontSize: 12,
  textAlign: 'center',
}));

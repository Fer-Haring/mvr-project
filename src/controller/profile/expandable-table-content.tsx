import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha, styled } from '@mui/material';
import { CompletedOrder } from '@webapp/sdk/users-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface ExpandableTableContentProps {
  row: CompletedOrder;
}

const ExpandableTableContent: FunctionComponent<ExpandableTableContentProps> = ({ row }) => {
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  // const values = Object.values(dollarValue);
  // const firstValue = values[0];

  const convertedPrice = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return price;
    } else if (priceCurrency === 'USD') {
      return `${price} USD = $${(price * dollarValue.value).toFixed(2)} ARS`;
    }
  };

  return (
    <TableContainer component={TableBox}>
      <Table sx={{ minWidth: 65, border: 0 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.PRODUCT.NAME' })}</TableCell>
            <TableCell>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.QUANTITY' })}</TableCell>
            <TableCell>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.UNIT.PRICE' })}</TableCell>
            <TableCell>{formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.SUBTOTAL' })}</TableCell>
          </TableRow>
        </TableHead>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: 20,
          }}
        />
        <TableBody>
          {row.cartItems.map((item) => (
            <React.Fragment key={item.productId}>
              <TableRow>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.unitQuantity}</TableCell>
                <TableCell>{convertedPrice(item.unitPrice, item.priceCurrency)}</TableCell>
                <TableCell>{convertedPrice(item.subTotal, item.priceCurrency)}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpandableTableContent;

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
      textAlign: 'center',
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

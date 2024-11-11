import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, Checkbox, IconButton, Paper, TextField, Typography, alpha, useTheme } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@webapp/components/modal';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

const AdminMobileProductTable: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { productList } = useProductsListData();
  const [productName, setProductName] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [openEditProductModal, setOpenEditProductModal] = useState<boolean>(false);

  const handleOpenEditProductModal = () => {
    setOpenEditProductModal(true);
  };

  const filteredProducts = productList.filter((product) =>
    product?.product_name?.toLowerCase().includes(productName.toLowerCase())
  );

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId) ? prevSelected.filter((id) => id !== productId) : [...prevSelected, productId]
    );
  };

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <Checkbox
            checked={selectedProducts.includes(filteredProducts[index]?.id)}
            onChange={() => handleCheckboxChange(filteredProducts[index]?.id)}
          />
          <ListItemText
            primary={filteredProducts[index]?.product_name}
            sx={{ fontSize: '12px', color: theme.palette.common.black }}
          />
          <IconButton onClick={handleOpenEditProductModal}>
            <EditRoundedIcon sx={{ color: theme.palette.common.black }} />
          </IconButton>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
      <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', color: theme.palette.common.black }}>
        {formatMessage({ id: 'ADMIN.MOBILE.TABLE.PAPER.TITLE' })}
      </Typography>
      <TextField
        label={formatMessage({ id: 'ADMIN.MOBILE.TABLE.PAPER.SEARCH' })}
        value={productName}
        fullWidth
        onChange={(e) => setProductName(e.target.value)}
      />
      <Box sx={{ width: '100%', height: 400 }}>
        <FixedSizeList height={400} width={360} itemSize={46} itemCount={200} overscanCount={5}>
          {renderRow}
        </FixedSizeList>
      </Box>
      <Modal
        open={openEditProductModal}
        onClose={() => setOpenEditProductModal(false)}
        customContent={<div>Hola</div>}
        title={formatMessage({ id: 'ADMIN.MOBILE.TABLE.PAPER.EDIT.MODAL.TITLE' })}
      />
    </Paper>
  );
};

export default AdminMobileProductTable;

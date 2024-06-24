import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@webapp/components/button';
import { useIntl } from 'react-intl';
import { styled } from '@mui/material';
import BulkEditModal from '../modal-components/product-bulk-edit-modal';


const BulkEditButton = () => {
  const { formatMessage } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveModal = (value: string) => {
    // Lógica para guardar el valor editado
    console.log('Saved value:', value);
  };

  const handleOptionClick = (option: string) => {
    handleCloseMenu();
    let title = '';
    switch (option) {
      case 'EDIT_COST_PRICE':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_COST_PRICE' });
        break;
      case 'EDIT_SALE_PRICE':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_SALE_PRICE' });
        break;
      case 'EDIT_ACTUAL_STOCK':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_ACTUAL_STOCK' });
        break;
      case 'EDIT_FEATURED':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_FEATURED' });
        break;
      case 'EDIT_PROMO_PRICE':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PROMO_PRICE' });
        break;
      case 'EDIT_SHOW_IN_CATALOG':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_SHOW_IN_CATALOG' });
        break;
      case 'EDIT_CATEGORY':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_CATEGORY' });
        break;
      case 'EDIT_MAIN_CATEGORY':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_MAIN_CATEGORY' });
        break;
      case 'EDIT_PRICE_CURRENCY':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PRICE_CURRENCY' });
        break;
      case 'EDIT_DESCRIPTION':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_DESCRIPTION' });
        break;
      case 'EDIT_MINIMUM_STOCK':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_MINIMUM_STOCK' });
        break;
      default:
        break;
    }
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        size="small"
        onClick={handleClick}
        sx={{ color: 'white !important' }}
      >
        {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BUTTONS.BULKEDIT' })}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_COST_PRICE')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_COST_PRICE' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_SALE_PRICE')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_SALE_PRICE' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_ACTUAL_STOCK')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_ACTUAL_STOCK' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_FEATURED')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_FEATURED' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_PROMO_PRICE')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PROMO_PRICE' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_SHOW_IN_CATALOG')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_SHOW_IN_CATALOG' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_CATEGORY')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_CATEGORY' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_MAIN_CATEGORY')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_MAIN_CATEGORY' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_PRICE_CURRENCY')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PRICE_CURRENCY' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_DESCRIPTION')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_DESCRIPTION' })}
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_MINIMUM_STOCK')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_MINIMUM_STOCK' })}
        </StyledMenuItem>
      </Menu>
      <BulkEditModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSave={handleSaveModal}
        title={modalTitle}
      />
    </div>
  );
};

export default BulkEditButton;

const StyledMenuItem = styled(MenuItem)(() => ({
  color: 'black',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
}));

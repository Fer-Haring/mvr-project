import { styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@webapp/components/button';
import SnackbarUtils from '@webapp/components/snackbar';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useUpdateProduct } from '@webapp/sdk/mutations/products/update-product-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import React from 'react';
import { useIntl } from 'react-intl';

import BulkEditModal from '../modal-components/product-bulk-edit-modal';

interface BulkEditButtonProps {
  selectedProductIds: string[];
  selectedProducts: Product[];
}

const BulkEditButton: React.FunctionComponent<BulkEditButtonProps> = ({ selectedProductIds, selectedProducts }) => {
  const { formatMessage } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const { mutate: updateProduct } = useUpdateProduct();
  const productListArray = useProductListQuery(1, 500);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveModal = async (value: string) => {
    if (selectedProductIds.length === 0) {
      SnackbarUtils.error('No hay productos seleccionados para actualizar');
      return;
    }

    const productsToUpdate = selectedProducts.map((product) => {
      const productData: Product = {
        product_name: modalTitle.includes('Editar Nombre del Producto') ? value : product.product_name,
        description: modalTitle.includes('Editar Descripción') ? value : product.description,
        main_product_category: modalTitle.includes('Editar Categoría Principal')
          ? value
          : product.main_product_category,
        product_category: modalTitle.includes('Editar Categoría') ? value : product.product_category,
        price_currency: modalTitle.includes('Editar Tipo de Moneda') ? value : product.price_currency,
        cost_price: modalTitle.includes('Editar Precio de Costo') ? Number(value) : product.cost_price,
        sale_price: modalTitle.includes('Editar Precio de Venta') ? value : product.sale_price,
        promo_price: modalTitle.includes('Editar Precio Promocional') ? value : product.promo_price,
        actual_stock: modalTitle.includes('Editar Stock Actual') ? Number(value) : product.actual_stock,
        minimum_stock: modalTitle.includes('Editar Stock Mínimo') ? Number(value) : product.minimum_stock,
        stock_control: modalTitle.includes('Editar Control de Stock') ? value : product.stock_control,
        show_in_catalog: modalTitle.includes('Editar Mostrar en Catálogo') ? value : product.show_in_catalog,
        featured: modalTitle.includes('Editar Destacado') ? value === 'true' : product.featured,
        fraction: product.fraction,
        product_image: product.product_image,
        id: product.id,
        currency_type: product.currency_type,
        product_id: product.product_id,
        product_code: product.product_code,
      };

      return {
        productId: product.id,
        productData,
      };
    });

    productsToUpdate.forEach(({ productId, productData }) => {
      updateProduct(
        { productId, productData },
        {
          onSuccess: () => {
            productListArray.refetch();
            SnackbarUtils.success(`Producto ${productData.product_name} actualizado correctamente`);
          },
          onError: (error) => {
            SnackbarUtils.error(`Error al actualizar el producto ${productData.product_name}: ${error.message}`);
          },
        }
      );
    });

    setModalOpen(false);
  };

  const handleOptionClick = (option: string) => {
    handleCloseMenu();
    let title = '';
    switch (option) {
      case 'EDIT_NAME':
        title = formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PRODUCT_NAME' });
        break;
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
        <StyledMenuItem onClick={() => handleOptionClick('EDIT_NAME')}>
          {formatMessage({ id: 'ADMIN.DASHBOARD.PRODUCTS.TABLE.BULK_EDIT.EDIT_PRODUCT_NAME' })}
        </StyledMenuItem>
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
      <BulkEditModal open={modalOpen} handleClose={handleCloseModal} handleSave={handleSaveModal} title={modalTitle} />
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

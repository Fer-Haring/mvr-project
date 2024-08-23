import { Typography } from '@mui/material';
import { AutocompleteChangeReason, alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import { AutocompleteOption } from '@webapp/components/form/autocomplete';
import Modal from '@webapp/components/modal';
import SnackbarUtils from '@webapp/components/snackbar';
import ProductsInputsContent from '@webapp/controller/admin/add-new-product/product-inputs-content';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddNewProduct } from '@webapp/sdk/mutations/products/add-new-product-mutation';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const AdminAddProductPage = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { product, resetProduct, setProduct } = useSingleProduct();
  const addProduct = useAddNewProduct();
  const { formatMessage } = useIntl();
  const { productList, setProductList } = useProductsListData();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [mainCategory, setMainCategory] = useState<AutocompleteOption | null>(null);
  const [mainCategoryOptions, setMainCategoryOptions] = useState<AutocompleteOption[]>([]);
  const [continueAddingModalOpen, setContinueAddingModalOpen] = useState(false);

  const productListArray = useProductListQuery(1, 500);

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
  }, [productListArray.data?.products, setProductList]);

  const products = Object.values(productList);

  const handleOpenModalContinueAdding = () => {
    setContinueAddingModalOpen(true);
  };

  const handleCloseModalContinueAdding = () => {
    setContinueAddingModalOpen(false);
    resetProduct;
  };

  const handelBackToDashboard = () => {
    resetProduct;
    navigate('/admin-dashboard');
  };

  const handleAddProduct = () => {
    addProduct
      .mutateAsync(product)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.product_name}`);
        handleOpenModalContinueAdding();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto: ${error}`);
      });
  };

  useEffect(() => {
    if (products.length > 0) {
      const categoriesMap = new Map();
      const mainCategoryMap = new Map();
      products.forEach((product) => {
        if (!categoriesMap.has(product.product_category)) {
          categoriesMap.set(product.product_category, {
            value: product.product_category,
            label: product.product_category,
          });
        }
      });
      products.forEach((product) => {
        if (!mainCategoryMap.has(product.main_product_category)) {
          mainCategoryMap.set(product.main_product_category, {
            value: product.main_product_category,
            label: product.main_product_category,
          });
        }
      });
      const uniqueCategories = Array.from(categoriesMap.values());
      setCategoriesOptions(uniqueCategories);
      const uniqueMainCategories = Array.from(mainCategoryMap.values());
      setMainCategoryOptions(uniqueMainCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => {
    if (typeof newValue === 'string') {
      setProduct({ ...product, product_category: newValue });
      setCategory({ value: newValue, label: newValue });
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product, product_category: newValue.value });
      setCategory(newValue);
    } else {
      setCategory(null);
    }
    reason;
  };

  const handleMainCategoryChange = (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => {
    if (typeof newValue === 'string') {
      setProduct({ ...product, main_product_category: newValue });
      setMainCategory({ value: newValue, label: newValue });
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product, main_product_category: newValue.value });
      setMainCategory(newValue);
    } else {
      setMainCategory(null);
    }
    reason;
  };

  const titleMessage = formatMessage({ id: 'ADMIN.CONTINUE.ADDING.PODUCTS' }, { product: product.product_name });

  return (
    <ContentWrapper>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.common.black,
            textAlign: 'center',
            fontSize: '1.5rem',
            paddingBottom: theme.spacing(3),
          }}
        >
          {formatMessage({ id: 'ADMIN.CREATE.NEW.PRODUCT.MOBILE' })}
        </Typography>
        <ProductsInputsContent
          product={product}
          setProduct={setProduct}
          category={category}
          categoriesOptions={categoriesOptions}
          mainCategory={mainCategory}
          mainCategoryOptions={mainCategoryOptions}
          handleCategoryChange={handleCategoryChange}
          handleMainCategoryChange={handleMainCategoryChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 4 }}>
          <Button onClick={resetProduct} variant="contained" color="error">
            {formatMessage({ id: 'ADMIN.RESET.PRODUCT' })}
          </Button>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            {formatMessage({ id: 'ADMIN.ADD.PRODUCT' })}
          </Button>
        </Box>
      </Paper>
      {continueAddingModalOpen && product.product_name && (
        <Modal
          open={continueAddingModalOpen}
          onClose={handleCloseModalContinueAdding}
          title={titleMessage}
          // text={formatMessage({ id: 'ADMIN.CONTINUE.ADDING.PODUCTS.TEXT' })}
          primaryButtonText={formatMessage({ id: 'ADMIN.CONTINUE.ADDING' })}
          primaryButtonColor="primary"
          primaryButtonOnClick={handleCloseModalContinueAdding}
          secondaryButtonText={formatMessage({ id: 'ADMIN.CANCEL.ADDING' })}
          secondaryButtonColor="error"
          secondaryButtonOnClick={handelBackToDashboard}
        />
      )}
    </ContentWrapper>
  );
};

export default AdminAddProductPage;

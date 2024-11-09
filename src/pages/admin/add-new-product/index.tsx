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
import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { RootState } from '@webapp/redux/store/reducer';
import { resetProduct, setProduct, setProducts } from '@webapp/redux/store/slices/productsSlice';
import { useAddNewProduct } from '@webapp/services/mutations/products/add-new-product-mutation';
import { useProductListQuery } from '@webapp/services/mutations/products/get-product-list-query';
import { Product } from '@webapp/services/types/products-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const AdminAddProductPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { product } = useAppSelector((state: RootState) => state.products);
  const addProduct = useAddNewProduct();
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [mainCategory, setMainCategory] = useState<AutocompleteOption | null>(null);
  const [mainCategoryOptions, setMainCategoryOptions] = useState<AutocompleteOption[]>([]);
  const [continueAddingModalOpen, setContinueAddingModalOpen] = useState(false);

  const productListArray = useProductListQuery(1, 500);

  useEffect(() => {
    dispatch(setProducts(productListArray.data?.products || []));
  }, [productListArray.data?.products, dispatch]);

  const products = Object.values(productListArray.data?.products || {});

  const handleOpenModalContinueAdding = () => {
    setContinueAddingModalOpen(true);
  };

  const handleCloseModalContinueAdding = () => {
    setContinueAddingModalOpen(false);
    resetProduct();
  };

  const handelBackToDashboard = () => {
    resetProduct();
    navigate('/admin-dashboard');
  };

  const handleAddProduct = () => {
    addProduct
      .mutateAsync(product!)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product!.product_name}`);
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
      products.forEach((product: Product) => {
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
  }, []);

  const handleCategoryChange = (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null
  ) => {
    if (typeof newValue === 'string') {
      setProduct({ ...product!, product_category: newValue });
      setCategory({ value: newValue, label: newValue });
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product!, product_category: newValue.value });
      setCategory(newValue);
    } else {
      setCategory(null);
    }
  };

  const handleMainCategoryChange = (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => {
    if (typeof newValue === 'string') {
      setProduct({ ...product!, main_product_category: newValue });
      setMainCategory({ value: newValue, label: newValue });
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product!, main_product_category: newValue.value });
      setMainCategory(newValue);
    } else {
      setMainCategory(null);
    }
    reason;
  };

  const titleMessage = formatMessage({ id: 'ADMIN.CONTINUE.ADDING.PODUCTS' }, { product: product?.product_name });

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
          product={product!}
          setProduct={setProduct}
          category={category}
          categoriesOptions={categoriesOptions}
          mainCategory={mainCategory}
          mainCategoryOptions={mainCategoryOptions}
          handleCategoryChange={handleCategoryChange}
          handleMainCategoryChange={handleMainCategoryChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 4 }}>
          <Button onClick={() => resetProduct()} variant="contained" color="error">
            {formatMessage({ id: 'ADMIN.RESET.PRODUCT' })}
          </Button>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            {formatMessage({ id: 'ADMIN.ADD.PRODUCT' })}
          </Button>
        </Box>
      </Paper>
      {continueAddingModalOpen && product?.product_name && (
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

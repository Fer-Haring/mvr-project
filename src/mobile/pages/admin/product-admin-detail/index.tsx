import { Popper } from '@mui/base/Popper';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { AutocompleteChangeReason, Typography, alpha, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SnackbarUtils from '@webapp/components/snackbar';
import Button from '@webapp/mobile/components/button';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import Autocomplete, { AutocompleteOption } from '@webapp/mobile/components/form/autocomplete';
import InputField from '@webapp/mobile/components/form/input';
import Select from '@webapp/mobile/components/form/select';
import CustomInput from '@webapp/mobile/controller/admin/cutom-input';
import ProductImageHolder from '@webapp/mobile/controller/product-detail/product-image-holder';
import { addNewProduct, getProductById } from '@webapp/sdk/firebase/products';
import { updateProduct } from '@webapp/sdk/firebase/products/update-products';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

const MobileProductAdminDetail = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { setProduct, product, resetProduct } = useSingleProduct();
  const { productList } = useProductsListData();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [inputValue, setInputValue] = useState('');
  const products = Object.values(productList);
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      getProductById(param.id!);
    } else {
      setCategory(null);
      setProduct({
        productId: '',
        productName: '',
        description: '',
        costPrice: 0,
        salePrice: '',
        priceCurrency: '',
        productCategory: '',
        actualStock: '',
        minimumStock: 0,
        showInCatalog: '',
        stockControl: '',
        destacated: '',
        fraction: 0,
        promoPrice: 0,
        productImage: '',
        productCode: '',
        mainProductCategory: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    if (products.length > 0) {
      const categoriesMap = new Map();
      products.forEach((product) => {
        if (!categoriesMap.has(product.productCategory)) {
          categoriesMap.set(product.productCategory, {
            value: product.productCategory,
            label: product.productCategory,
          });
        }
      });
      const uniqueCategories = Array.from(categoriesMap.values());
      setCategoriesOptions(uniqueCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => {
    if (typeof newValue === 'string') {
      setProduct({ ...product, productCategory: newValue });
      setCategory({ value: newValue, label: newValue });
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product, productCategory: newValue.value });
      setCategory(newValue);
    } else {
      setCategory(null);
    }
    reason;
  };

  const handleUpdateProduct = () => {
    if (!product.productId || !product.productName) {
      return;
    }

    updateProduct(product.productId, {
      ...product,
      productCategory: category ? category.value : product.productCategory,
    })
      .then(() => {
        SnackbarUtils.success('Product updated successfully.');
      })
      .catch((error) => {
        SnackbarUtils.error('Failed to update product: ' + error);
      });
  };

  const handleAddProduct = () => {
    addNewProduct(product)
      .then(() => {
        SnackbarUtils.success(`Producto añadido con éxito, ID: ${product.productName}`);
        resetProduct();
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al añadir producto:: ${error}`);
      });
  };

  return (
    <ContentWrapper>
      {param.id ? (
        <ProductImageHolder product={product} id={product.productId} />
      ) : (
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.grey[200], p: 4 }}>
          {formatMessage({ id: 'ADMIN.CREATE.NEW.PRODUCT.MOBILE' })}
        </Typography>
      )}
      <Stack gap={3} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 2 }}>
          <CustomInput
            name="productName"
            label="PRODUCTNAME"
            product={product.productName}
            type="text"
            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
            autoComplete="productName"
          />
          <CustomInput
            name="description"
            label="DESCRIPTION"
            product={product.description}
            type="text"
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            autoComplete="description"
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomInput
            name="costPrice"
            label="COSTPRICE"
            product={product.costPrice}
            onChange={(e) => setProduct({ ...product, costPrice: Number(e.target.value) })}
            type="number"
            autoComplete="number"
          />
          <CustomInput
            name="salePrice"
            label="SALEPRICE"
            product={product.salePrice}
            onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
            type="number"
            autoComplete="number"
          />
          <CustomSelect
            labelId="product-currency-select-label"
            id="currency-select"
            value={product.priceCurrency}
            label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRICECURRENCY' })}
            onChange={(e) => setProduct({ ...product, priceCurrency: e.target.value as string })}
            variant="outlined"
            options={[
              { value: 'USD', label: 'USD' },
              { value: 'ARS', label: 'ARS' },
            ]}
            displayEmpty
            sx={{ width: '100%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomAutoComplete
            size="small"
            id="organization-autocomplete"
            value={category === null ? product.productCategory : category}
            label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRODUCTCATEGORY' })}
            options={categoriesOptions}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            renderInput={(params) => (
              <InputField
                {...params}
                size="small"
                label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRODUCTCATEGORY' })}
                placeholder={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRODUCTCATEGORY' })}
                noDefaultHelperText
                defaultValue={product.productCategory}
              />
            )}
            freeSolo
            onChange={handleCategoryChange}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onBlur={() => {
              if (inputValue) {
                setProduct({ ...product, productCategory: inputValue });
              }
            }}
            PopperComponent={({ ...props }) => <CustomPopper {...props} />}
            noOptionsText={formatMessage({ id: 'FORM.NO.OPTION' })}
            forcePopupIcon
            popupIcon={<KeyboardArrowDownRounded sx={{ color: alpha(theme.palette.text.primary, 0.5) }} />}
            filterOptions={(options, state) =>
              options.filter((opt) => opt.label.toLowerCase().includes(state.inputValue.toLowerCase()))
            }
            role="combobox"
            aria-label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRODUCTCATEGORY' })}
            aria-haspopup="listbox"
          />
          <CustomInput
            name="actualStock"
            label="ACTUALSTOCK"
            product={product.actualStock}
            type="number"
            onChange={(e) => setProduct({ ...product, actualStock: e.target.value })}
            autoComplete="actualStock"
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomInput
            name="minimumStock"
            label="MINIMUMSTOCK"
            product={product.minimumStock}
            type="number"
            onChange={(e) => setProduct({ ...product, minimumStock: Number(e.target.value) })}
            autoComplete="minimumStock"
          />
          <CustomInput
            name="showInCatalog"
            label="SHOWINCATALOG"
            product={product.showInCatalog}
            type="text"
            onChange={(e) => setProduct({ ...product, showInCatalog: e.target.value })}
            autoComplete="showInCatalog"
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomInput
            name="stockControl"
            label="STOCKCONTROL"
            product={product.stockControl}
            type="text"
            onChange={(e) => setProduct({ ...product, stockControl: e.target.value })}
            autoComplete="stockControl"
          />
          <CustomInput
            name="destacated"
            label="DESTACATED"
            product={product.destacated}
            type="text"
            onChange={(e) => setProduct({ ...product, destacated: e.target.value })}
            autoComplete="destacated"
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomInput
            name="fraction"
            label="FRACTION"
            product={product.fraction}
            type="text"
            onChange={(e) => setProduct({ ...product, fraction: Number(e.target.value) })}
            autoComplete="fraction"
          />
          <CustomInput
            name="promoPrice"
            label="PROMOPRICE"
            product={product.promoPrice}
            type="text"
            onChange={(e) => setProduct({ ...product, promoPrice: Number(e.target.value) })}
            autoComplete="promoPrice"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            borderRadius: theme.spacing(0.5),
            paddingBlock: theme.spacing(2),
            fontSize: 16,
            fontWeight: 'bold',
            mt: 5,
          }}
          onClick={() => {
            if (param.id) {
              handleUpdateProduct();
            } else {
              handleAddProduct();
            }
          }}
        >
          {formatMessage({ id: 'ADD.NEWPRODUCT.BUTTON.SAVE.MOBILE' })}
        </Button>
      </Stack>
    </ContentWrapper>
  );
};

export default MobileProductAdminDetail;

export const CustomInputField = styled(InputField)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
    '& .MuiOutlinedInput-input': {
      height: theme.spacing(5),
      paddingBlock: 0,
      borderRadius: theme.spacing(0.5),
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
  },
  '& .MuiSelect-input': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiSelect-select': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
}));

const CustomAutoComplete = styled(Autocomplete)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  width: '100%',
  border: 'none',
  '& label': {
    fontSize: 16,
    color: '#ffffffe7 !important',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
  },
  '& .MuiSelect-input': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiSelect-select': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiAutocomplete-inputRoot': {
    height: theme.spacing(5),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
}));

const CustomPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-listbox': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[500],
    boxShadow: theme.shadows[4],
    color: theme.palette.text.primary,
  },
}));

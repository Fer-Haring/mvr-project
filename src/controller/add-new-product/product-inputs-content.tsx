import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { AutocompleteChangeReason, Popper, alpha, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Autocomplete, { AutocompleteOption } from '@webapp/components/form/autocomplete';
import InputField from '@webapp/components/form/input';
import Select from '@webapp/components/form/select';
import CustomInput from '@webapp/controller/admin/modal-components/cutom-input';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { Product } from '@webapp/sdk/types/products-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';


interface ProductsInputsContentProps {
  className?: string;
  product: Product;
  setProduct: (product: Product) => void;
  category: AutocompleteOption | null;
  categoriesOptions: AutocompleteOption[];
  mainCategory: AutocompleteOption | null;
  mainCategoryOptions: AutocompleteOption[];
  handleCategoryChange: (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => void;
  handleMainCategoryChange: (
    event: React.SyntheticEvent | React.FocusEventHandler<HTMLDivElement>,
    newValue: string | AutocompleteOption | (string | AutocompleteOption)[] | null,
    reason: AutocompleteChangeReason
  ) => void;
}

const ProductsInputsContent: React.FC<ProductsInputsContentProps> = ({
  product,
  setProduct,
  category,
  categoriesOptions,
  mainCategory,
  mainCategoryOptions,
  handleCategoryChange,
  handleMainCategoryChange,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [inputValue, setInputValue] = useState('');

  return (
    <Stack gap={4} sx={{ width: '100%', pt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <CustomInput
          name="product_name"
          label="PRODUCTNAME"
          product={product.product_name}
          type="text"
          onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
          autoComplete="product_name"
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <CustomInput
          name="costPrice"
          label="COSTPRICE"
          product={product.cost_price}
          onChange={(e) => setProduct({ ...product, cost_price: Number(e.target.value) })}
          type="number"
          autoComplete="number"
        />
        <CustomInput
          name="salePrice"
          label="SALEPRICE"
          product={product.sale_price}
          onChange={(e) => setProduct({ ...product, sale_price: e.target.value })}
          type="number"
          autoComplete="number"
        />
        <CustomSelect
          labelId="product-currency-select-label"
          id="PRICECURRENCY"
          label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.PRICECURRENCY' })}
          value={product.price_currency}
          onChange={(e) => setProduct({ ...product, price_currency: e.target.value as string })}
          variant="outlined"
          options={[
            { value: 'USD', label: 'USD' },
            { value: 'ARS', label: 'ARS' },
          ]}
          displayEmpty
          sx={{ width: '100%' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
        }}
      >
        <CustomAutoComplete
          size="small"
          id="category-autocomplete"
          value={category === null ? product.product_category : category}
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
              defaultValue={product.product_category}
            />
          )}
          freeSolo
          onChange={handleCategoryChange}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onBlur={() => {
            if (inputValue) {
              setProduct({ ...product, product_category: inputValue });
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
        <CustomAutoComplete
          size="small"
          id="main-category-autocomplete"
          value={mainCategory === null ? product.main_product_category : mainCategory}
          label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.MAINPRODUCTCATEGORY' })}
          options={mainCategoryOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          renderInput={(params) => (
            <InputField
              {...params}
              size="small"
              label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.MAINPRODUCTCATEGORY' })}
              placeholder={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.MAINPRODUCTCATEGORY' })}
              noDefaultHelperText
              defaultValue={product.main_product_category}
            />
          )}
          onChange={handleMainCategoryChange}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onBlur={() => {
            if (inputValue) {
              setProduct({ ...product, main_product_category: inputValue });
            }
          }}
          PopperComponent={({ ...props }) => <CustomPopper {...props} />}
          noOptionsText={formatMessage({ id: 'FORM.NO.OPTION' })}
          forcePopupIcon
          popupIcon={<KeyboardArrowDownRounded sx={{ color: alpha(theme.palette.text.primary, 0.5) }} />}
          filterOptions={(options, state) =>
            options.filter((opt) => opt.label.toLowerCase().includes(state.inputValue.toLowerCase()))
          }
          // role="combobox"
          aria-label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.MAINPRODUCTCATEGORY' })}
          aria-haspopup="listbox"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <CustomInput
          name="minimumStock"
          label="MINIMUMSTOCK"
          product={product.minimum_stock}
          type="number"
          onChange={(e) => setProduct({ ...product, minimum_stock: Number(e.target.value) })}
          autoComplete="minimumStock"
        />
        <CustomInput
          name="actualStock"
          label="ACTUALSTOCK"
          product={product.actual_stock}
          type="text"
          onChange={(e) => setProduct({ ...product, actual_stock: Number(e.target.value) })}
          autoComplete="product_name"
        />
        <CustomInput
          name="showInCatalog"
          label="SHOWINCATALOG"
          product={product.show_in_catalog}
          type="text"
          onChange={(e) => setProduct({ ...product, show_in_catalog: e.target.value })}
          autoComplete="showInCatalog"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <CustomInput
          name="stockControl"
          label="STOCKCONTROL"
          product={product.stock_control}
          type="text"
          onChange={(e) => setProduct({ ...product, stock_control: e.target.value })}
          autoComplete="stockControl"
        />
        <CustomInput
          name="featured"
          label="FEATURED"
          product={product.featured}
          type="text"
          onChange={(e) => setProduct({ ...product, featured: Boolean(e.target.value) })}
          autoComplete="featured"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: 4,
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <CustomInput
          name="fraction"
          label="FRACTION"
          product={product.fraction}
          type="text"
          onChange={(e) => setProduct({ ...product, fraction: e.target.value })}
          autoComplete="fraction"
        />
        <CustomInput
          name="promoPrice"
          label="PROMOPRICE"
          product={product.promo_price}
          type="text"
          onChange={(e) => setProduct({ ...product, promo_price: e.target.value })}
          autoComplete="promoPrice"
        />
      </Box>
    </Stack>
  );
};

export default ProductsInputsContent;

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.common.black,
    lineHeight: '1.5',
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
  '& .MuiOutlinedInput-root': {
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
    color: theme.palette.common.black,
    lineHeight: 'normal',
  },
  '& .MuiOutlinedInput-input': {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    border: 'none',
    backgroundColor: 'transparent',
    lineHeight: '1.5',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
  },
  '& .MuiAutocomplete-inputRoot': {
    height: theme.spacing(5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    border: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.common.black, // Mantener el color blanco cuando está enfocado
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
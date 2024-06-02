/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  AutocompleteChangeReason,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Modal,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Button from '@webapp/components/button';
import Autocomplete, { AutocompleteOption } from '@webapp/components/form/autocomplete';
import InputField from '@webapp/components/form/input';
import Select from '@webapp/components/form/select';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import CustomBulkEditInput from './custom-bulk-edit-input';

interface Product {
  productName: string;
  description: string;
  costPrice: number;
  salePrice: number;
  priceCurrency: string;
  productCategory: string;
  actualStock: number;
  minimumStock: number;
  showInCatalog: boolean;
  stockControl: string;
  destacated: string;
  fraction: number;
  promoPrice: number;
}

interface BulkEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: Product) => void;
  categoryOptions: AutocompleteOption[];
}

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .modal-content': {
    backgroundColor: alpha(theme.palette.grey[300], 0.9),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    width: 'min(75vw, 720px)',
    boxShadow: theme.shadows[5],
  },
}));

const BulkEditModal: React.FC<BulkEditModalProps> = ({ open, onClose, onSave, categoryOptions }) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const theme = useTheme();
  const [formValues, setFormValues] = useState<Product>({
    productName: '',
    description: '',
    costPrice: 0,
    salePrice: 0,
    priceCurrency: '',
    productCategory: '',
    actualStock: 0,
    minimumStock: 0,
    showInCatalog: false,
    stockControl: '',
    destacated: '',
    fraction: 0,
    promoPrice: 0,
  });

  const { setProduct, product } = useSingleProduct();
  const { productList } = useProductsListData();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const products = Object.values(productList);

  useEffect(() => {
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

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type } = event.target;
  //   const val = type === 'number' ? Number(value) : type === 'checkbox' ? event.target.checked : value;
  //   setFormValues((prev) => ({ ...prev, [name]: val }));
  // };

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   onSave(formValues);
  //   onClose();
  // };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="bulk-edit-modal-title"
      aria-describedby="bulk-edit-modal-description"
    >
      <Box className="modal-content">
        <Stack gap={2} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 2 }}>
            <CustomBulkEditInput
              name="productName"
              label="PRODUCTNAME"
              value={product.productName}
              type="text"
              onChange={(e) => setProduct({ ...product, productName: e.target.value })}
              autoComplete="productName"
            />
            <CustomBulkEditInput
              name="description"
              label="DESCRIPTION"
              value={product.description}
              type="text"
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              autoComplete="description"
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
            <CustomBulkEditInput
              name="costPrice"
              label="COSTPRICE"
              value={product.costPrice}
              onChange={(e) => setProduct({ ...product, costPrice: Number(e.target.value) })}
              type="number"
              autoComplete="number"
            />
            <CustomBulkEditInput
              name="salePrice"
              label="SALEPRICE"
              value={product.salePrice}
              onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
              type="number"
              autoComplete="number"
            />
            <CustomSelect
              labelId="product-currency-select-label"
              id="currency-select"
              value={product.priceCurrency}
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
                // Aquí puedes llamar a `setProduct` o cualquier función que necesites para guardar el valor.
                // Utiliza `inputValue` ya que este estado contiene el valor actual del input.
                if (inputValue) {
                  setProduct({ ...product, productCategory: inputValue });
                  // Si necesitas resetear `inputValue` después de guardar, puedes hacerlo aquí.
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
            <CustomBulkEditInput
              name="actualStock"
              label="ACTUALSTOCK"
              value={product.actualStock}
              type="number"
              onChange={(e) => setProduct({ ...product, actualStock: e.target.value })}
              autoComplete="actualStock"
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
            <CustomBulkEditInput
              name="minimumStock"
              label="MINIMUMSTOCK"
              value={product.minimumStock}
              type="number"
              onChange={(e) => setProduct({ ...product, minimumStock: Number(e.target.value) })}
              autoComplete="minimumStock"
            />
            <CustomBulkEditInput
              name="showInCatalog"
              label="SHOWINCATALOG"
              value={product.showInCatalog}
              type="text"
              onChange={(e) => setProduct({ ...product, showInCatalog: e.target.value })}
              autoComplete="showInCatalog"
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
            <CustomBulkEditInput
              name="stockControl"
              label="STOCKCONTROL"
              value={product.stockControl}
              type="text"
              onChange={(e) => setProduct({ ...product, stockControl: e.target.value })}
              autoComplete="stockControl"
            />
            <CustomBulkEditInput
              name="destacated"
              label="DESTACATED"
              value={product.destacated}
              type="text"
              onChange={(e) => setProduct({ ...product, destacated: e.target.value })}
              autoComplete="destacated"
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
            <CustomBulkEditInput
              name="fraction"
              label="FRACTION"
              value={product.fraction}
              type="text"
              onChange={(e) => setProduct({ ...product, fraction: Number(e.target.value) })}
              autoComplete="fraction"
            />
            <CustomBulkEditInput
              name="promoPrice"
              label="PROMOPRICE"
              value={product.promoPrice}
              type="text"
              onChange={(e) => setProduct({ ...product, promoPrice: Number(e.target.value) })}
              autoComplete="promoPrice"
            />
          </Box>
        </Stack>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button size="small" onClick={onClose} variant="text" hasBorder color="primary">
            {formatMessage({ id: 'COMMON.CANCEL' })}
          </Button>
          <Button size="small" onClick={() => {}} variant="contained" color="primary">
            {formatMessage({ id: 'COMMON.SAVE' })}
          </Button>
        </Stack>
      </Box>
    </StyledModal>
  );
};

export default BulkEditModal;

export const CustomBulkEditInputField = styled(InputField)(({ theme }) => ({
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

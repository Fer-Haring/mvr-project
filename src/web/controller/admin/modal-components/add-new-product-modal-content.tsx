import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { AutocompleteChangeReason, Popper, alpha, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import Autocomplete, { AutocompleteOption } from '@webapp/web/components/form/autocomplete';
import InputField from '@webapp/web/components/form/input';
import Select from '@webapp/web/components/form/select';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import CustomInput from './cutom-input';

interface AddProductContentProps {
  className?: string;
}

const AddProductContent: FunctionComponent<AddProductContentProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { setProduct, product } = useSingleProduct();
  const { productList } = useProductsListData();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [inputValue, setInputValue] = useState('');
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
    // Caso para manejo de entrada libre (freeSolo)
    if (typeof newValue === 'string') {
      setProduct({ ...product, productCategory: newValue });
      setCategory({ value: newValue, label: newValue }); // Asume que tienes una forma de crear un AutocompleteOption a partir de una cadena
    }
    // Caso para cuando se selecciona una opción de las existentes
    else if (newValue && !Array.isArray(newValue)) {
      // Verifica que newValue no sea un arreglo
      setProduct({ ...product, productCategory: newValue.value });
      setCategory(newValue);
    }
    // Opcional: Agrega manejo para múltiples selecciones si es necesario
    else {
      setCategory(null); // O maneja el caso de null o arreglo según necesites
    }
    reason; // Evita advertencias de variable no utilizada
  };

  return (
    <Box className={className || ''}>
      <Stack gap={2} sx={{ width: '100%' }}>
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
      </Stack>
    </Box>
  );
};

export default AddProductContent;

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

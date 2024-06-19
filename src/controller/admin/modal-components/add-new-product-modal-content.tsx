import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { AutocompleteChangeReason, Popper, alpha, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Autocomplete, { AutocompleteOption } from '@webapp/components/form/autocomplete';
import InputField from '@webapp/components/form/input';
import Select from '@webapp/components/form/select';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
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
        if (!categoriesMap.has(product.product_category)) {
          categoriesMap.set(product.product_category, {
            value: product.product_category,
            label: product.product_category,
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
      setProduct({ ...product, product_category: newValue });
      setCategory({ value: newValue, label: newValue }); // Asume que tienes una forma de crear un AutocompleteOption a partir de una cadena
    }
    // Caso para cuando se selecciona una opción de las existentes
    else if (newValue && !Array.isArray(newValue)) {
      // Verifica que newValue no sea un arreglo
      setProduct({ ...product, product_category: newValue.value });
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
            name="product_name"
            label="product_name"
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
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
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
            id="currency-select"
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
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomAutoComplete
            size="small"
            id="organization-autocomplete"
            value={category === null ? product.product_category : category}
            options={categoriesOptions}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            renderInput={(params) => (
              <InputField
                {...params}
                size="small"
                label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.product_category' })}
                placeholder={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.product_category' })}
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
              // Aquí puedes llamar a `setProduct` o cualquier función que necesites para guardar el valor.
              // Utiliza `inputValue` ya que este estado contiene el valor actual del input.
              if (inputValue) {
                setProduct({ ...product, product_category: inputValue });
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
            aria-label={formatMessage({ id: 'ADD.NEWPRODUCT.LABEL.product_category' })}
            aria-haspopup="listbox"
          />
          <CustomInput
            name="actualStock"
            label="ACTUALSTOCK"
            product={product.actual_stock}
            type="number"
            onChange={(e) => setProduct({ ...product, actual_stock: Number(e.target.value) })}
            autoComplete="actualStock"
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
          <CustomInput
            name="minimumStock"
            label="MINIMUMSTOCK"
            product={product.minimum_stock}
            type="number"
            onChange={(e) => setProduct({ ...product, minimum_stock: Number(e.target.value) })}
            autoComplete="minimumStock"
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
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
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
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 1 }}>
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

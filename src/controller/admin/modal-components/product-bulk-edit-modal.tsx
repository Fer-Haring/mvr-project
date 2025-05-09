/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { default as MuiModal, ModalProps as MuiModalProps } from '@mui/material/Modal';
import {
  AutocompleteChangeReason,
  Box,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Button from '@webapp/components/button';
import Autocomplete, { AutocompleteOption } from '@webapp/components/form/autocomplete';
import InputField from '@webapp/components/form/input';
import Select from '@webapp/components/form/select';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, {useEffect, useState } from 'react';
import { useIntl } from 'react-intl';


interface BulkEditModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (value: string) => void;
  title: string;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const BulkEditModal: React.FC<BulkEditModalProps> = ({ open, handleClose, handleSave, title }) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const theme = useTheme();

  const { setProduct, product } = useSingleProduct();
  const { productList } = useProductsListData();
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const products = Object.values(productList);
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    handleSave(inputValue);
    handleClose();
  };

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
    if (typeof newValue === 'string') {
      setProduct({ ...product, product_category: newValue });
      setCategory({ value: newValue, label: newValue });
      setInputValue(newValue); // Actualizamos el inputValue
    } else if (newValue && !Array.isArray(newValue)) {
      setProduct({ ...product, product_category: newValue.value });
      setCategory(newValue);
      setInputValue(newValue.value); // Actualizamos el inputValue
    } else {
      setCategory(null);
    }
    reason;
  };

  return (
    <StyledMuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="bulk-edit-modal-title"
      aria-describedby="bulk-edit-modal-description"
    >
      {title !== 'Editar Categoría' ? (
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label={title}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={onSave} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      ) : (
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
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
              setInputValue(newInputValue); // Guardamos el valor en inputValue
            }}
            PopperComponent={({ ...props }) => <CustomPopper {...props} />}
            noOptionsText={formatMessage({ id: 'FORM.NO.OPTION' })}
          />
          <Button onClick={onSave} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      )}
    </StyledMuiModal>
  );
};

export default BulkEditModal;

const StyledMuiModal = styled(MuiModal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .modal-wrapper': {
    backgroundColor: alpha(theme.palette.grey[300], 0.9),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    width: 'min(75vw, 720px)',
  },
}));

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

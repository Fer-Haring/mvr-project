/* eslint-disable @typescript-eslint/no-explicit-any */
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Popper,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import { AutocompleteOption } from '@webapp/components/form/autocomplete';
import InputField from '@webapp/components/form/input';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { CustomAutoComplete, CustomSelect, FiltersHolder, Slider } from '@webapp/pages/products/products';
import { useSelectedProductFilterStore } from '@webapp/store/products/selected-product-filter';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

interface FilterOptionsState {
  inputValue: string;
}

interface ProductFilterPanelProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sortCriteria: string;
  setSortCriteria: (criteria: string) => void;
  category: AutocompleteOption | null;
  setCategory: (category: AutocompleteOption | null) => void;
  searchTerms: string;
  setSearchTerms: (terms: string) => void;
  categoriesOptions: AutocompleteOption[];
  handleCategoryChange: (e: any, newValue: AutocompleteOption) => void;
  handleSortCriteriaChange: (e: SelectChangeEvent<string>) => void;
  handlePriceRangeChange: (e: Event, newValue: number | number[]) => void;
}

const ProductFilterPanel: React.FunctionComponent<ProductFilterPanelProps> = ({
  searchTerms,
  setSearchTerms,
  category,
  setCategory,
  categoriesOptions,
  handleCategoryChange,
  sortCriteria,
  handleSortCriteriaChange,
  priceRange,
  handlePriceRangeChange,
}) => {
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const theme = useTheme();
  const { selectedProductFilter, setSelectedProductFilter } = useSelectedProductFilterStore();

  useEffect(() => {
    if (category) {
      setSelectedProductFilter(category.label);
    }
  }, [category, setSelectedProductFilter]);

  useEffect(() => {
    if (selectedProductFilter) {
      const selectedCategory = categoriesOptions.find((option) => option.label === selectedProductFilter);
      if (selectedCategory) {
        setCategory(selectedCategory);
      }
    }
  }, [selectedProductFilter, categoriesOptions, setCategory]);

  return (
    <FiltersHolder isMobile={isMobile}>
      <FormControl fullWidth>
        <CustomInputSearch
          size="small"
          value={searchTerms}
          label={formatMessage({ id: 'PRODUCTS.SEARCH' })}
          placeholder={formatMessage({ id: 'PRODUCTS.SEARCH' })}
          onChange={(e) => setSearchTerms(e.target.value)}
          defaultValue={searchTerms}
        />
      </FormControl>
      <FormControl fullWidth>
        <CustomAutoComplete
          size="small"
          id="category-autocomplete"
          value={category}
          options={categoriesOptions}
          renderInput={(params) => (
            <InputField
              {...params}
              size="small"
              label={formatMessage({ id: 'PRODUCTS.FILTER' })}
              placeholder={formatMessage({ id: 'PRODUCTS.FILTER' })}
              noDefaultHelperText
              defaultValue={category}
            />
          )}
          freeSolo
          onChange={(e, newValue) => {
            handleCategoryChange(e, newValue as AutocompleteOption);
            setSelectedProductFilter((newValue as AutocompleteOption).label);
          }}
          PopperComponent={({ ...props }) => <CustomPopper {...props} />}
          noOptionsText={formatMessage({ id: 'FORM.NO.OPTION' })}
          forcePopupIcon
          popupIcon={<KeyboardArrowDownRounded sx={{ color: alpha(theme.palette.text.primary, 0.5) }} />}
          filterOptions={(options: any[], state: FilterOptionsState) =>
            options.filter((opt) => opt.label?.toLowerCase().includes(state.inputValue?.toLowerCase()))
          }
          role="combobox"
          aria-label={formatMessage({ id: 'PRODUCTS.FILTER' })}
          aria-haspopup="listbox"
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="sort-criteria-select">{formatMessage({ id: 'PRODUCTS.ORDER.BY' })}</InputLabel>
        <CustomSelect
          labelId="sort-criteria-select"
          id="sort-criteria-select"
          value={sortCriteria}
          label="Ordenar Por"
          onChange={(e) => handleSortCriteriaChange(e as SelectChangeEvent<string>)}
          displayEmpty
        >
          <MenuItem
            sx={{
              color: theme.palette.grey[900],
            }}
            value="all"
          >
            {formatMessage({ id: 'PRODUCT.ORDER.BY.DEFAULT' })}
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.grey[900],
            }}
            value="minorPrice"
          >
            {formatMessage({ id: 'PRODUCT.ORDER.BY.ASC' })}
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.grey[900],
            }}
            value="mayorPrice"
          >
            {formatMessage({ id: 'PRODUCT.ORDER.BY.DESC' })}
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.grey[900],
            }}
            value="name"
          >
            {formatMessage({ id: 'PRODUCT.ORDER.BY.NAME' })}
          </MenuItem>
        </CustomSelect>
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          padding: theme.spacing(2),
        }}
      >
        <Stack direction={'row'} gap={2}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '16px',
              color: theme.palette.common.black,
              textAlign: 'center',
              fontWeigth: 'bold',
            }}
          >
            {formatMessage({ id: 'PRODUCTS.ADJUST.PRICE.RANGE' })}{' '}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              color: theme.palette.common.black,
              textAlign: 'end',
            }}
          >
            {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
          </Typography>
        </Stack>
        <Stack direction={'column'} gap={2} width={'95%'}>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            aria-labelledby="range-slider"
            min={0}
            max={20000}
            step={100}
            sx={{
              padding: theme.spacing(2),
              '& .MuiSlider-rail': {
                backgroundColor: theme.palette.grey[300],
                width: '95%',
              },
            }}
          />
        </Stack>
      </Box>
    </FiltersHolder>
  );
};

export default ProductFilterPanel;

const CustomPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-listbox': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[4],
    color: theme.palette.grey[800],
  },
}));

const CustomInputSearch = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(5),
    width: 'auto',
    backgroundColor: theme.palette.grey[200],
    '&:focus-within': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[800],
    },
    padding: theme.spacing(0.5, 1),
  },
  '& label.MuiInputLabel-root': {
    fontSize: 16,
    color: theme.palette.grey[800],
    textAlign: 'left',
    transform: 'translate(14px, 10px) scale(1)',
    '&.Mui-focused': {
      transform: 'translate(14px, 2px) scale(0.75)',
    },
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -10px) scale(0.75)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
    color: theme.palette.grey[800],
    userSelect: 'text',
  },
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 12px) scale(1)',
  },
}));

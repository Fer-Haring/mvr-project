import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { InputLabel, SelectChangeEvent, Typography, alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import InputField from '@webapp/mobile/components/form/input';
import Menu from '@webapp/mobile/components/menu';
import { CustomAutoComplete, CustomInputSearch, CustomSelect, Slider } from '@webapp/mobile/pages/products/products';
import * as React from 'react';
import { useIntl } from 'react-intl';

interface AutocompleteOption {
  label: string;
  value: string;
}

interface FilterOptionsState {
  inputValue: string;
  // cualquier otra propiedad que el estado pueda tener
}

interface FiltersMenuProps {
  searchTerms: string;
  category: AutocompleteOption | null;
  categoriesOptions: AutocompleteOption[];
  sortCriteria: string;
  priceRange: number[];
  setSearchTerms: (value: string) => void;
  handleCategoryChange: (event: React.SyntheticEvent, newValue: AutocompleteOption | null) => void;
  handleSortCriteriaChange: (event: SelectChangeEvent<string>) => void;
  handlePriceRangeChange: (event: Event, newValue: number | number[]) => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
}

export const FiltersMenu: React.FunctionComponent<FiltersMenuProps> = ({
  searchTerms,
  category,
  categoriesOptions,
  sortCriteria,
  priceRange,
  setSearchTerms,
  handleCategoryChange,
  handleSortCriteriaChange,
  handlePriceRangeChange,
  anchorEl,
  open,
  handleClose,
}) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiMenu-list': {
          width: '100%',
          maxWidth: '320px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          position: 'sticky',
          top: theme.spacing(0.1),
          gap: theme.spacing(4),
          padding: theme.spacing(2),
          paddingTop: theme.spacing(4),
          backgroundColor: theme.palette.grey[200],
        },
      }}
    >
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
          onChange={(e, newValue) => handleCategoryChange(e, newValue as AutocompleteOption)}
          PopperComponent={({ ...props }) => <CustomPopper {...props} />}
          noOptionsText={formatMessage({ id: 'FORM.NO.OPTION' })}
          forcePopupIcon
          popupIcon={<KeyboardArrowDownRounded sx={{ color: alpha(theme.palette.text.primary, 0.5) }} />}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Box>
        <Stack direction={'column'} gap={2}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '16px',
              color: theme.palette.common.black,
              textAlign: 'center',
              fontWeigth: 'bold',
            }}
          >
            Ajustar Rango de Precios{' '}
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
    </Menu>
  );
};

export default FiltersMenu;

const CustomPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-listbox': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[4],
    color: theme.palette.grey[800],
  },
}));

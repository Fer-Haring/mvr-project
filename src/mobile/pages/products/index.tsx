import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box, FormControl, InputLabel, MenuItem, Popper, SelectChangeEvent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha, styled, useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import InputField from '@webapp/mobile/components/form/input';
import ProductCard from '@webapp/mobile/components/product-card';
import { getProducts } from '@webapp/sdk/firebase/products';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { CustomAutoComplete, CustomInputSearch, CustomSelect, FiltersHolder, Slider, StockWrapper } from './products';

interface AutocompleteOption {
  label: string;
  value: string;
}

interface FilterOptionsState {
  inputValue: string;
  // cualquier otra propiedad que el estado pueda tener
}

export const ProductsPage: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const { productList, setProductList } = useProductsListData();
  const { setProduct } = useSingleProduct();

  const [sortCriteria, setSortCriteria] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);

  useEffect(() => {
    const allCategories = Object.values(productList).map((product) => product.productCategory);
    const uniqueCategories = Array.from(new Set(allCategories));
    const formattedCategories = uniqueCategories.map((cat) => ({ label: cat, value: cat }));
    setCategoriesOptions(formattedCategories);
  }, [productList]);

  // Modify the onChange handler for CustomAutocomplete
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: AutocompleteOption | null) => {
    setSelectedCategory(newValue ? newValue.label : '');
    setCategory(newValue);
  };

  // Actualiza el manejador de cambios de rango de precios
  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleSortCriteriaChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = Object.values(productList);

    if (selectedCategory) {
      result = result.filter((product) => product.productCategory === selectedCategory);
    }

    if (priceRange[0] !== 1000 || priceRange[1] !== 20000) {
      result = result.filter(
        (product) => parseInt(product.salePrice) >= priceRange[0] && parseInt(product.salePrice) <= priceRange[1]
      );
    }

    if (searchTerms) {
      result = result.filter((product) => product.productName?.toLowerCase().includes(searchTerms.toLowerCase()));
    }

    // Ordenamiento basado en sortCriteria
    switch (sortCriteria) {
      case 'all':
        break;
      case 'minorPrice':
        result.sort((a, b) => parseInt(a.salePrice) - parseInt(b.salePrice));
        break;
      case 'mayorPrice':
        result.sort((a, b) => parseInt(b.salePrice) - parseInt(a.salePrice));
        break;
      case 'name':
        result.sort((a, b) => (a.productName || '').localeCompare(b.productName || ''));
        break;
      default:
      // Manejo de otros criterios o no ordenar
    }

    return result;
  }, [priceRange, productList, searchTerms, selectedCategory, sortCriteria]);

  useEffect(() => {
    getProducts().then((products) => {
      if (products) {
        setProductList(products);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentWrapper>
      <Stack direction={'row'} gap={6} width={'100%'}>
        <Stack direction={'column'}>
          <FiltersHolder>
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
              {/* <InputLabel id="category-select-label">{formatMessage({ id: 'PRODUCTS.FILTER' })}</InputLabel> */}
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
                  options.filter((opt) => opt.label.toLowerCase().includes(state.inputValue.toLowerCase()))
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
          </FiltersHolder>
        </Stack>

        <StockWrapper>
          {productList.length === 0 && (
            <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
              {formatMessage({ id: 'PRODUCTS.NO_PRODUCTS' })}
            </Typography>
          )}
          {filteredAndSortedProducts.map((product, id) => (
            <ProductCard
              key={id}
              id={id}
              products={[product]}
              image={product.productImage}
              name={product.productName}
              description={product.description}
              price={product.salePrice}
              currency={product.priceCurrency}
              onClick={() => {
                setProduct(product);
                navigate(`/productos/${product.productId}`);
              }}
            />
          ))}
        </StockWrapper>
      </Stack>
    </ContentWrapper>
  );
};

const CustomPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-listbox': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[4],
    color: theme.palette.grey[800],
  },
}));

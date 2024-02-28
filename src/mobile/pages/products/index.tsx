import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Box, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import ProductCard from '@webapp/mobile/components/product-card';
import FiltersMenu from '@webapp/mobile/controller/products/filters-menu';
import { getProducts } from '@webapp/sdk/firebase/products';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { CategoryButton, CategoryButtonWrapper, StockWrapper } from './products';

interface AutocompleteOption {
  label: string;
  value: string;
}

export const MobileProductsPage: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const { productList, setProductList } = useProductsListData();
  const { setProduct } = useSingleProduct();

  const [sortCriteria, setSortCriteria] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [mainCategory, setMainCategory] = useState<string>('');
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenFiltersMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (mainCategory) {
      const filteredProducts = Object.values(productList).filter(
        (product) => product.mainProductCategory === mainCategory
      );

      const relatedCategories = filteredProducts.map((product) => product.productCategory);
      const uniqueRelatedCategories = Array.from(new Set(relatedCategories));
      const formattedCategories = uniqueRelatedCategories.map((cat) => ({ label: cat, value: cat }));
      setCategoriesOptions(formattedCategories);
    } else {
      const allCategories = Object.values(productList).map((product) => product.productCategory);
      const uniqueCategories = Array.from(new Set(allCategories));
      const formattedCategories = uniqueCategories.map((cat) => ({ label: cat, value: cat }));
      setCategoriesOptions(formattedCategories);
    }
  }, [productList, mainCategory]);

  const handleMainCategoryChange = (category: string) => {
    setMainCategory(category);
    // Resetea otros filtros si es necesario, por ejemplo:
    setSelectedCategory('');
    setSearchTerms('');
  };

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: AutocompleteOption | null) => {
    setSelectedCategory(newValue ? newValue.label : '');
    setCategory(newValue);
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleSortCriteriaChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = Object.values(productList);

    if (mainCategory) {
      result = result.filter((product) => product.mainProductCategory === mainCategory);
    }

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
  }, [mainCategory, priceRange, productList, searchTerms, selectedCategory, sortCriteria]);

  const mainCategories = useMemo(() => {
    const allMainCategories = Object.values(productList).map((product) => product.mainProductCategory);
    return Array.from(new Set(allMainCategories));
  }, [productList]);

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
        <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'} pb={10}>
          {mainCategory && (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pb: 4, justifyContent: 'space-between' }}>
              <IconButton onClick={() => setMainCategory('')} sx={{ color: theme.palette.common.white, zIndex: 1 }}>
                <ArrowBackRoundedIcon sx={{ width: 48, height: 48 }} />
              </IconButton>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.grey[800],
                    textAlign: 'center',
                    fontFamily: 'WordMean',
                    letterSpacing: 5,
                    zIndex: 10,
                    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {mainCategory}
                </Typography>
              </Box>
              <IconButton onClick={handleOpenFiltersMenu}>
                <MenuRoundedIcon sx={{ width: 48, height: 48, color: theme.palette.common.white }} />
              </IconButton>
              {open && (
                <FiltersMenu
                  searchTerms={searchTerms}
                  category={category}
                  categoriesOptions={categoriesOptions}
                  sortCriteria={sortCriteria}
                  priceRange={priceRange}
                  setSearchTerms={setSearchTerms}
                  handleCategoryChange={handleCategoryChange}
                  handleSortCriteriaChange={handleSortCriteriaChange}
                  handlePriceRangeChange={handlePriceRangeChange}
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={handleClose}
                />
              )}
            </Box>
          )}
          {!mainCategory && (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.common.white,
                  textAlign: 'center',
                  pb: 4,
                  fontSize: 32,
                  fontFamily: 'WordMean',
                }}
              >
                {formatMessage({ id: 'PRODUCTS.SELECT.MAIN.CATEGORY' })}
              </Typography>
              <CategoryButtonWrapper>
                {mainCategories.map((category) => (
                  <CategoryButton
                    key={category}
                    variant="contained"
                    className="bn26"
                    onClick={() => handleMainCategoryChange(category)}
                  >
                    {category}
                  </CategoryButton>
                ))}
              </CategoryButtonWrapper>
            </Box>
          )}
          {mainCategory && (
            <StockWrapper key={filteredAndSortedProducts.map((product) => product.productId).join('')}>
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
          )}
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

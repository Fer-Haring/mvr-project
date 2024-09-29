import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { Box, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/components/content-wrapper';
import ProductCardV2 from '@webapp/components/product-card-V2';
import { MainCategoriesImages } from '@webapp/controller/products/image-categories-enum';
import ProductFilterPanel from '@webapp/controller/products/product-filter-panel';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { Product } from '@webapp/sdk/types/products-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { useSelectedMainCategoryStore } from '@webapp/store/products/selected-main-category';
import { useSelectedProductFilterStore } from '@webapp/store/products/selected-product-filter';
import { motion } from 'framer-motion';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { CategoryButton, CategoryButtonWrapper, StockWrapper } from './products';

interface AutocompleteOption {
  label: string;
  value: string;
}

export const ProductsPage: FunctionComponent = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const { productList, setProductList } = useProductsListData();
  const { setProduct } = useSingleProduct();
  const { selectedMainCategory, setSelectedMainCategory } = useSelectedMainCategoryStore();
  const { selectedProductFilter, setSelectedProductFilter } = useSelectedProductFilterStore();

  const [sortCriteria, setSortCriteria] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState(selectedProductFilter);
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [categoriesOptions, setCategoriesOptions] = useState<AutocompleteOption[]>([]);
  const [category, setCategory] = useState<AutocompleteOption | null>(null);
  const showHideFilters = true;

  const { data: productListData } = useProductListQuery(1, 500);

  useEffect(() => {
    if (productListData?.products) {
      setProductList(productListData.products);
    }
  }, [productListData, setProductList]);

  useEffect(() => {
    if (selectedMainCategory) {
      const filteredProducts = productList.filter((product) => product.main_product_category === selectedMainCategory);
      const relatedCategories = filteredProducts.map((product) => product.product_category);
      const uniqueRelatedCategories = Array.from(new Set(relatedCategories));
      const formattedCategories = uniqueRelatedCategories.map((cat) => ({ label: cat, value: cat }));
      setCategoriesOptions(formattedCategories);
    } else {
      const allCategories = productList.map((product) => product.product_category);
      const uniqueCategories = Array.from(new Set(allCategories));
      const formattedCategories = uniqueCategories.map((cat) => ({ label: cat, value: cat }));
      setCategoriesOptions(formattedCategories);
    }
  }, [productList, selectedMainCategory]);

  useEffect(() => {
    const scrollableElement = document.querySelector('.content');
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollableElement && savedScrollPosition) {
      scrollableElement.scrollTo({ top: parseInt(savedScrollPosition), behavior: 'auto' });
      sessionStorage.removeItem('scrollPosition');
    }
  }, [productList]);

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(category);
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

  const handleScrollToTop = () => {
    const scrollableElement = document.querySelector('.content');
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product: Product) => {
    const scrollableElement = document.querySelector('.content');
    if (scrollableElement) {
      const scrollPosition = scrollableElement.scrollTop;
      sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    }
    setProduct(product);
    navigate(`/productos/${product.id}`);
  };

  const handleBackButton = () => {
    setSelectedMainCategory('');
    setSelectedCategory('');
    setSearchTerms('');
    setSelectedProductFilter('');
    setCategory(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = productList;

    if (selectedMainCategory) {
      result = result.filter((product) => product.main_product_category === selectedMainCategory);
    }

    if (selectedCategory) {
      result = result.filter((product) => product.product_category === selectedCategory);
    }

    if (priceRange[0] !== 1000 || priceRange[1] !== 20000) {
      result = result.filter(
        (product) => parseInt(product.sale_price) >= priceRange[0] && parseInt(product.sale_price) <= priceRange[1]
      );
    }

    if (searchTerms) {
      result = result.filter((product) => product.product_name?.toLowerCase().includes(searchTerms.toLowerCase()));
    }

    switch (sortCriteria) {
      case 'minorPrice':
        result.sort((a, b) => parseInt(a.sale_price) - parseInt(b.sale_price));
        break;
      case 'mayorPrice':
        result.sort((a, b) => parseInt(b.sale_price) - parseInt(a.sale_price));
        break;
      case 'name':
        result.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
        break;
      default:
        break;
    }

    return result;
  }, [selectedMainCategory, priceRange, productList, searchTerms, selectedCategory, sortCriteria]);

  const mainCategories = useMemo(() => {
    const allMainCategories = productList.map((product) => product.main_product_category);
    return Array.from(new Set(allMainCategories));
  }, [productList]);

  const sortedMainCategories = useMemo(() => {
    return [...mainCategories].sort((a, b) => 0 - (a > b ? -1 : 1));
  }, [mainCategories]);

  return (
    <ContentWrapper>
      <Stack direction={'row'} gap={6} width={'100%'} p={isMobile ? 0 : 4}>
        <Stack direction={'column'} gap={2} width={'100%'}>
          {selectedMainCategory && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: 64,
                pb: 4,
                pt: 4,
                backgroundColor: alpha(theme.palette.common.white, 0.9),
                position: 'sticky',
                top: 0,
                zIndex: 1,
                borderRadius: 1,
              }}
            >
              <IconButton
                onClick={handleBackButton}
                sx={{
                  color: theme.palette.common.black,
                  zIndex: 1,
                }}
              >
                <ArrowBackRoundedIcon sx={{ width: 48, height: 48 }} />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.common.black,
                    textAlign: 'center',
                    position: 'absolute',
                    fontFamily: 'WordMean',
                    letterSpacing: 4,
                  }}
                >
                  {selectedMainCategory}
                </Typography>
              </Box>
              <Box sx={{ width: 48 }} />
            </Box>
          )}
          {selectedMainCategory && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: showHideFilters ? 1 : 0, y: showHideFilters ? 0 : -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProductFilterPanel
                categoriesOptions={categoriesOptions}
                category={category}
                handleCategoryChange={handleCategoryChange}
                handlePriceRangeChange={handlePriceRangeChange}
                handleSortCriteriaChange={handleSortCriteriaChange}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                sortCriteria={sortCriteria}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setCategory={setCategory}
                setSortCriteria={setSortCriteria}
              />
            </motion.div>
          )}
          {!selectedMainCategory && (
            <>
              <Typography
                variant="h1"
                sx={{ color: theme.palette.common.white, textAlign: 'center', pb: 4, fontFamily: 'WordMean' }}
              >
                {formatMessage({ id: 'PRODUCTS.SELECT.MAIN.CATEGORY' })}
              </Typography>
              <CategoryButtonWrapper isMobile={isMobile}>
                {sortedMainCategories.map((category) => (
                  <Box
                    key={category}
                    onClick={() => handleMainCategoryChange(category)}
                    sx={{
                      width: !isMobile ? '15vw' : '100%',
                      maxWidth: '400px',
                      height: !isMobile ? '15vw' : '40vw',
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 2,
                      borderRadius: 2,
                      backgroundImage: `url(${MainCategoriesImages[category]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      cursor: 'pointer',
                      transition: 'all .4s ease-in-out',
                    }}
                  >
                    <CategoryButton
                      isMobile={isMobile}
                      key={category}
                      variant="contained"
                      className="bn26"
                      onClick={() => handleMainCategoryChange(category)}
                    >
                      {category}
                    </CategoryButton>
                  </Box>
                ))}
              </CategoryButtonWrapper>
            </>
          )}
          {selectedMainCategory && (
            <StockWrapper key={filteredAndSortedProducts.map((product) => product.id).join('')} isMobile={isMobile}>
              {productList.length === 0 && (
                <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
                  {formatMessage({ id: 'PRODUCTS.NO_PRODUCTS' })}
                </Typography>
              )}
              {filteredAndSortedProducts.map((product, id) => (
                <ProductCardV2
                  key={product.id}
                  id={id}
                  product={product}
                  image={product.product_image || ''}
                  name={product.product_name}
                  description={product.description}
                  price={product.sale_price}
                  currency={product.price_currency}
                  onClick={() => {
                    handleProductClick(product);
                  }}
                />
              ))}
            </StockWrapper>
          )}
        </Stack>
      </Stack>
      <IconButton
        onClick={() => handleScrollToTop()}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          zIndex: 1000,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
          },
        }}
      >
        <ArrowUpwardRoundedIcon />
      </IconButton>
    </ContentWrapper>
  );
};

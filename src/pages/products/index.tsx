import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/components/content-wrapper';
import ProductCard from '@webapp/components/product-card';
import ProductFilterPanel from '@webapp/controller/products/product-filter-panel';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
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
  const showHideFilters = useState<boolean>(true);

  const { data: productListData } = useProductListQuery(1, 500);

  useEffect(() => {
    if (productListData?.products) {
      setProductList(productListData.products);
    }
  }, [productListData, setProductList]);

  useEffect(() => {
    if (mainCategory) {
      const filteredProducts = productList.filter((product) => product.main_product_category === mainCategory);
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
  }, [productList, mainCategory]);

  const handleMainCategoryChange = (category: string) => {
    setMainCategory(category);
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
    let result = productList;

    if (mainCategory) {
      result = result.filter((product) => product.main_product_category === mainCategory);
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
  }, [mainCategory, priceRange, productList, searchTerms, selectedCategory, sortCriteria]);

  const mainCategories = useMemo(() => {
    const allMainCategories = productList.map((product) => product.main_product_category);
    return Array.from(new Set(allMainCategories));
  }, [productList]);

  return (
    <ContentWrapper>
      <Stack direction={'row'} gap={6} width={'100%'}>
        <Stack direction={'column'} gap={2} width={'100%'}>
          {mainCategory && (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pb: 4 }}>
              <IconButton onClick={() => setMainCategory('')} sx={{ color: theme.palette.common.white, zIndex: 1 }}>
                <ArrowBackRoundedIcon sx={{ width: 48, height: 48 }} />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.common.white,
                    textAlign: 'center',
                    position: 'absolute',
                    fontFamily: 'WordMean',
                  }}
                >
                  {mainCategory}
                </Typography>
              </Box>
              <Box sx={{ width: 48 }} />
              {/* <Tooltip title={formatMessage({ id: 'PRODUCTS.FILTER.BUTTON' })}>
                <IconButton
                  sx={{ color: theme.palette.common.white, zIndex: 1 }}
                  onClick={() => setShowHideFilters(!showHideFilters)}
                >
                  <FilterAltRoundedIcon sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip> */}
            </Box>
          )}
          {mainCategory && (
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
          {!mainCategory && (
            <>
              <Typography
                variant="h1"
                sx={{ color: theme.palette.common.white, textAlign: 'center', pb: 4, fontFamily: 'WordMean' }}
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
            </>
          )}
          {mainCategory && (
            <StockWrapper key={filteredAndSortedProducts.map((product) => product.id).join('')}>
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
                  image={product.product_image || ''}
                  name={product.product_name}
                  description={product.description}
                  price={product.sale_price}
                  currency={product.price_currency}
                  onClick={() => {
                    setProduct(product);
                    navigate(`/productos/${product.id}`);
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

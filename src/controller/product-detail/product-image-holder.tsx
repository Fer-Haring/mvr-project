import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import ImageUploader from '@webapp/components/image-uploader';
import SnackbarUtils from '@webapp/components/snackbar';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useUpdateProduct } from '@webapp/sdk/mutations/products/update-product-mutation';
import useUploadImagesArrayMutation from '@webapp/sdk/mutations/products/upload-images-array-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface ProductImageHolderProps {
  className?: string;
  sx?: SxProps<Theme>;
  product: Product;
  id: string;
}

const ProductImageHolder: FunctionComponent<ProductImageHolderProps> = ({ className, product, sx, id }) => {
  const { formatMessage } = useIntl();
  const { setProduct } = useSingleProduct();
  const { user } = useUserData();
  const updateProductMutation = useUpdateProduct();
  const uploadImagesMutation = useUploadImagesArrayMutation();
  const getProducts = useProductListQuery(1, 500);

  const onImagesChange = (imageFiles: File[] | undefined) => {
    if (!imageFiles || imageFiles.length === 0) {
      return;
    }
    handleUpdateImages(imageFiles);
  };

  const handleUpdateImages = async (images: File[]) => {
    try {
      const updatedProduct = await uploadImagesMutation.mutateAsync({
        productId: product.id!,
        images,
      });

      getProducts.refetch();
      setProduct(updatedProduct);
      SnackbarUtils.success(formatMessage({ id: 'PRODUCTS.DETAIL.IMAGE_SUCCESS_UPLOAD' }, { producto: product.product_name }));
    } catch (error) {
      console.error('Error uploading product images:', error);
      SnackbarUtils.error(
        formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_ERROR' }) +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  const onImagesDelete = () => {
    handleDeleteImages();
  };

  const handleDeleteImages = async () => {
    try {
      const updatedProduct = { ...product, images_array: [] };

      await updateProductMutation.mutateAsync({
        productId: product.id!,
        productData: updatedProduct,
      });

      getProducts.refetch();
      setProduct(updatedProduct);
      SnackbarUtils.success(formatMessage({ id: 'PRODUCT.IMAGES_DELETED' }));
    } catch (error) {
      console.error('Error deleting product images:', error);
      SnackbarUtils.error(
        formatMessage({ id: 'PRODUCT.IMAGES_DELETE_ERROR' }) +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  return (
    <Box
      className={className || ''}
      sx={{ ...sx, minWidth: 300, maxWidth: 400, width: '100%' }}
      aria-label={formatMessage({ id: 'PRODUCT.IMAGE_PANEL' })}
      key={id}
    >
      <ImageUploader
        sx={{ width: '100%' }}
        onImagesChange={onImagesChange}
        onImagesDelete={onImagesDelete}
        disabled={user?.admin ? false : true}
        defaultImageUrls={product.images_array}
        defaultImageUrl={product.product_image}
        admin={user?.admin}
        multiple={true}
        onImageDelete={onImagesDelete}
      />
    </Box>
  );
};

export default ProductImageHolder;

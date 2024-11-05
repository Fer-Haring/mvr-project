import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import ImageUploader from '@webapp/components/image-uploader';
import { useProduct, useUploadImagesArray } from '@webapp/hooks/productsHooks/useProducts';
import { useAppSelector } from '@webapp/hooks/redux-hooks';
import { updateProductThunk } from '@webapp/redux/store/thunks/productsThunks';
import { Product } from '@webapp/services/types/products-types';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

interface ProductImageHolderProps {
  className?: string;
  sx?: SxProps<Theme>;
  product: Product;
  id: string;
}

const ProductImageHolder: FunctionComponent<ProductImageHolderProps> = ({ className, product, sx, id }) => {
  const { formatMessage } = useIntl();
  const { userById } = useAppSelector((state) => state.user);
  const { uploadImages } = useUploadImagesArray();
  const { fetchProductsList, fetchProductById } = useProduct();

  const onImagesChange = (imageFiles: File[] | undefined) => {
    if (!imageFiles || imageFiles.length === 0) {
      return;
    }
    handleUpdateImages(imageFiles);
  };

  const handleUpdateImages = async (images: File[]) => {
    try {
      await uploadImages(product.id!, images);

      fetchProductsList(1, 500);
      fetchProductById(product.id!);
      toast.success(formatMessage({ id: 'PRODUCTS.DETAIL.IMAGE_SUCCESS_UPLOAD' }, { producto: product.product_name }));
    } catch (error) {
      toast.error(
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

      await updateProductThunk({
        productId: product.id!,
        productData: updatedProduct,
      });

      fetchProductsList(1, 500);
      fetchProductById(product.id!);
      toast.success(formatMessage({ id: 'PRODUCT.IMAGES_DELETED' }));
    } catch (error) {
      console.error('Error deleting product images:', error);
      toast.error(
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
        disabled={userById?.user?.admin ? false : true}
        defaultImageUrls={product?.images_array || []}
        defaultImageUrl={product?.product_image || ''}
        admin={userById?.user?.admin}
        multiple={true}
        onImageDelete={onImagesDelete}
      />
    </Box>
  );
};

export default ProductImageHolder;

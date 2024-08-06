import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import ImageUploader from '@webapp/components/image-uploader';
import SnackbarUtils from '@webapp/components/snackbar';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useUpdateProduct } from '@webapp/sdk/mutations/products/update-product-mutation';
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
  const getProducts = useProductListQuery(1, 500);

  const onAvatarChange = (avatarFile: File | undefined) => {
    if (!avatarFile) {
      return;
    }
    handleUpdateAvatar(avatarFile);
  };

  const handleUpdateAvatar = async (image: File) => {
    try {
      const updatedProduct = { ...product };

      // Usar la mutación para actualizar el producto con la imagen directamente al endpoint
      await updateProductMutation
        .mutateAsync({
          productId: product.id!,
          productData: updatedProduct,
          file: image,
        })
        .then(() => {
          getProducts.refetch();
        });

      setProduct(updatedProduct);
      SnackbarUtils.success(formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPDATED' }));
    } catch (error) {
      console.error('Error updating product image:', error);
      SnackbarUtils.error(
        formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPDATE_ERROR' }) +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  return (
    <Box
      className={className || ''}
      sx={{ ...sx, minWidth: 300, maxWidth: 400, width: '100%' }}
      aria-label={formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
      key={id}
    >
      <ImageUploader
        sx={{ width: '100%' }}
        onImageChange={onAvatarChange}
        onImageDelete={() => {
          // setProductImage({ file: undefined, url: undefined });
        }}
        disabled={user?.admin ? false : true}
        defaultImageUrl={product.product_image}
        admin={user?.admin}
        // aria-label={formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPLOAD' })}
      />
    </Box>
  );
};

export default ProductImageHolder;

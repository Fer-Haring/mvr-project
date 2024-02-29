import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import ImageUploader from '@webapp/mobile/components/image-uploader';
import SnackbarUtils from '@webapp/mobile/components/snackbar';
import { uploadProductImage } from '@webapp/sdk/firebase/products';
import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface ProductImageHolderProps {
  className?: string;
  sx?: SxProps<Theme>;
  product: Products;
  id: string;
}

const ProductImageHolder: FunctionComponent<ProductImageHolderProps> = ({ className, product, sx, id }) => {
  const { formatMessage } = useIntl();
  const { setProduct } = useSingleProduct();
  const { user } = useUserData();

  const onAvatarChange = (avatarFile: File | undefined) => {
    if (!avatarFile) {
      return;
    }
    handleUpdateAvatar(avatarFile);
    SnackbarUtils.success(formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPDATED' }));
  };

  const handleUpdateAvatar = async (image: File) => {
    const downloadURL = await uploadProductImage(image, product.productId);
    if (downloadURL) {
      setProduct({ ...product, productImage: downloadURL });
    }
  };

  return (
    <Box
      className={className || ''}
      sx={{ ...sx, minWidth: 400, width: '100%' }}
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
        defaultImageUrl={product.productImage}
        admin={user?.admin}
        // aria-label={formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPLOAD' })}
      />
    </Box>
  );
};

export default ProductImageHolder;

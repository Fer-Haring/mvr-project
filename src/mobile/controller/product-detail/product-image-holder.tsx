import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { ImageUploadDrawer } from '@webapp/mobile/components/image-upload-drawer';
import ImageUploader from '@webapp/mobile/components/image-uploader';
import SnackbarUtils from '@webapp/mobile/components/snackbar';
import { uploadProductImage } from '@webapp/sdk/firebase/products';
import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useUserData } from '@webapp/store/users/user-data';
import { convertBase64ImageToFile } from '@webapp/web/utils/convert-base64-to-file';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onAvatarChange = useCallback(
    (avatarFile: File | undefined) => {
      if (!avatarFile) {
        return;
      }
      const handleUpdateAvatar = async (image: File) => {
        const downloadURL = await uploadProductImage(image, product.productId);
        if (downloadURL) {
          setProduct({ ...product, productImage: downloadURL });
        }
      };
      handleUpdateAvatar(avatarFile);
      SnackbarUtils.success(formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPDATED' }));
    },
    [formatMessage, product, setProduct]
  );

  function sendMessageToReactNative(message: string) {
    if (window.nativeAppHandler) {
      window.nativeAppHandler.postMessage(message);
    }
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMessage(event: any) {
      const data = event.data;
      if (data.type === 'selected_image') {
        setSelectedImage(data.base64Image);

        onAvatarChange(convertBase64ImageToFile(data.base64Image));
      }
      if (data.type === 'camera_error') {
        SnackbarUtils.error(data.message);
      }
      if (data.type === 'gallery_error') {
        SnackbarUtils.error(data.message);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [formatMessage, onAvatarChange, selectedImage]);

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
        onClick={handleOpenDrawer}
        entity="mobile-product"
      />
      {drawerOpen && (
        <ImageUploadDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          sendMessageToReactNative={sendMessageToReactNative}
          entity="mobile-product"
        />
      )}
    </Box>
  );
};

export default ProductImageHolder;

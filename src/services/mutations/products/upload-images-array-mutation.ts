import { useMutation } from '@tanstack/react-query';
import { uploadImagesArray } from '@webapp/services/actions/products/upload-images-array';
import { Product } from '@webapp/services/types/products-types';

interface UploadImagesParams {
  productId: string;
  images: File[];
}

const useUploadImagesArrayMutation = () => {
  return useMutation<Product, Error, UploadImagesParams>({
    mutationFn: ({ productId, images }: UploadImagesParams) => uploadImagesArray(productId, images),
  });
};

export default useUploadImagesArrayMutation;

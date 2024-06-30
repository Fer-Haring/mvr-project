import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { get, ref, update } from 'firebase/database';
import { getDownloadURL, ref as storageReference, uploadBytes } from 'firebase/storage';

import { database, storage } from '../firebase';

export const uploadProductImage = async (file: File, productId: string) => {
  const storageRef = storageReference(storage, 'Products/' + productId);

  const snapshot = await uploadBytes(storageRef, file);
  console.log('Uploaded a blob or file!', snapshot.metadata);

  // Obtener la URL de descarga
  const downloadURL = await getDownloadURL(storageRef);

  // Actualiza el campo profilePicture en Realtime Database para el usuario
  const userRef = ref(database, `Products/${productId}`);
  await update(userRef, { productImage: downloadURL });

  return downloadURL as string;
};

export const getProducts = async () => {
  const starCountRef = ref(database, 'Products/');
  try {
    const snapshot = await get(starCountRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      useProductsListData.setState({ productList: data });
      return data;
    } else {
      console.log('No data available at Products/');
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getProductById = async (productId: string) => {
  const starCountRef = ref(database, 'Products/' + productId);
  try {
    const snapshot = await get(starCountRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      useSingleProduct.getState().setProduct(data);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

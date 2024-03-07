import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import SnackbarUtils from '@webapp/web/components/snackbar';
import { get, getDatabase, push, ref, update } from 'firebase/database';
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

export const addNewProduct = async (productData: Products) => {
  const db = getDatabase();
  const productsRef = ref(db, 'Products/');
  try {
    // Añade el producto a la base de datos y genera un ID único
    const newProductRef = await push(productsRef, productData);
    SnackbarUtils.success(`Producto añadido con ID: ${newProductRef.key}`);

    // Actualiza el producto recién añadido con su propio ID generado
    await update(ref(db, `Products/${newProductRef.key}`), { productId: newProductRef.key });

    SnackbarUtils.success('Producto actualizado con su propio ID');
    return newProductRef.key; // Retorna el ID único del nuevo producto
  } catch (error) {
    console.error('Error añadiendo o actualizando el producto:', error);
    throw error; // O maneja el error como prefieras
  }
};

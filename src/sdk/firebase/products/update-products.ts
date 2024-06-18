import SnackbarUtils from '@webapp/components/snackbar';
import { ref, update } from 'firebase/database';

import { database } from '../firebase';
import { Product } from '@webapp/sdk/mutations/products/types';

export const updateProduct = async (id: string, productData: Product) => {
  const productsRef = ref(database, 'Products/' + id);
  try {
    await update(productsRef, productData);
    SnackbarUtils.success('Producto actualizado con éxito');
    return { ...productData };
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    return null;
  }
};

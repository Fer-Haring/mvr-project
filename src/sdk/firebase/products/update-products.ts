import { Products } from '@webapp/sdk/users-types';
import { ref, update } from 'firebase/database';

import { database } from '../firebase';

export const updateProduct = async (id: string, productData: Products) => {
  const productsRef = ref(database, 'Products/' + id);
  try {
    await update(productsRef, productData);
    return { id, ...productData };
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};
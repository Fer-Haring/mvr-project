
import { ref, update } from 'firebase/database';
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

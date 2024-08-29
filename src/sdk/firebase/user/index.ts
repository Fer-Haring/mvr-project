import { ref, update } from 'firebase/database';
import { getDownloadURL, ref as storageReference, uploadBytes } from 'firebase/storage';

import { auth, database, storage } from '../firebase';

export const uploadAvatar = async (file: File) => {
  const userId = auth.currentUser?.uid;
  const storageRef = storageReference(storage, 'Avatars/' + userId);

  const snapshot = await uploadBytes(storageRef, file);

  // Obtener la URL de descarga
  const downloadURL = await getDownloadURL(storageRef);

  // Actualiza el campo profilePicture en Realtime Database para el usuario
  const userRef = ref(database, `Users/${userId}`);
  await update(userRef, { profilePicture: downloadURL });

  return downloadURL as string;
};

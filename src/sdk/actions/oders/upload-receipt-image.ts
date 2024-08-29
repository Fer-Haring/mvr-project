import { storage } from '@webapp/sdk/firebase/firebase';
import { useUserData } from '@webapp/store/users/user-data';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';


export const uploadTransferReceipt = async (file: File, userId: string): Promise<string> => {
  const timestamp = Date.now();
  const fileRef = storageRef(storage, `TransfersReceipts/${userId}_${timestamp}`);

  const snapshot = await uploadBytes(fileRef, file);

  // Obtener la URL de descarga
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
};
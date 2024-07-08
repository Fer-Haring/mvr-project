import SnackbarUtils from '@webapp/components/snackbar';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { CompletedOrder } from '@webapp/sdk/types/user-types';
import { ref, update } from 'firebase/database';
import { getDownloadURL, ref as storageReference, uploadBytes } from 'firebase/storage';

import { auth, database, storage } from '../firebase';

export async function updateUserInDb({
  userId,
  profilePicture,
  address,
  cartItems, // Ahora es un arreglo de CartItem
  completedOrders, // Ahora es un arreglo de CompletedOrder
  phone,
  city,
  deliveryType,
  deliverZone,
  preferredCurrency,
  paymentMethod,
}: {
  userId: string;
  profilePicture?: string;
  address?: string;
  cartItems?: CartItem[];
  completedOrders?: CompletedOrder[];
  phone?: string;
  city?: string;
  deliveryType?: string;
  paymentMethod?: string;
  deliverZone?: string;
  preferredCurrency?: string;
}) {
  try {
    await update(ref(database, 'Users/' + userId), {
      ...(profilePicture && { profilePicture }),
      ...(address && { address }),
      ...(cartItems && { cartItems }),
      ...(completedOrders && { completedOrders }),
      ...(phone && { phone }),
      ...(city && { city }),
      ...(deliveryType && { deliveryType }),
      ...(paymentMethod && { paymentMethod }),
      ...(deliverZone && { deliverZone }),
      ...(preferredCurrency && { preferredCurrency }),
      // No necesitas actualizar el campo admin aquí, a menos que sea parte de la lógica de actualización
    });
    SnackbarUtils.success('Usuario actualizado correctamente');
  } catch (error) {
    SnackbarUtils.error(('Error al actualizar usuario: ' + error) as string);
  }
}

export const uploadAvatar = async (file: File) => {
  const userId = auth.currentUser?.uid;
  const storageRef = storageReference(storage, 'Avatars/' + userId);

  const snapshot = await uploadBytes(storageRef, file);
  console.log('Uploaded a blob or file!', snapshot.metadata);

  // Obtener la URL de descarga
  const downloadURL = await getDownloadURL(storageRef);

  // Actualiza el campo profilePicture en Realtime Database para el usuario
  const userRef = ref(database, `Users/${userId}`);
  await update(userRef, { profilePicture: downloadURL });

  return downloadURL as string;
};

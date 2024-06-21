import SnackbarUtils from '@webapp/components/snackbar';
import { useUserStore } from '@webapp/store/auth/session';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  linkWithRedirect,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { NavigateFunction } from 'react-router-dom';

import { auth, database } from '../firebase';
import { getUser } from '../user';

export const logout = async () => {
  try {
    await signOut(auth);
    useUserStore.getState().logOut();
  } catch (error) {
    const errorMessage = error;
    SnackbarUtils.error(errorMessage as string);
  }
};

export const signUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.code;
      console.log(error.code);
      if (errorMessage === 'auth/email-already-in-use') {
        SnackbarUtils.error('El mail ya se encuentra registrado');
      } else {
        SnackbarUtils.error('An unexpected error occurred');
      }
    });
};

export const signInWithGoogle = async (navigate: NavigateFunction) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('user', user);
    const userId = user.uid;

    const userData = await getUser(userId);
    if (userData) {
      // Si el usuario ya existe, verificamos si el proveedor ya está vinculado
      const currentUser = auth.currentUser;
      if (currentUser) {
        const providerId = provider.providerId;
        const alreadyLinked = currentUser.providerData.some(
          (profile) => profile.providerId === providerId
        );

        if (!alreadyLinked) {
          await linkWithRedirect(currentUser, provider);
          console.log('Provider linked:', providerId);
        } else {
          console.log('Provider already linked:', providerId);
        }
        navigate('/home');
        // Realizar la redirección aquí
      } else {
        throw new Error('No current user');
      }
    } else {
      console.log('User data:', userData);
      // En caso de que el usuario no exista en la base de datos
      navigate('/home');
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firebase error during sign-in:', error.code, error.message);
    } else {
      console.error('Unexpected error during sign-in:', error);
    }
  }
};

export function saveUserInDb(name: string, lastName: string, email: string, profilePicture: string, userId?: string) {
  set(ref(database, 'Users/' + userId), {
    userId,
    name,
    lastName,
    email,
    profilePicture,
    admin: false,
    address: '',
    city: '',
    deliveryType: '',
    paymentMethod: '',
    cartItems: [],
    completedOrders: [],
    phone: '',
  });
}

export const recoverPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/sign-in',
      handleCodeInApp: true,
    });
    SnackbarUtils.success('Un email ha sido enviado a tu casilla de correo');
  } catch (error) {
    SnackbarUtils.error('An unexpected error occurred');
  }
};

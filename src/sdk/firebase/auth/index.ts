import SnackbarUtils from '@webapp/components/snackbar';
import { useUserStore } from '@webapp/store/auth/session';
import { useUserId } from '@webapp/store/users/user-id';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { NavigateFunction } from 'react-router-dom';

import { auth, database } from '../firebase';

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

export const signIn = async (email: string, password: string, navigate: NavigateFunction) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    useUserId.getState().setUserId(user.uid);
    useUserStore.getState().logIn(user.uid, user.email!);
    navigate('/home'); // Utiliza navigate para redirigir al usuario
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.code;
      if (errorMessage === 'auth/invalid-credential') {
        SnackbarUtils.error('El mail o la contraseña son incorrectos');
      }
    } else {
      // Si no es un error de Firebase, podrías manejarlo de manera diferente o lanzar una excepción
      console.error(error);
      SnackbarUtils.error('An unexpected error occurred');
    }
  }
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
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

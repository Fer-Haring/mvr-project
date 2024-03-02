import { User } from '@webapp/sdk/users-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserData = {
  user: User;
  setUser: (user: User) => void;
  cleanUserLogout: () => void;
};

export const useUserData = create(
  persist<UserData>(
    (set) => ({
      user: {
        userId: '',
        name: '',
        lastName: '',
        email: '',
        profilePicture: '',
        admin: false,
        address: '',
        city: '',
        deliveryType: '',
        paymentMethod: '',
        cartItems: [], // cartItems ahora es un arreglo directamente en User
        completedOrders: [], // completedOrders ahora es un arreglo directamente en User
        phone: '',
        deliverZone: '',
        preferredCurrency: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      setUser: (user) => set({ user }),
      cleanUserLogout: () =>
        set({
          user: {
            userId: '',
            name: '',
            lastName: '',
            email: '',
            profilePicture: '',
            admin: false,
            address: '',
            city: '',
            deliveryType: '',
            paymentMethod: '',
            cartItems: [],
            completedOrders: [],
            phone: '',
            deliverZone: '',
            preferredCurrency: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
    }),
    {
      name: 'userData', // Nombre del store para persistencia
      getStorage: () => localStorage, // Define localStorage como el método de almacenamiento
    }
  )
);

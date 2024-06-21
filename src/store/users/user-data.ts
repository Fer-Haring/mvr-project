
import { User } from '@webapp/sdk/actions/auth/types';
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
        id: '',
        name: '',
        last_name: '',
        email: '',
        profile_picture: '',
        admin: false,
        address: '',
        city: '',
        delivery_type: '',
        payment_method: '',
        cart_items: [], // cartItems ahora es un arreglo directamente en User
        completed_orders: [], // completedOrders ahora es un arreglo directamente en User
        phone: '',
        deliver_zone: '',
        preferred_currency: '',
        password: '',
        username: '',
      },
      setUser: (user) => set({ user }),
      cleanUserLogout: () =>
        set({
          user: {
            id: '',
            name: '',
            last_name: '',
            email: '',
            profile_picture: '',
            admin: false,
            address: '',
            city: '',
            delivery_type: '',
            payment_method: '',
            cart_items: [], // cartItems ahora es un arreglo directamente en User
            completed_orders: [], // completedOrders ahora es un arreglo directamente en User
            phone: '',
            deliver_zone: '',
            preferred_currency: '',
            password: '',
            username: '',
          },
        }),
    }),
    {
      name: 'userData', // Nombre del store para persistencia
      getStorage: () => localStorage, // Define localStorage como el método de almacenamiento
    }
  )
);

import { User } from '@webapp/sdk/types/user-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserData = {
  user: User;
  setUser: (user: User) => void;
  cleanUserLogout: () => void;
};

export const useUserData = create(
  persist<UserData>(
    (set) => {
      return {
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
          delivery_cost: 0,
          cart_items: [],
          completed_orders: [],
          phone: '',
          delivery_zone: '',
          preferred_currency: '',
          password: '',
          username: '',
          favorite_products: [],
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
              delivery_cost: 0,
              payment_method: '',
              cart_items: [],
              completed_orders: [],
              phone: '',
              delivery_zone: '',
              preferred_currency: '',
              password: '',
              username: '',
              favorite_products: [],
            },
          }),
      };
    },
    {
      name: 'userData', // Nombre del store para persistencia
      storage: createJSONStorage(() => localStorage),
    }
  )
);

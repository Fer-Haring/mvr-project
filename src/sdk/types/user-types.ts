import { Product } from '@webapp/sdk/types/products-types';

import { CartItem } from './cart-types';

export interface LoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  user_id: string;
  user_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  admin: boolean;
  city: string;
  completed_orders: CompletedOrder[];
  cart_items: CartItem[];
  delivery_cost: number;
  delivery_zone: string;
  delivery_type: string;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
}

export interface CompletedOrder {
  order_id?: string | number;
  user_id?: string;
  cart_items?: CartItem[];
  total_products?: number;
  total_order_amount_usd?: number;
  total_order_amount_ars?: number;
  status?: string;
  currency_used_to_pay?: string;
  payment_method?: string;
  delivery_type?: string;
  created_at?: Date;
  updated_at?: Date;
  total_order_amount?: number;
  expandable?: boolean;
}

export interface Order {
  order_id?: string | number;
  user_id?: string;
  cart_items?: CartItem[];
  total_products?: number;
  total_order_amount_usd?: number;
  total_order_amount_ars?: number;
  status?: string;
  currency_used_to_pay?: string;
  payment_method?: string;
  delivery_type?: string;
  created_at?: Date;
  updated_at?: Date;
  total_order_amount?: number;
  expandable?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  admin: boolean;
  city: string;
  completed_orders: CompletedOrder[];
  cart_items: CartItem[];
  delivery_zone: string;
  delivery_type: string;
  delivery_cost: number;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
  favorite_products: Product[];
}

export interface AdminData {
  users: User[];
  orders: CompletedOrder[];
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  address?: string;
  admin?: boolean;
  city?: string;
  completed_orders?: CompletedOrder[];
  cart_items?: CartItem[];
  delivery_zone?: string;
  delivery_type?: string;
  delivery_cost?: number;
  last_name?: string;
  name?: string;
  payment_method?: string;
  phone?: string;
  preferred_currency?: string;
  profile_picture?: string;
}

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
  deliver_zone: string;
  delivery_type: string;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
}

export interface CompletedOrder {
  orderId?: string | number;
  userId?: string;
  cartItems?: CartItem[];
  totalProducts?: number;
  totalOrderAmountUSD?: number;
  totalOrderAmountARS?: number;
  status?: string;
  currencyUsedToPay?: string;
  paymentMethod?: string;
  deliveryType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalOrderAmount?: number;
  expandable?: boolean;
}

export interface CartItem {
  product_id: string;
  product_name: string;
  unit_quantity: number;
  unit_price: number;
  price_currency: string;
  sub_total: number;
  quantity?: number;
  product_image?: string;
}

export interface Order {
  orderId?: string | number;
  userId?: string;
  cartItems?: CartItem[];
  totalProducts?: number;
  totalOrderAmountUSD?: number;
  totalOrderAmountARS?: number;
  status?: string;
  currencyUsedToPay?: string;
  paymentMethod?: string;
  deliveryType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalOrderAmount?: number;
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
  deliver_zone: string;
  delivery_type: string;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
}

export interface AdminData {
  users: User[];
  orders: CompletedOrder[];
}

export interface UpdateUserPayload {
  username: string;
  email: string;
  password: string;
  address: string;
  admin: boolean;
  city: string;
  completed_orders: CompletedOrder[];
  cart_items: CartItem[];
  deliver_zone: string;
  delivery_type: string;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
}
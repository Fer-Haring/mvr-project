export interface OrderResponse {
  order_id?: string;
  user_id?: string;
  cart_items?: CartItem[];
  total_products?: number;
  total_order_amount_usd?: number;
  total_order_amount_ars?: number;
  status?: string;
  currency_used_to_pay?: string;
  payment_method?: string;
  delivery_type?: string;
  delivery_cost?: number;
  created_at?: Date;
  updated_at?: Date;
  total_order_amount?: number;
  expandable?: boolean;
  user?: User;
}

export interface CartItem {
  product_id: string;
  product_name: string;
  unit_price: number;
  product_category: string;
  product_description: string;
  price_currency: string;
  sub_total: number;
  quantity: number;
  product_image?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  admin: boolean;
  city: string;
  delivery_zone: string;
  delivery_type: string;
  delivery_cost: number;
  last_name: string;
  name: string;
  payment_method: string;
  phone: string;
  preferred_currency: string;
  profile_picture: string;
}

export interface OrderRequest {
  order_id?: string;
  user_id?: string;
  cart_items?: CartItem[];
  total_products?: number;
  total_order_amount_usd?: number;
  total_order_amount_ars?: number;
  delivery_zone?: string;
  delivery_cost?: number;
  status?: string;
  currency_used_to_pay?: string;
  payment_method?: string;
  delivery_type?: string;
  created_at?: Date;
  updated_at?: Date;
  total_order_amount?: number;
  expandable?: boolean;
  user?: User;
}

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
  address: string | null;
  admin: boolean | null;
  city: string | null;
  completed_orders: string | null;
  deliver_zone: string | null;
  delivery_type: string | null;
  last_name: string;
  name: string;
  payment_method: string | null;
  phone: string | null;
  preferred_currency: string | null;
  profile_picture: string | null;
}

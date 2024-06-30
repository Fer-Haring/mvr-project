
export interface CartItem {
  product_id: string;
  product_name: string;
  unit_price: number;
  price_currency: string;
  sub_total: number;
  quantity: number;
  product_image?: string;
}

export interface CartResponse {
  product_id: string;
  product_name: string;
  unit_price: number;
  price_currency: string;
  sub_total: number;
  quantity: number;
  product_image?: string;
}
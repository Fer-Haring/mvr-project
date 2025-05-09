
export interface CartItem {
  product_id: string;
  product_name: string;
  unit_price: number;
  price_currency: string;
  product_category: string;
  product_description: string;
  sub_total: number;
  quantity: number;
  product_image?: string;
}

export interface CartResponse {
  product_id: string;
  product_name: string;
  product_category: string;
  product_description: string; 
  unit_price: number;
  price_currency: string;
  sub_total: number;
  quantity: number;
  product_image?: string;
}
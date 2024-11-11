export interface ProductsListResponse {
  products: Product[];
  limit: number;
  page: number;
  total_count: number;
}

export interface Product {
  id: string;
  currency_type: string;
  actual_stock: number;
  cost_price: number;
  description: string;
  featured: boolean;
  fraction: string;
  main_product_category: string;
  minimum_stock: number;
  price_currency: string;
  product_category: string;
  product_code: string;
  product_id: null | string;
  product_image: string;
  images_array?: string[];
  product_name: string;
  promo_price: string;
  sale_price: string;
  show_in_catalog: string;
  stock_control: string;
}

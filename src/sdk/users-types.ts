export interface User {
  userId: string;
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
  admin: boolean;
  address: string;
  cartItems: CartItem[];
  completedOrders: CompletedOrder[];
  phone: string;
  city: string;
  paymentMethod: string;
  deliveryType: string;
  deliverZone: string;
  preferredCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  productName: string;
  unitQuantity: number;
  unitPrice: number;
  priceCurrency: string;
  subTotal: number;
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

// export interface Products {
//   productName: string;
//   description: string;
//   productCategory: string;
//   productCode?: string;
//   priceCurrency: string;
//   costPrice: number;
//   salePrice: string;
//   promoPrice: number;
//   actualStock: string;
//   minimumStock: number;
//   stockControl: string;
//   showInCatalog: string;
//   destacated: string;
//   fraction: number;
//   mainProductCategory: string;
//   productId?: string;
//   productImage?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface AdminData {
  users: User[];
  orders: CompletedOrder[];
}

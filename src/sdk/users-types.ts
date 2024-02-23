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
  orderId: string;
  userId: string;
  cartItems: CartItem[];
  totalProducts: number;
  totalOrderAmount: number;
  orderDate: string;
  status: string;
  currencyUsedToPay: string;
  paymentMethod: string;
  deliveryType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompletedOrder {
  orderId: string;
  userId: string;
  cartItems: CartItem[];
  totalProducts: number;
  totalOrderAmount: number;
  orderDate: string;
  status: string;
  currencyUsedToPay: string;
  paymentMethod: string;
  deliveryType: string;
  expandable?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Products {
  actualStock: string;
  costPrice: number;
  description: string;
  destacated: string;
  fraction: number;
  minimumStock: number;
  priceCurrency: string;
  productCategory: string;
  productCode: string;
  productId: string;
  productImage: string;
  productName: string;
  promoPrice: number;
  salePrice: string;
  showInCatalog: string;
  stockControl: string;
  createdAt: Date;
  updatedAt: Date;
}



export interface AdminData {
  users: User[];
  products: Products[];
  orders: CompletedOrder[];
}

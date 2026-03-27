export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  products: { productId: string; name: string; price: number; quantity: number }[];
  totalAmount: number;
  address: string;
  createdAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

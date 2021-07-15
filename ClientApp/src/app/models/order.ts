import { Product } from "./product";


export interface SaveForOrderProduct {
  id: number;
  quantity?: number;
}


export interface Order {
  id: number;
  customerId: number;
  name: string;
  address: string;
  priceTotal: number;
  products: SaveForOrderProduct[];
}

export interface CustomerFromServer {
  id: number;
  email: string;
  password?: string;
  roleId: number;
}


export interface OrderFromServer {
  id: number;
  customer: CustomerFromServer;
  date: string;
  isCompleted: boolean;
  isValidate: boolean;
  name: string;
  address: string;
  priceTotal: number;
  products: Product[];
}


export interface UpdateOrder {
  id: number;
  customerId: number;
  name: string;
  address: string;
  priceTotal: number;
  isCompleted: boolean;
  isValidate: boolean;

  products: UpdateOrderProduct[];
}


export interface UpdateOrderProduct {
  id: number;
  quantity?: number;
  title?: string;
}

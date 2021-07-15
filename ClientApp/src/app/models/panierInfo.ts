import { Product } from "./product";

export interface PanierInfo {
  products: Product[];
  totalPrice: number;
  nbProducts: number;
}

 
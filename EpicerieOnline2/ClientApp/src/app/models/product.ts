
export interface Product {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  unit?: string;
  imageUrl?: string;
  categoryId?: number;
  ifFavorite?: boolean;
  quantity?: number;

}
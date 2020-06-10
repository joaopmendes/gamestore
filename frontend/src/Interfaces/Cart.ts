import { Product } from '.';

export type CartItem = {
  item: Product;
  quantity: number;
}
export type Cart = {
  _id: string;
  items: CartItem[];
  totalPrice: number;
}

import { Address, Cart, Order } from '.';

export type User = {
  name: string,
  email: string,
  token: string,
  admin: boolean,
  addresses: Address[];
  orders: Order[];
  cart: Cart;
}


import { Address, Cart, User } from '.';


export type Order = {
  _id: string;
  user: User;
  currentCart: Cart;
  status: string;
  mailingAddress: Address;
  billingAddress: Address;
  nif: string;
  created_at: Date;
  updated_at: Date;
}

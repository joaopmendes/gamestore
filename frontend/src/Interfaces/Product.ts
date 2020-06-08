import { Category } from '.';


export type Product = {
  _id: string,
  name: string;
  categories: Category[];
  price: number;
}

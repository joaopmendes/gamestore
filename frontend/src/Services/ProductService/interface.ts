import { Product } from '../../Interfaces';


export interface GetProductsResponse {
 products: Product[];
}
export interface CreateUpdateProduct {
 id?: string | null;
 name: string;
 price: number;
 categories: string[];
 console: string;
 productImage: any;
}

export interface RemoveProductsPayload {
 ids: string | string[]
}
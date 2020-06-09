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
}

export interface RemoveProductsPayload {
 ids: string | string[]
}
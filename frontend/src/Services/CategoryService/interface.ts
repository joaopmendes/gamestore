import { Category } from '../../Interfaces';


export interface GetCategoriesResponse {
 categories: Category[];
}
export interface RemoveCategoriesPayload {
 ids: string | string[]
}
export interface CreateUpdateCategory {
 id?: string | null,
 name: string
}

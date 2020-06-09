import { ServicesOutput } from '../../Interfaces';
import { CreateUpdateProduct, GetProductsResponse, RemoveProductsPayload } from './interface';
import axios from 'axios';
import { CreateUpdateCategory, GetCategoriesResponse, RemoveCategoriesPayload } from '../CategoryService/interface';
const ProductService = {
  getListOfProducts: async (): Promise<ServicesOutput<GetProductsResponse>> => {
    try {
      const response = await axios.get('/api/products');
      return {
        hasError: false,
        data: response?.data,
      }
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the products information.'
      };
    }
  },
  createUpdateProduct: async (payload: CreateUpdateProduct): Promise<ServicesOutput<GetProductsResponse>> => {
    try {
      const servicePayload: any = {
        ...payload
      };
      if(!payload.id) {
        delete servicePayload._id;
        delete servicePayload.id;
      }

      const response = await axios.post('/api/products', servicePayload);
      return {
        hasError: false,
        data: response.data,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'Something bad happened.'
      };
    }
  },
  removeProducts: async (payload: RemoveProductsPayload): Promise<ServicesOutput<null>> => {
    try {
      await axios.post('/api/products/delete', {ids: payload.ids});
      return {
        hasError: false,
        data: null,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to delete the product.'
      };
    }
  }
};

export default ProductService;

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
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the products information.'
      };
    }
  },
  createUpdateProduct: async (payload: CreateUpdateProduct): Promise<ServicesOutput<GetProductsResponse>> => {
    try {
      const formData = new FormData();
      if(payload.id) {
        formData.append('_id', payload.id);
      }
      formData.append('name', payload.name);
      formData.append('price', JSON.stringify(payload.price));
      formData.append('categories', JSON.stringify(payload.categories));
      formData.append('console', payload.console);
      formData.append('productImage', payload.productImage);
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
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

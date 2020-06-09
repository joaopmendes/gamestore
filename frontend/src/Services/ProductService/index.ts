import { ServicesOutput } from '../../Interfaces';
import { GetProductsResponse } from './interface';
import axios from 'axios';
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
      }
    }
  },
}

export default ProductService;

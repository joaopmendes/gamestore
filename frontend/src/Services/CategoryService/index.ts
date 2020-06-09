import { ServicesOutput } from '../../Interfaces';
import { GetCategoriesResponse } from './interface';
import axios from 'axios';
const ProductService = {
  getListOfProducts: async (): Promise<ServicesOutput<GetCategoriesResponse>> => {
    try {
      const response = await axios.get('/api/categories');
      return {
        hasError: false,
        data: response.data,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the categories information.'
      };
    }
  },
};

export default ProductService;

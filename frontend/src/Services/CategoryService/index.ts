import { ServicesOutput } from '../../Interfaces';
import { CreateUpdateCategory, GetCategoriesResponse, RemoveCategoriesPayload } from './interface';
import axios from 'axios';
const CategoryService = {
  getCategories: async (): Promise<ServicesOutput<GetCategoriesResponse>> => {
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
  createUpdateCategory: async (payload: CreateUpdateCategory): Promise<ServicesOutput<GetCategoriesResponse>> => {
    try {
      const servicePayload: any = {
        _id: payload.id,
        name: payload.name
      };
      if(!payload.id) {
        delete servicePayload._id;
      }

      const response = await axios.post('/api/categories', servicePayload);
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
  removeCategories: async (payload: RemoveCategoriesPayload): Promise<ServicesOutput<null>> => {
    try {
      await axios.post('/api/categories/delete', {ids: payload.ids});
      return {
        hasError: false,
        data: null,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the categories information.'
      };
    }
  }
};

export default CategoryService;

import { ServicesOutput } from '../../Interfaces';
import { GetUserInfoResponse, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './interface';
import axios from 'axios';
const UserService = {
  getUserInfo: async (token?:string): Promise<ServicesOutput<GetUserInfoResponse>> => {
    try {
      const customHeaders: {authorization?: string} = {};
      if(token) {
        customHeaders.authorization = `Bearer ${token}`;
      }
      const response = await axios.get('/api/users/profile', {
        headers: customHeaders
      });
      return {
        hasError: false,
        data: response?.data,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the user information.'
      };
    }
  },
  login: async (values: LoginPayload): Promise<ServicesOutput<LoginResponse>> => {
    try {
      const response = await axios.post('/api/users/login', values);
      return {
        hasError: false,
        data: response?.data,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to login.'
      };
    }
  },
  register: async (values: RegisterPayload): Promise<ServicesOutput<RegisterResponse>> => {
    try {
      const response = await axios.post('/api/users/register', values);
      return {
        hasError: false,
        data: response?.data,
      };
    } catch (e) {
      return {
        hasError: true,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to login.'
      };
    }
  }
};

export default UserService;

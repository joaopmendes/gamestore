import { ServicesOutput } from '../../Interfaces';
import { GetUserInfoResponse, LoginResponse, RegisterResponse } from './interface';
import axios from 'axios';
const UserService = {
  getUserInfo: async (): Promise<ServicesOutput<GetUserInfoResponse>> => {
    try {
      const response = await axios.get("/api/users/profile");
      return {
        hasError: false,
        data: response?.data,
        errorMessage: ''
      }
    } catch (e) {
      return {
        hasError: true,
        data: null,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to get the user information.'
      }
    }
  },
  login: async (email: string, password: string): Promise<ServicesOutput<LoginResponse>> => {
    try {
      const response = await axios.post("/api/users/login", {email, password});
      return {
        hasError: false,
        data: response?.data,
        errorMessage: ''
      }
    } catch (e) {
      return {
        hasError: true,
        data: null,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to login.'
      }
    }
  },
  register: async (name: string, email: string, password1: string, password2: string): Promise<ServicesOutput<RegisterResponse>> => {
    try {
      const response = await axios.post("/api/users/register", {name, email, password1, password2});
      return {
        hasError: false,
        data: response?.data,
        errorMessage: ''
      }
    } catch (e) {
      return {
        hasError: true,
        data: null,
        errorMessage: e?.response?.data?.errorMessage || 'It was not possible to login.'
      }
    }
  }
}

export default UserService;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../Interfaces';
import { RootState } from '../create-store.config';

interface IInitialState {
  userLoggedIn: boolean;
  user: User;
}

const initialState: IInitialState = {
  user: {
    addresses: [],
    admin: false,
    cart: {
      _id: '',
      items: [],
      totalPrice: 0,
    },
    email: '',
    name: '',
    orders: [],
    token: '',
  },
  userLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.userLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);
      return state;
    },

    logout: (state) => {
      state = initialState;
      localStorage.removeItem('token');
      return state;
    }
  },
});

export const isUserLoggedIn = (state: RootState) => state.auth.userLoggedIn;
export const isUserAdmin = (state: RootState) => state.auth.user.admin;
export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserToken = (state: RootState) => state.auth.user.token;
export const getUserAddresses = (state: RootState) => state.auth.user.addresses;
export const getUserOrders = (state: RootState) => state.auth.user.orders;
export const getUserEmail = (state: RootState) => state.auth.user.email;
export const getUserName = (state: RootState) => state.auth.user.name;
export const getUserCart = (state: RootState) => state.auth.user.cart;
export const getUserCartItemsCount = (state: RootState) => {
  const cart = state.auth.user.cart;
  let quantity = 0;
  for (const cartObject of cart.items) {
    quantity += cartObject.quantity;
  }
  return quantity;
};

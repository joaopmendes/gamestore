import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Interfaces';


interface ProductModal {
  open: boolean;
  editMode: boolean;
  editProduct: Product;
}
interface IInitialState {
  products: Product[];
  productModalOpen: ProductModal
}
const initialState: IInitialState = {
  products: [],
  productModalOpen: {
    open: false,
    editMode: false,
    editProduct: {
      _id: '',
      name: '',
      categories: [],
      price: 0,
      console: ''
    }
  }
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductsTo: (state, action: PayloadAction<Product[]>) => {
      state.products= action.payload;
      return state;
    },
    setProductModalTo:  (state, action: PayloadAction<ProductModal>) => {
      state.productModalOpen = action.payload;
      return state;
    },
  },
});


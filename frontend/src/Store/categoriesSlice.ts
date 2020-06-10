import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../create-store.config';
import { Category } from '../Interfaces';


interface CategoryModal {
  open: boolean;
  editMode: boolean;
  editCategory: Category;
}
interface IInitialState {
  categories: Category[];
  categoryModalOpen: CategoryModal
}
const initialState: IInitialState = {
  categories: [],
  categoryModalOpen: {
    open: false,
    editMode: false,
    editCategory: {
      _id: '',
      name: '',
    }
  }
};
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesTo: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      return state;
    },
    setCategoryModalTo:  (state, action: PayloadAction<CategoryModal>) => {
      state.categoryModalOpen = action.payload;
      return state;
    },
  },
});


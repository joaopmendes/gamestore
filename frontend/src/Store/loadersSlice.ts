import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../create-store.config';



const initialState: string[] = [];
export const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    addLoader: (state, action: PayloadAction<string>) => {
      const loader = state.find(load => load === action.payload);
      if(!loader) {
        state.push(action.payload);
      }
      return state;
    },
    removeLoader: (state, action: PayloadAction<string>) => {
      return state.filter(load => load !== action.payload);
    }
  },
});

export const isAnyloaderActive = ((state: RootState) => state.loaders.length > 0);

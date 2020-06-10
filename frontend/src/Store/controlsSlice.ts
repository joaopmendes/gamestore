import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../create-store.config';


interface IInitialState {
}
const initialState: IInitialState = {
};
export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
  },
});


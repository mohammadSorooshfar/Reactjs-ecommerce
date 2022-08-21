import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "types/interfaces.types";

interface IState {
  products: IProduct[];
  editedProducts: IProduct[];
  editList: number[];
}

const initialState: IState = {
  products: [],
  editedProducts: [],
  editList: [],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload;
    },
    addToEditList(state, action) {
      state.editList.push(action.payload);
    },
  },
});

export const { addProducts, addToEditList } = productsSlice.actions;
export default productsSlice.reducer;

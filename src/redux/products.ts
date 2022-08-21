import { createSlice } from "@reduxjs/toolkit";
import { IEditRow, IProduct } from "types/interfaces.types";

interface IState {
  products: IProduct[];
  editedProducts: IProduct[];
  editList: IEditRow[];
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
      state.products.push(action.payload);
    },
    addToEditList(state, action) {
      state.editList.push(action.payload);
    },
    changeEditList(state, action) {
      const index = state.editList.findIndex(
        (product) => product.id === action.payload.id
      );
      state.editList[index] = {
        ...state.editList[index],
        ...action.payload.data,
      };
    },
    deleteEditList(state) {
      state.editList = [];
    },
  },
});

export const { addProducts, addToEditList, changeEditList, deleteEditList } =
  productsSlice.actions;
export default productsSlice.reducer;

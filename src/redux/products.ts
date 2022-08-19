import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  editedProducts: [],
  editable: false,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload;
      console.log(action.payload);
    },
    editableToggle(state) {
      state.editable = !state.editable;
    },
  },
});

export const { addProducts, editableToggle } = productsSlice.actions;
export default productsSlice.reducer;

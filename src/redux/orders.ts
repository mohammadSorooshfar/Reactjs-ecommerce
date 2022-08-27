import { createSlice } from "@reduxjs/toolkit";
import { IEditRow, IOrder, IProduct } from "types/interfaces.types";

interface IState {
  orders: IOrder[];
}

const initialState: IState = {
  orders: [],
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { addOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

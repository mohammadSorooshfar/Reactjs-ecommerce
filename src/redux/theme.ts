import { createSlice } from "@reduxjs/toolkit";
import { ICart, IProduct } from "types/interfaces.types";

interface IState {
  mode: "dark" | "light";
}

const initialState: IState = {
  mode: "light",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeDark(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { changeDark } = themeSlice.actions;
export default themeSlice.reducer;

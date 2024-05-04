import { createSlice } from "@reduxjs/toolkit";
import Equipment from "../models/Equipment";

export interface CartState {
  items: Equipment[];
  isVisible: boolean;
}

const initialCartState: CartState = {
  items: [],
  isVisible: false,
};

const cartState = createSlice({
  name: "events",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const prevItem = state.items.find((i) => i._id === action.payload._id);
      if (prevItem) {
        prevItem.amount += item.amount;
        return;
      }
      state.items.push({ ...item, amount: 1 });
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items.forEach((i) => {
        if (i._id === id) i.amount--;
      });
    },
    editItem(state, action) {
      const item = action.payload;
      state.items.map((i) => {
        if (i._id === item._id) return item;
        return i;
      });
    },
    toggle(state, action) {
      if (action.payload) state.isVisible = action.payload;
      else state.isVisible = !state.isVisible;
    },
  },
});

export const cartActions = cartState.actions;
export default cartState.reducer;

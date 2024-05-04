// import redux from "redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./cart-state";

export interface IStore {
  cart: CartState;
}

const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;

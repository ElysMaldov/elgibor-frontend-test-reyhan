import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  value: number;
}

const initialState: WishlistState = {
  value: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { increment } = wishlistSlice.actions;

export const wishlistReducer = persistReducer(
  {
    key: wishlistSlice.name,
    storage,
  },
  wishlistSlice.reducer,
);

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface WishlistState {
  /**
   * Array of productId
   */
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;

export const wishlistReducer = persistReducer(
  {
    key: wishlistSlice.name,
    storage,
  },
  wishlistSlice.reducer,
);

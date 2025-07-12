import { wishlistReducer, wishlistSlice } from "@/lib/store/reducers/wishlist";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [wishlistSlice.name]: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

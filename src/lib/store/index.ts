import { fakeStoreApi } from "@/lib/store/apis/fake-store";
import {
  productReviewsReducer,
  productReviewsSlice,
} from "@/lib/store/reducers/product-reviews";
import { wishlistReducer, wishlistSlice } from "@/lib/store/reducers/wishlist";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    [wishlistSlice.name]: wishlistReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    [productReviewsSlice.name]: productReviewsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(fakeStoreApi.middleware),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

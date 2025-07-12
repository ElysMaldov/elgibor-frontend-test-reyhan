import type { UserReview } from "@/lib/types/UserReview";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface ProductReviewsState {
  reviews: Record<
    string,
    | {
        userReviews: UserReview[];
        totalReviews: number;
        averageRating: number;
      }
    | undefined
  >;
}

const initialState: ProductReviewsState = {
  reviews: {},
};

function recalculateStats(userReviews: UserReview[]) {
  const totalReviews = userReviews.length;
  const averageRating =
    totalReviews === 0
      ? 0
      : userReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalReviews;
  return { totalReviews, averageRating };
}

export const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: UserReview }>,
    ) => {
      const { productId, review } = action.payload;
      if (!state.reviews[productId]) {
        state.reviews[productId] = {
          userReviews: [],
          totalReviews: 0,
          averageRating: 0,
        };
      }
      state.reviews[productId].userReviews.push(review);
      Object.assign(
        state.reviews[productId],
        recalculateStats(state.reviews[productId].userReviews),
      );
    },
    updateReview: (
      state,
      action: PayloadAction<{
        productId: string;
        reviewId: string;
        review: Partial<UserReview>;
      }>,
    ) => {
      const { productId, reviewId, review } = action.payload;
      const product = state.reviews[productId];
      if (!product) return;
      const idx = product.userReviews.findIndex((r) => r.id === reviewId);
      if (idx === -1) return;
      product.userReviews[idx] = { ...product.userReviews[idx], ...review };
      Object.assign(product, recalculateStats(product.userReviews));
    },
    deleteReview: (
      state,
      action: PayloadAction<{ productId: string; reviewId: string }>,
    ) => {
      const { productId, reviewId } = action.payload;
      const product = state.reviews[productId];
      if (!product) return;
      product.userReviews = product.userReviews.filter(
        (r) => r.id !== reviewId,
      );
      Object.assign(product, recalculateStats(product.userReviews));
    },
    setReviews: (
      state,
      action: PayloadAction<{ productId: string; reviews: UserReview[] }>,
    ) => {
      const { productId, reviews } = action.payload;
      state.reviews[productId] = {
        userReviews: reviews,
        ...recalculateStats(reviews),
      };
    },
    clearReviews: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      delete state.reviews[productId];
    },
  },
});

export const {
  addReview,
  updateReview,
  deleteReview,
  setReviews,
  clearReviews,
} = productReviewsSlice.actions;

export const productReviewsReducer = persistReducer(
  {
    key: productReviewsSlice.name,
    storage,
  },
  productReviewsSlice.reducer,
);

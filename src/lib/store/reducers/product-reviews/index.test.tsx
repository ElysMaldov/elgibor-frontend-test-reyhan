import {
  productReviewsReducer,
  addReview,
  updateReview,
  deleteReview,
  setReviews,
  clearReviews,
} from "./index";
import type { UserReview } from "@/lib/types/UserReview";
import { configureStore } from "@reduxjs/toolkit";

describe("productReviewsSlice", () => {
  let store: ReturnType<typeof configureStore>;
  const productId = "product-1";
  const review1: UserReview = {
    id: "review-1",
    name: "Alice",
    email: "alice@email.com",
    rating: 5,
    comment: "Great!",
    date: "2024-01-01",
  };
  const review2: UserReview = {
    id: "review-2",
    name: "Bob",
    email: "bob@email.com",
    rating: 3,
    comment: "Okay",
    date: "2024-01-02",
  };

  beforeEach(() => {
    store = configureStore({
      reducer: { productReviews: productReviewsReducer },
    });
  });

  const getState = () => {
    // @ts-expect-error redux-persist returns unknown even though the store structure is correct
    return store.getState().productReviews as ReturnType<
      typeof productReviewsReducer
    >;
  };

  it("should add a review", () => {
    store.dispatch(addReview({ productId, review: review1 }));
    const state = getState();
    expect(state.reviews[productId]?.userReviews).toHaveLength(1);
    expect(state.reviews[productId]?.userReviews[0]).toMatchObject(review1);
    expect(state.reviews[productId]?.totalReviews).toBe(1);
    expect(state.reviews[productId]?.averageRating).toBe(5);
  });

  it("should update a review", () => {
    store.dispatch(addReview({ productId, review: review1 }));
    store.dispatch(
      updateReview({
        productId,
        reviewId: "review-1",
        review: { rating: 4, comment: "Good" },
      }),
    );
    const state = getState();
    expect(state.reviews[productId]?.userReviews[0].rating).toBe(4);
    expect(state.reviews[productId]?.userReviews[0].comment).toBe("Good");
    expect(state.reviews[productId]?.averageRating).toBe(4);
  });

  it("should delete a review", () => {
    store.dispatch(addReview({ productId, review: review1 }));
    store.dispatch(addReview({ productId, review: review2 }));
    store.dispatch(deleteReview({ productId, reviewId: "review-1" }));
    const state = getState();
    expect(state.reviews[productId]?.userReviews).toHaveLength(1);
    expect(state.reviews[productId]?.userReviews[0].id).toBe("review-2");
    expect(state.reviews[productId]?.totalReviews).toBe(1);
    expect(state.reviews[productId]?.averageRating).toBe(3);
  });

  it("should set reviews", () => {
    store.dispatch(setReviews({ productId, reviews: [review1, review2] }));
    const state = getState();
    expect(state.reviews[productId]?.userReviews).toHaveLength(2);
    expect(state.reviews[productId]?.totalReviews).toBe(2);
    expect(state.reviews[productId]?.averageRating).toBe(4);
  });

  it("should clear reviews", () => {
    store.dispatch(setReviews({ productId, reviews: [review1, review2] }));
    store.dispatch(clearReviews({ productId }));
    const state = getState();
    expect(state.reviews[productId]).toBeUndefined();
  });
});

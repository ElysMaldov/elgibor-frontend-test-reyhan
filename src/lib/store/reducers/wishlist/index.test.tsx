import {
  wishlistReducer,
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
} from ".";
import { configureStore } from "@reduxjs/toolkit";

describe("wishlistSlice", () => {
  let store: ReturnType<typeof configureStore>;
  const id1 = "product-1";
  const id2 = "product-2";

  beforeEach(() => {
    store = configureStore({
      reducer: { wishlist: wishlistReducer },
    });
  });

  const getState = () => {
    // @ts-expect-error redux-persist returns unknown even though the store structure is correct
    return store.getState().wishlist as ReturnType<typeof wishlistReducer>;
  };

  it("should add to wishlist", () => {
    store.dispatch(addToWishlist(id1));
    let state = getState();
    expect(state.items).toContain(id1);
    expect(state.items).toHaveLength(1);
    // Should not add duplicate
    store.dispatch(addToWishlist(id1));
    state = getState();
    expect(state.items).toHaveLength(1);
  });

  it("should remove from wishlist", () => {
    store.dispatch(addToWishlist(id1));
    store.dispatch(addToWishlist(id2));
    store.dispatch(removeFromWishlist(id1));
    const state = getState();
    expect(state.items).not.toContain(id1);
    expect(state.items).toContain(id2);
    expect(state.items).toHaveLength(1);
  });

  it("should set wishlist", () => {
    store.dispatch(setWishlist([id1, id2]));
    const state = getState();
    expect(state.items).toEqual([id1, id2]);
  });

  it("should clear wishlist", () => {
    store.dispatch(setWishlist([id1, id2]));
    store.dispatch(clearWishlist());
    const state = getState();
    expect(state.items).toEqual([]);
  });
});

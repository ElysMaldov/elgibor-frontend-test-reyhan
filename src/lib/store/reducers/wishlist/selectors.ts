import type { RootState } from "@/lib/store";

/**
 * Selector to check if a product is in the wishlist.
 * @param state Redux root state
 * @param productId Product ID to check
 * @returns true if product is in wishlist, false otherwise
 */
export const selectIsInWishlist = (
  state: RootState,
  productId: string,
): boolean => state.wishlist.items.includes(productId);

/**
 * Selector to get the entire wishlist state.
 * @param state Redux root state
 * @returns Wishlist state
 */
export const selectWishlist = (state: RootState) => state.wishlist;

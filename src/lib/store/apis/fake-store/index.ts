import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (build) => ({
    listProducts: build.query<FakeStoreProduct[], void>({
      query: () => "products",
    }),
    listCategories: build.query<string[], void>({
      query: () => "products/categories",
    }),
    getProductById: build.query<FakeStoreProduct, string>({
      query: (id) => `products/${id}`,
    }),
    listProductsInCategory: build.query<FakeStoreProduct[], string>({
      query: (category) => `products/category/${category}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductByIdQuery,
  useListProductsQuery,
  useListCategoriesQuery,
  useListProductsInCategoryQuery,
} = fakeStoreApi;

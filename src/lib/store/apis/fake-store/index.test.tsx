import { renderHook, waitFor } from "@testing-library/react";
import {
  useListProductsQuery,
  useGetProductByIdQuery,
  useListCategoriesQuery,
  useListProductsInCategoryQuery,
} from ".";
import StoreProvider from "@/lib/store/Provider";

describe("Fake Store APIs", () => {
  test("useListProductsQuery returns an array of FakeProducts", async () => {
    const { result } = renderHook(() => useListProductsQuery(), {
      wrapper: StoreProvider,
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      },
      { timeout: 5000 },
    );

    expect(result.current.isSuccess).toBe(true);

    result.current.data?.forEach((data) => {
      expect(data).toHaveProperty("category");
      expect(data).toHaveProperty("description");
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("price");
      expect(data).toHaveProperty("rating");
      expect(data).toHaveProperty("title");
      expect(data.rating).toHaveProperty("count");
      expect(data.rating).toHaveProperty("rate");
    });
  });

  test("useGetProductByIdQuery returns a single FakeProduct", async () => {
    // First, get a product id from the list
    const { result: listResult } = renderHook(() => useListProductsQuery(), {
      wrapper: StoreProvider,
    });
    await waitFor(() => {
      expect(listResult.current.isSuccess).toBe(true);
    });
    const productId = listResult.current.data?.[0]?.id;
    expect(productId).toBeDefined();

    const { result } = renderHook(
      () => useGetProductByIdQuery(productId?.toString() ?? ""),
      {
        wrapper: StoreProvider,
      },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    const data = result.current.data;
    expect(data).toHaveProperty("category");
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("id", productId);
    expect(data).toHaveProperty("image");
    expect(data).toHaveProperty("price");
    expect(data).toHaveProperty("rating");
    expect(data).toHaveProperty("title");
    expect(data?.rating).toHaveProperty("count");
    expect(data?.rating).toHaveProperty("rate");
  });

  test("useListCategoriesQuery returns an array of categories", async () => {
    const { result } = renderHook(() => useListCategoriesQuery(), {
      wrapper: StoreProvider,
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(Array.isArray(result.current.data)).toBe(true);
    result.current.data?.forEach((category) => {
      expect(typeof category).toBe("string");
    });
  });

  test("useListProductsInCategoryQuery returns products for a category", async () => {
    // First, get a category
    const { result: categoriesResult } = renderHook(
      () => useListCategoriesQuery(),
      {
        wrapper: StoreProvider,
      },
    );
    await waitFor(() => {
      expect(categoriesResult.current.isSuccess).toBe(true);
    });
    const category = categoriesResult.current.data?.[0];
    expect(category).toBeDefined();

    const { result } = renderHook(
      () => useListProductsInCategoryQuery(category ?? ""),
      {
        wrapper: StoreProvider,
      },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(Array.isArray(result.current.data)).toBe(true);
    result.current.data?.forEach((data) => {
      expect(data).toHaveProperty("category", category);
      expect(data).toHaveProperty("description");
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("price");
      expect(data).toHaveProperty("rating");
      expect(data).toHaveProperty("title");
      expect(data.rating).toHaveProperty("count");
      expect(data.rating).toHaveProperty("rate");
    });
  });
});

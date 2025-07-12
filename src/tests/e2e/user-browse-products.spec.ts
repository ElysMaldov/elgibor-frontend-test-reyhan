import { test, expect } from "@playwright/test";

test("User can see all products", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByTestId("list-products")).toBeVisible();

  const items = page.getByTestId("list-products").locator("li");
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
});

test("User can query products based on name", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByTestId("searchbar").click();
  await page.getByTestId("searchbar").fill("Slim");

  await expect(page.getByTestId("list-products")).toContainText(
    "Mens Casual Premium Slim Fit T-Shirts",
  );
  await expect(page.getByTestId("list-products")).toContainText(
    "Mens Casual Slim Fit",
  );

  // Expect to have ?q=Slim
  await expect(page).toHaveURL(/[?&]q=Slim/);
});

test("User can query products based on categories", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "jewelery" }).click();
  await page.getByRole("button", { name: "women's clothing" }).click();
  await expect(page.getByTestId("list-products")).toContainText("jewelery");
  await expect(page.getByTestId("list-products")).toContainText(
    "women's clothing",
  );

  // Expect to have ?categories=jewelery,women%27s+clothing
  const url = page.url();
  expect(url).toMatch(/[?&]categories=jewelery,women%27s\+clothing/);
});

test("User can query products based on name and categories", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.getByTestId("searchbar").click();
  await page.getByTestId("searchbar").fill("mens casual slim fit");
  await page.getByTestId("category-filter-men's clothing").click();

  await expect(page.getByTestId("list-products")).toContainText(
    "Mens Casual Slim Fit",
  );
  await expect(page.getByTestId("list-products")).toContainText(
    "men's clothing",
  );

  // Expect to have both categories and q parameters, regardless of order
  const url = page.url();
  expect(
    /[?&]categories=([^&]+)&q=([^&]+)/.test(url) ||
      /[?&]q=([^&]+)&categories=([^&]+)/.test(url),
  ).toBe(true);
});

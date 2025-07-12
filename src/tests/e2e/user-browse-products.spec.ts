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
});

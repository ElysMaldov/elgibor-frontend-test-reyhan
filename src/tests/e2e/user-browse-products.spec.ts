import { test, expect } from "@playwright/test";

test("User can see all products", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByTestId("list-products")).toBeVisible();

  const items = page.getByTestId("list-products").locator("li");
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
});

import { test, expect } from "@playwright/test";

test("User can see a product's detail", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByTestId("searchbar").click();
  await page.getByTestId("searchbar").fill("Fjallraven");
  await page.getByRole("link", { name: "men's clothing $109.95 0" }).click();

  // expect /product/:id
  await expect(page).toHaveURL(/\/product\/\d+/);

  await expect(page.locator("h1")).toContainText(
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  );

  await expect(
    page.getByRole("button", { name: "Add to Wishlist" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Fjallraven - Foldsack No. 1" }),
  ).toBeVisible();
  await expect(
    page.getByText("Customer Reviews0.0(0 reviews)Write a Review"),
  ).toBeVisible();
});

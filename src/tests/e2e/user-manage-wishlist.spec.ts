import { test, expect } from "@playwright/test";

test("User can add a product into wishlist", async ({ page }) => {
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

  await page.getByRole("button", { name: "Add to Wishlist" }).click();
  await expect(
    page.getByLabel("Notifications alt+T").getByRole("listitem"),
  ).toContainText("Product added to your wishlist");
  await expect(page.getByRole("main")).toContainText("In Wishlist");
});

test("User can remove a product from wishlist in details page", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.getByTestId("searchbar").click();
  await page.getByTestId("searchbar").fill("Fjallraven");
  await page.getByRole("link", { name: "men's clothing $109.95 0" }).click();

  // expect /product/:id
  await expect(page).toHaveURL(/\/product\/\d+/);

  await expect(page.locator("h1")).toContainText(
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  );

  const addToWishlistButton = page.getByRole("button", {
    name: "Add to Wishlist",
  });
  const removeFromWishlistButton = page.getByRole("button", {
    name: "In Wishlist",
  });

  if (addToWishlistButton) {
    await expect(addToWishlistButton).toBeVisible();

    await page.getByRole("button", { name: "Add to Wishlist" }).click();
    await expect(
      page.getByLabel("Notifications alt+T").getByRole("listitem"),
    ).toContainText("Product added to your wishlist");
    await expect(page.getByRole("main")).toContainText("In Wishlist");

    await page.getByRole("button", { name: "In Wishlist" }).click();
  } else if (removeFromWishlistButton) {
    await expect(removeFromWishlistButton).toBeVisible();

    await page.getByRole("button", { name: "In Wishlist" }).click();

    await expect(page.getByRole("main")).not.toContainText("In Wishlist");
  }
});

import AppLayout from "@/components/layouts/AppLayout";
import ProductCataloguePage from "@/components/pages/ProductCataloguePage";
import ProductDetailsPage from "@/components/pages/ProductDetailsPage";
import WishlistPage from "@/components/pages/WishlistPage";
import NotFound from "@/components/utils/errors/NotFound";
import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router";

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<ProductCataloguePage />}
        />

        <Route
          path="wishlist"
          element={<WishlistPage />}
        />

        <Route path="product">
          <Route
            path=":productId"
            element={<ProductDetailsPage />}
          />

          <Route
            path="*"
            element={<NotFound />}
            index
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;

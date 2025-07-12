import AppLayout from "@/components/layouts/AppLayout";
import ProductCataloguePage from "@/components/pages/ProductCataloguePage";
import ProductDetailsPage from "@/components/pages/ProductDetailsPage";
import NotFound from "@/components/utils/errors/NotFound";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<ProductCataloguePage />}
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

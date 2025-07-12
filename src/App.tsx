import AppLayout from "@/components/layouts/AppLayout";
import ProductCataloguePage from "@/components/pages/ProductCataloguePage";
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

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;

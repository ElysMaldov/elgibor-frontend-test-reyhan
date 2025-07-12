import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/shadcn/button";
import NotFound from "@/components/utils/NotFound";
import type { RootState } from "@/lib/store";
import { increment } from "@/lib/store/reducers/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";

function App() {
  const count = useSelector((state: RootState) => state.wishlist.value);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <Button onClick={() => dispatch(increment())}>{count}</Button>
          }
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

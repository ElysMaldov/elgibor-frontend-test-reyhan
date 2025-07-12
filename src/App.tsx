import { Button } from "@/components/ui/shadcn/button";
import { Route, Routes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { increment } from "@/lib/store/reducers/wishlist";

function App() {
  const count = useSelector((state: RootState) => state.wishlist.value);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route
        index
        element={<Button onClick={() => dispatch(increment())}>{count}</Button>}
      />
    </Routes>
  );
}

export default App;

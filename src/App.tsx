import { Button } from "@/components/ui/shadcn/button";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route
        index
        element={<Button>Click Me</Button>}
      />
    </Routes>
  );
}

export default App;

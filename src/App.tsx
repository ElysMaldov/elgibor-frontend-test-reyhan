import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route
        index
        element={<p className="bg-amber-500 text-8xl">Home</p>}
      />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        index
        element={<p>Home</p>}
      />
    </Routes>
  );
}

export default App;

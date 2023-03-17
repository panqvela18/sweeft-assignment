import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import AnimalsPage from "./Pages/AnimalsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/animals/:id" element={<AnimalsPage />} />
    </Routes>
  );
}

export default App;

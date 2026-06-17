import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Work from "./pages/work";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
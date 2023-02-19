// #region Imports

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Light from "./pages/Light";

// #endregion

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/light" element={<Light />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

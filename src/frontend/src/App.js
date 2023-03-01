// #region Imports

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Light from "./pages/Light";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Styles
import global from "./assets/css/global.css";

// #endregion

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/light" element={<Light />} />
          </Routes>
        </div>
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;

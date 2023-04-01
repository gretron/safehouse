// #region Imports

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Light from "./pages/Light";

// Components
import Navbar from "./components/Navbar";

// Styles
import global from "./assets/css/global.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// #endregion

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";
import { MqttContextProvider } from "./contexts/MqttContext";
import { MqttProvider } from "./contexts/MqttContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MqttProvider>
        <App />
      </MqttProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

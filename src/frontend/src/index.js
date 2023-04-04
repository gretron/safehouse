import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";
import { MqttContextProvider } from "./contexts/MqttContext";
import { MqttProvider } from "./contexts/MqttContext";
import { SettingsContextProvider } from "./contexts/SettingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingsContextProvider>
        <MqttProvider>
          <App />
        </MqttProvider>
      </SettingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// Hooks
import { createContext, useReducer, useEffect } from "react";

export const MqttContext = createContext();

export const mqttReducer = (state, action) => {
  switch (action.type) {
    case "CONNECT":
      return { client: action.payload, message: state.message };
    case "LIGHT":
      let value;

      if (action.payload == "1" || action.payload == "0") {
        value = action.payload;
      } else {
        value = state.light;
      }

      return { ...state, light: value };
    case "HUMIDITY":
      return { ...state, humidity: action.payload };
    case "TEMPERATURE":
      return { ...state, temperature: action.payload };
    case "FAN":
      return { ...state, fan: action.payload };
    case "DISCONNECT":
      return { client: null };
    default:
      return state;
  }
};

export const MqttContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mqttReducer, {
    client: null,
    light: 0,
    humidity: 0,
    temperature: 0,
    fan: 0,
  });

  return (
    <MqttContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MqttContext.Provider>
  );
};

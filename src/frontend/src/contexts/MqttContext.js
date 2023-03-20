// Hooks
import { createContext, useReducer, useEffect } from "react";
import { useMqtt } from "../hooks/useMqtt";

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
    case "DISCONNECT":
      return { client: null };
    default:
      return state;
  }
};

export const MqttContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mqttReducer, {
    client: null,
    light: null,
  });

  return (
    <MqttContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MqttContext.Provider>
  );
};

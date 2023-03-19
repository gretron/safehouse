import { createContext, useReducer, useEffect } from "react";

export const MqttContext = createContext();

export const mqttReducer = (state, action) => {
  switch (action.type) {
    case "CONNECT":
      return { client: action.payload };
    case "DISCONNECT":
      return { client: null };
    default:
      return state;
  }
};

export const MqttContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mqttReducer, { client: null });

  useEffect(() => {
    // TODO Connect to Mqtt

    if (user) {
      dispatch({ type: "CONNECT", payload: client });
    }
  }, []);

  console.log("AuthContext State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useReducer } from "react";

export const SettingsContext = createContext();

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { settings: action.payload };
    case "PUT":
      return { settings: action.payload };
    default:
      return state;
  }
};

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, { settings: null });

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

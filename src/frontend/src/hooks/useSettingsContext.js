import { SettingsContext } from "../contexts/SettingsContext";
import { useContext } from "react";

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw Error(
      "useSettingsContext Must Be Used Inside ExerciseContextProvider"
    );
  }

  return context;
};

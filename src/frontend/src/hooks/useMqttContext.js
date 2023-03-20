import { MqttContext } from "../contexts/MqttContext";
import { useContext } from "react";

export const useMqttContext = () => {
  const context = useContext(MqttContext);

  if (!context) {
    throw Error("useMqttContext must be used inside of MqttContextProvider.");
  }

  return context;
};

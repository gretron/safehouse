import { useState } from "react";
import { useMqttContext } from "./useMqttContext";
import { Client, Message } from "paho-mqtt";

export const useMqtt = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useMqttContext();

  const connect = async (user) => {
    const options = {
      hostname: process.env.REACT_APP_MQTT_HOST,
      port: process.env.REACT_APP_MQTT_PORT,
      username: user.token,
      password: "any",
    };

    const clientID = "mqttjs_" + Math.random().toString(16).substr(2, 8);

    const mqttClient = new Client(
      process.env.REACT_APP_MQTT_HOST,
      parseInt(process.env.REACT_APP_MQTT_PORT),
      clientID
    );

    mqttClient.connect({
      onSuccess: () => {
        console.log("Connected to MQTT broker");

        mqttClient.subscribe("safehouse/light");
        mqttClient.subscribe("safehouse/temperature");
        mqttClient.subscribe("safehouse/humidity");
        mqttClient.subscribe("safehouse/fan");

        dispatch({ type: "CONNECT", payload: mqttClient });
      },
      onFailure: (responseObject) => {
        console.log(`Failed to connect: ${responseObject.errorMessage}`);
      },
      useSSL: false,
      userName: user.token,
      password: "any",
      reconnect: true,
    });

    mqttClient.onMessageArrived = (message) => {
      console.log(message);

      switch (message.destinationName) {
        case "safehouse/light":
          dispatch({ type: "LIGHT", payload: message.payloadString });
          break;
        case "safehouse/humidity":
          dispatch({ type: "HUMIDITY", payload: message.payloadString });
          break;
        case "safehouse/temperature":
          dispatch({ type: "TEMPERATURE", payload: message.payloadString });
          break;
        case "safehouse/fan":
          dispatch({ type: "FAN", payload: message.payloadString });
          break;
        default:
      }
    };
  };

  return { connect };
};

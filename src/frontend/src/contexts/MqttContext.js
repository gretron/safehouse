import { createContext, useContext, useState, useEffect } from "react";
import { Client } from "paho-mqtt";
import { useAuthContext } from "../hooks/useAuthContext";
import EventEmitter from "events";

const emitter = new EventEmitter();

const MqttContext = createContext();

/**
 * Hook to Access Mqtt Client Functionality
 * @returns Mqtt Client Members and Methods
 */
export const useMqtt = () => {
  const context = useContext(MqttContext);
  const client = context.client;
  const connect = context.connect;
  const subscribe = context.subscribe;
  const unsubscribe = context.unsubscribe;

  if (!context) {
    throw Error("useMqttClient must be used inside of MqttContextProvider.");
  }

  return { client, connect, subscribe, unsubscribe };
};

export const MqttProvider = ({ children }) => {
  const [mqttClient, setMqttClient] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!mqttClient) {
      return;
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("Connection lost:", responseObject.errorMessage);
      }
    }

    mqttClient.onConnectionLost = onConnectionLost;

    return () => {
      mqttClient.disconnect();
    };
  }, [mqttClient]);

  function onMessageArrived(message) {
    emitter.emit(message.topic, message.payloadString);
  }

  /**
   * Subscribe to Mqtt Topic
   * @param {string} event Name of Event
   * @param {function} callback Function Called On Event Raised
   */
  function subscribe(event, callback) {
    if (!mqttClient) return;

    mqttClient.subscribe(event);
    emitter.addListener(event, callback);
  }

  /**
   * Unsubscribe to Mqtt Topic
   * @param {string} event Name of Event
   * @param {function} callback Function Called On Event Raised
   */
  function unsubscribe(event, callback) {
    if (!mqttClient) return;

    mqttClient.unsubscribe(event);
    emitter.removeListener(event, callback);
  }

  function connect() {
    if (mqttClient) {
      mqttClient.disconnect();
      setMqttClient(null);
    }

    const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);

    const newClient = new Client(
      process.env.REACT_APP_MQTT_HOST,
      parseInt(process.env.REACT_APP_MQTT_PORT),
      clientId
    );

    newClient.connect({
      userName: user.token,
      password: "any",
      useSSL: false,
      reconnect: true,
      onSuccess: function () {
        console.log("Connected to MQTT broker (MqttClientContext)");
        setMqttClient(newClient);

        newClient.onMessageArrived = onMessageArrived;
      },
      onFailure: function (errorMessage) {
        console.log("Failed to connect to MQTT broker:", errorMessage);
      },
    });
  }

  return (
    <MqttContext.Provider
      value={{ client: mqttClient, connect, subscribe, unsubscribe }}
    >
      {children}
    </MqttContext.Provider>
  );
};

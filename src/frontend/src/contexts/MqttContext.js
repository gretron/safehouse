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
  const publish = context.publish;
  const subscribe = context.subscribe;
  const unsubscribe = context.unsubscribe;

  if (!context) {
    throw Error("useMqttClient must be used inside of MqttContextProvider.");
  }

  return { client, connect, publish, subscribe, unsubscribe };
};

/**
 * Mqtt Context Provider
 */
export const MqttProvider = ({ children }) => {
  const [mqttClient, setMqttClient] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!mqttClient) {
      return;
    }

    /**
     * Handler for Mqtt Client Connection Lost
     * @param {object} res Response of Connection Lost
     */
    function onConnectionLost(res) {
      if (res.errorCode !== 0) {
        console.log("Connection lost:", res.errorMessage);
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
   * Publish Message to Mqtt Topic
   * @param {string} topic Topic to Publish to
   * @param {string} message Message to Send to Topic
   * @param {int} qos QoS of Message
   * @param {boolean} retain Retain Message in Topic
   */
  function publish(topic, message, qos = 0, retain = false) {
    if (!mqttClient) return;

    mqttClient.publish(topic, message, qos, retain);
  }

  /**
   * Subscribe to Mqtt Topic
   * @param {string} event Name of Topic
   * @param {function} callback Function Called On Event Raised
   */
  function subscribe(event, callback) {
    if (!mqttClient) return;

    mqttClient.subscribe(event);
    emitter.addListener(event, callback);
  }

  /**
   * Unsubscribe to Mqtt Topic
   * @param {string} event Name of Topic
   * @param {function} callback Function Called On Event Raised
   */
  function unsubscribe(event, callback) {
    if (!mqttClient) return;

    mqttClient.unsubscribe(event);
    emitter.removeListener(event, callback);
  }

  /**
   * Connect to Mqtt Broker
   */
  function connect() {
    if (mqttClient) {
      mqttClient.disconnect();
      setMqttClient(null);
    }

    // Generate Random Client Token
    const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);

    // Connect to Mqtt Client with Credentials
    const newClient = new Client(
      process.env.REACT_APP_MQTT_HOST,
      parseInt(process.env.REACT_APP_MQTT_PORT),
      clientId
    );

    newClient.connect({
      userName: /*user.token*/ "any",
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
      value={{ client: mqttClient, connect, publish, subscribe, unsubscribe }}
    >
      {children}
    </MqttContext.Provider>
  );
};

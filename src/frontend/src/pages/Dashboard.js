// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import GaugeChart from "react-gauge-chart";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  useMqttClient,
  useMqttConnect,
  useMqttSubscribe,
  useMqttUnsubscribe,
} from "../contexts/MqttContext";

import { ReactComponent as Light } from "../assets/img/light.svg";

import { ReactComponent as LightOn } from "../assets/img/light-on.svg";
import { ReactComponent as LightOff } from "../assets/img/light-off.svg";

import { ReactComponent as FanOn } from "../assets/img/fan-on.svg";
import { ReactComponent as FanOff } from "../assets/img/fan-off.svg";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const mqttClient = useMqttClient();
  const connect = useMqttConnect();

  useState(() => {
    if (!mqttClient) connect();
  }, [mqttClient]);

  return (
    <div className="dashboard">
      {/*<LightWidget />
      <FanWidget />*/}
      <HumidityGauge />
      <TemperatureGauge />
    </div>
  );
};

const TemperatureGauge = () => {
  const [temperature, setTemperature] = useState(0);
  const mqttClient = useMqttClient();
  const subscribe = useMqttSubscribe();
  const unsubscribe = useMqttUnsubscribe();

  const onTemperatureReceived = (string) => {
    setTemperature(parseFloat(string));
    console.log("Temperature: ", string);
  };

  useEffect(() => {
    if (mqttClient) {
      subscribe("safehouse/temperature", onTemperatureReceived);
    }

    return () => {
      if (mqttClient) {
        unsubscribe("safehouse/temperature", onTemperatureReceived);
      }
    };
  }, [mqttClient]);

  return (
    <GaugeChart
      id="gauge--2"
      percent={temperature / 100}
      formatTextValue={(value) => value + "°C"}
      nrOfLevels={16}
    />
  );
};

const HumidityGauge = () => {
  const [humidity, setHumidity] = useState(0);
  const mqttClient = useMqttClient();
  const subscribe = useMqttSubscribe();
  const unsubscribe = useMqttUnsubscribe();

  const onHumidityReceived = (string) => {
    setHumidity(parseFloat(string));
    console.log("Humidity: ", string);
  };

  useEffect(() => {
    if (mqttClient) {
      subscribe("safehouse/humidity", onHumidityReceived);
    }

    return () => {
      if (mqttClient) {
        unsubscribe("safehouse/humidity", onHumidityReceived);
      }
    };
  }, [mqttClient]);

  return (
    <GaugeChart
      id="gauge--1"
      percent={humidity / 100}
      nrOfLevels={1}
      colors={["#3477eb"]}
    />
  );
};

/**
 * Widget for Light Electrical Component
 */
/*
const LightWidget = () => {
  const { client, light } = useMqttContext();

  const handleClick = async () => {
    client.publish(
      "safehouse/light",
      light ? (light == "1" ? "0" : "1") : "1",
      0,
      true
    );
  };

  return (
    <div className="light-widget">
      <button
        className={light == "1" ? "light-widget--active" : ""}
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={() => handleClick()}
      >
        {light == 1 ? <LightOn /> : <LightOff />}
      </button>
    </div>
  );
};
*/
/*
const FanWidget = () => {
  const { client, fan } = useMqttContext();

  const handleClick = async () => {
    client.publish(
      "safehouse/fan",
      fan ? (fan == "1" ? "0" : "1") : "1",
      0,
      true
    );
  };

  return (
    <div className="light-widget">
      <button
        className={fan == "1" ? "light-widget--active" : ""}
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={() => handleClick()}
      >
        {fan == 1 ? <FanOn /> : <FanOff />}
      </button>
    </div>
  );
};
*/

export default Dashboard;

// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import GaugeChart from "react-gauge-chart";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMqtt } from "../contexts/MqttContext";

import { ReactComponent as Light } from "../assets/img/light.svg";

import { ReactComponent as LightOn } from "../assets/img/light-on.svg";
import { ReactComponent as LightOff } from "../assets/img/light-off.svg";

import { ReactComponent as FanOn } from "../assets/img/fan-on.svg";
import { ReactComponent as FanOff } from "../assets/img/fan-off.svg";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { client, connect } = useMqtt();

  useState(() => {
    if (!client) connect();
  }, [client]);

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
  const { client, subscribe, unsubscribe } = useMqtt();

  const onTemperatureReceived = (string) => {
    setTemperature(parseFloat(string));
    console.log("Temperature: ", string);
  };

  useEffect(() => {
    subscribe("safehouse/temperature", onTemperatureReceived);

    return () => {
      unsubscribe("safehouse/temperature", onTemperatureReceived);
    };
  }, [client]);

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
  const { client, subscribe, unsubscribe } = useMqtt();

  const onHumidityReceived = (string) => {
    setHumidity(parseFloat(string));
    console.log("Humidity: ", string);
  };

  useEffect(() => {
    subscribe("safehouse/humidity", onHumidityReceived);

    return () => {
      unsubscribe("safehouse/humidity", onHumidityReceived);
    };
  }, [client]);

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

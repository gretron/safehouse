// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import GaugeChart from "react-gauge-chart";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMqtt } from "../contexts/MqttContext";
import Sidebar from "../components/Sidebar";

import { ReactComponent as Light } from "../assets/img/light.svg";

import { ReactComponent as LightOn } from "../assets/img/light-on.svg";
import { ReactComponent as LightOff } from "../assets/img/light-off.svg";

import { ReactComponent as FanOn } from "../assets/img/fan-on.svg";
import { ReactComponent as FanOff } from "../assets/img/fan-off.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { client, connect } = useMqtt();

  useState(() => {
    if (!client) connect();
  }, [client]);

  const notify = () => toast("Wow so easy!");

  return (
    <>
      <div className="dashboard">
        <LightWidget />
        <FanWidget />
        <HumidityGauge />
        <TemperatureGauge />
        {/*<button onClick={notify}>Try</button>*/}
        <ToastContainer />
      </div>
      <Sidebar />
    </>
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
      className="gauge"
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
      className="gauge"
      percent={humidity / 100}
      nrOfLevels={1}
      colors={["#3477eb"]}
    />
  );
};

/**
 * Widget for Light Electrical Component
 */
const LightWidget = () => {
  const [light, setLight] = useState(0);
  const { client, publish, subscribe, unsubscribe } = useMqtt();

  const onLightReceived = (string) => {
    setLight(parseInt(string));
  };

  useEffect(() => {
    subscribe("safehouse/light", onLightReceived);

    return () => {
      unsubscribe("safehouse/light", onLightReceived);
    };
  }, [client]);

  const handleClick = async () => {
    publish(
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
        onClick={handleClick}
      >
        {light == 1 ? <LightOn /> : <LightOff />}
      </button>
    </div>
  );
};

/**
 * Widget for Fan Electrical Component
 */
const FanWidget = () => {
  const [fan, setFan] = useState(0);
  const { client, publish, subscribe, unsubscribe } = useMqtt();

  const onFanReceived = (string) => {
    setFan(parseInt(string));
  };

  useEffect(() => {
    subscribe("safehouse/fan", onFanReceived);

    return () => {
      unsubscribe("safehouse/fan", onFanReceived);
    };
  }, [client]);

  const handleClick = async () => {
    publish("safehouse/fan", fan ? (fan == "1" ? "0" : "1") : "1", 0, true);
  };

  return (
    <div className="light-widget">
      <button
        className={fan == "1" ? "light-widget--active" : ""}
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={handleClick}
      >
        {fan == 1 ? <FanOn /> : <FanOff />}
      </button>
    </div>
  );
};

export default Dashboard;

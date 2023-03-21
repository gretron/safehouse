// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import GaugeChart from "react-gauge-chart";
import { useMqttContext } from "../hooks/useMqttContext";
import { useState, useRef } from "react";
import { useMqtt } from "../hooks/useMqtt";
import { useAuthContext } from "../hooks/useAuthContext";

import light from "../assets/img/light.svg";
import { ReactComponent as Light } from "../assets/img/light.svg";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { user } = useAuthContext();
  const { connect } = useMqtt();
  const { humidity, temperature } = useMqttContext();

  const loaded = useRef(false);

  useState(() => {
    if (loaded.current) return;

    loaded.current = true;

    console.log("renders");

    connect(user);
  }, []);

  return (
    <div className="dashboard">
      <LightWidget />
      <GaugeChart
        id="gauge--1"
        animate={false}
        percent={Number(humidity) / 100}
        nrOfLevels={1}
        colors={["#3477eb"]}
      />
      <GaugeChart
        id="gauge--2"
        animate={false}
        percent={Number(temperature) / 100}
        formatTextValue={(value) => value + "°C"}
        nrOfLevels={16}
      />
    </div>
  );
};

/**
 * Widget for Light Electrical Component
 */
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
        <Light />
      </button>
    </div>
  );
};

export default Dashboard;

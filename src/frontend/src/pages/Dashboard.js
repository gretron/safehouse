// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import LightWidget from "../components/LightWidget";
import GaugeChart from "react-gauge-chart";
import { useSubscription } from "../hooks/useSubscription";
import { useMqttContext } from "../hooks/useMqttContext";
import { useState, useRef } from "react";
import { useMqtt } from "../hooks/useMqtt";
import { useAuthContext } from "../hooks/useAuthContext";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { user } = useAuthContext();
  const { connect } = useMqtt();
  const loaded = useRef(false);

  useState(() => {
    if (loaded.current) return;

    loaded.current = true;

    console.log("renders");

    connect(user);
  }, []);

  return (
    <div className="dashboard">
      <LightIndicator />
      <GaugeChart id="gauge--1" />
    </div>
  );
};

const LightIndicator = () => {
  const { client, light } = useMqttContext();

  return (
    <div>
      {light}
      <button
        onClick={(e) => {
          client.publish(
            "safehouse/light",
            light ? (light == "1" ? "0" : "1") : "1",
            0,
            true
          );
        }}
      >
        turn on off
      </button>
    </div>
  );
};

export default Dashboard;

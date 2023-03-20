// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import LightWidget from "../components/LightWidget";
import GaugeChart from "react-gauge-chart";
import { useSubscription } from "../hooks/useSubscription";
import { useMqttContext } from "../hooks/useMqttContext";
import { useState } from "react";
import { useMqtt } from "../hooks/useMqtt";
import { useAuthContext } from "../hooks/useAuthContext";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { user } = useAuthContext();
  const { client, light } = useMqttContext();
  const { connect } = useMqtt();

  useState(() => {
    connect(user);
  }, []);

  return (
    <div className="dashboard">
      {light}
      <GaugeChart id="gauge--1" />
      <button
        onClick={(e) => {
          client.publish(
            "safehouse/light",
            light ? (light == "1" ? "0" : "1") : "1"
          );
        }}
      >
        turn on off
      </button>
    </div>
  );
};

export default Dashboard;

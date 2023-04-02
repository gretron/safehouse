// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import GaugeChart from "react-gauge-chart";
import Thermometer from "react-thermometer-component";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMqtt } from "../contexts/MqttContext";
import Sidebar from "../components/Sidebar";
import LightWidget from "../components/LightWidget";
import FanWidget from "../components/FanWidget";
import TemperatureWidget from "../components/TemperatureWidget";
import LightIntensityWidget from "../components/LightIntensityWidget";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HumidityWidget from "../components/HumidityWidget";

/**
 * Dashboard Page
 */
function Dashboard() {
  const { client, connect } = useMqtt();

  const ref = useRef();
  const view = useRef();

  useState(() => {
    // if (!client) connect();
  }, [client]);

  const notify = () => toast("Wow so easy!");

  return (
    <>
      <div ref={ref} className="dashboard">
        {/*<LightWidget />*/}
        <LightWidget view={view} />
        <FanWidget />
        <HumidityWidget />
        <TemperatureWidget />
        <LightIntensityWidget />
        {/*<button onClick={notify}>Try</button>*/}
        <ToastContainer />
      </div>
      <Sidebar />
    </>
  );
}

export default Dashboard;

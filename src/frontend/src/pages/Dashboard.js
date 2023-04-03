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
  const { client, connect, subscribe, unsubscribe } = useMqtt();

  const ref = useRef();
  const view = useRef();

  useEffect(() => {
    if (!client) connect();
    console.log("Connecting")
  }, [client]);

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
      </div>
      <Notification />
      <Sidebar />
    </>
  );
}

const Notification = () => {
  const { client, subscribe, unsubscribe } = useMqtt();

  const onNotificationReceived = (string) => {
    toast(string, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    subscribe("safehouse/notification", onNotificationReceived);

    return () => {
      unsubscribe("safehouse/notification", onNotificationReceived);
    };
  }, [client]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Dashboard;

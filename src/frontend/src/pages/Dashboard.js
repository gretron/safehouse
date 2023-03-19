// Styles
import dashboard from "../assets/css/dashboard.css";

// Components
import LightWidget from "../components/LightWidget";
import GaugeChart from "react-gauge-chart";

/**
 * Dashboard Page
 */
const Dashboard = () => {
  return (
    <div className="dashboard">
      <LightWidget />
      <GaugeChart id="gauge--1" />
    </div>
  );
};

export default Dashboard;

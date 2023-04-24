// Styling
import thresholdSidebar from "../assets/css/sidebar.css";

// Components
import { ReactComponent as Temperature } from "../assets/img/temperature.svg";
import { ReactComponent as Light } from "../assets/img/light_icon.svg";

// Hooks
import { useState, useEffect } from "react";

const mockThresholds = {
  temperature_threshold: 25,
  light_threshold: 400,
};

function ThresholdSidebar() {
  const [thresholds, setThresholds] = useState({
    temperature_threshold: 0,
    light_threshold: 0,
  });

  const onThresholdReceived = (string) => {
      const { temperature_threshold, light_threshold } = JSON.parse(string);
      setThresholds({ temperature_threshold, light_threshold });
  };

  // useEffect(() => {
  //   subscribe("safehouse/threshold", onThresholdReceived);
  //   return () => {
  //   unsubscribe("safehouse/threshold", onThresholdReceived);
  //   };
  // }, [client]);

  useEffect(() => {
    onThresholdReceived(JSON.stringify(mockThresholds));
  }, []);

  return (
    <div className="thresholds">
      <div className="temperature_threshold">
        Temperature: <Temperature className="temperature" />
        {thresholds.temperature_threshold}°C
      </div>
      <div className="light_threshold">
        Light: <Light className="light" />
        {thresholds.light_threshold} Ω
      </div>
    </div>
  );
}

export default ThresholdSidebar;



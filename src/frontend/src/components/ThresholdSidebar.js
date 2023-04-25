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
      <div className="thresholds__label">Thresholds</div>
      <div className="threshold">
        <div>Temperature</div> 
        <Temperature className="temperature" />
        <div className="threshold__value">{thresholds.temperature_threshold}°C</div>
      </div>
      <div className="threshold">
        <div>Light</div> 
        <Light className="light" />
        <div className="threshold__value">{thresholds.light_threshold} Ω</div>
      </div>
    </div>
  );
}

export default ThresholdSidebar;



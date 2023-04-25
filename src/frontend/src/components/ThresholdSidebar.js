// Styling
import thresholdSidebar from "../assets/css/sidebar.css";

// Components
import { ReactComponent as Temperature } from "../assets/img/temperature.svg";
import { ReactComponent as Light } from "../assets/img/light_icon.svg";

// Hooks
import { useState, useEffect } from "react";
import { useMqtt } from "../contexts/MqttContext";

const mockThresholds = {
  temperature_threshold: 25,
  light_threshold: 400,
};

function ThresholdSidebar() {
  const { client, connect, subscribe, unsubscribe } = useMqtt();


  const [thresholds, setThresholds] = useState({
    temperature_threshold: 0,
    light_threshold: 0,
  });

  const onThresholdsReceived = (string) => {
      const { temperature_threshold, light_intensity_threshold } = JSON.parse(string);
      setThresholds({ temperature_threshold, light_intensity_threshold });
  };

  useEffect(() => {
    subscribe("safehouse/thresholds", onThresholdsReceived);

    return () => {
      unsubscribe("safehouse/thresholds", onThresholdsReceived);
    };
  }, [client]);

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
        <div className="threshold__value">{thresholds.light_intensity_threshold} Ω</div>
      </div>
    </div>
  );
}

export default ThresholdSidebar;



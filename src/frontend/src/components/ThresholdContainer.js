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

function Threshold({ label, value, min, max, unit }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const rangeSize = max - min;
    setPercentage(((value - min) / rangeSize) * 100);
  }, [value]);

  return (
    <div className="threshold">
      <div className="threshold__label">{label}</div>
      <div
        className="threshold__value"
        style={{
          transform: `translateX(calc(${percentage}% - calc(min(1.5rem, 1.5vw))))`,
        }}
      >
        {value}
        {unit}
      </div>
      <div className="threshold__container">
        <div
          className="threshold__fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="threshold__ranges">
        <div className="threshold__range">{min}</div>
        <div className="threshold__range">{max}</div>
      </div>
    </div>
  );
}

function ThresholdContainer({ temperature, light }) {
  const { client, connect, subscribe, unsubscribe } = useMqtt();

  return (
    <div className="thresholds">
      <div className="thresholds__label">Thresholds</div>
      <Threshold
        label="Temperature"
        value={temperature}
        min="0"
        max="100"
        unit="°C"
      />
      <Threshold
        label="Light Intensity"
        value={light}
        min="0"
        max="1024"
        unit="Ω"
      />
    </div>
  );
}

export default ThresholdContainer;

// Components
import { ReactComponent as LightOn } from "../assets/img/light-on.svg";
import { ReactComponent as LightOff } from "../assets/img/light-off.svg";
import { ReactComponent as Sun } from "../assets/img/sun.svg";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect, useRef } from "react";
import Widget from "./Widget";

/**
 * Widget for Light Intensity
 */
const LightIntensityWidget = ({ view }) => {
  const [lightIntensity, setLightIntensity] = useState(400);
  const { client, subscribe, unsubscribe } = useMqtt();
  const sunRef = useRef();
  const blurRef = useRef();

  const minColor = [55, 55, 55];
  const maxColor = [255, 222, 77];

  const onLightIntensityReceived = (string) => {
    const value = parseInt(string);
    setLightIntensity(value);

    const percentage = value / 500;

    console.log(percentage);

    const r = (maxColor[0] - minColor[0]) * percentage + minColor[0];
    const g = (maxColor[1] - minColor[1]) * percentage + minColor[1];
    const b = (maxColor[2] - minColor[2]) * percentage + minColor[2];

    sunRef.current.style.fill = `rgb(${r}, ${g}, ${b})`;

    document
      .getElementById("sun-blur")
      .setAttribute("stdDeviation", 3 * percentage);
  };

  useEffect(() => {
    subscribe("safehouse/light-intensity", onLightIntensityReceived);

    return () => {
      unsubscribe("safehouse/light-intensity", onLightIntensityReceived);
    };
  }, [client]);

  return (
    <Widget label="Light Intensity" value={lightIntensity} unit="Ω Ohm">
      <div
        ref={sunRef}
        className="widget__icon"
        onClick={() => onLightIntensityReceived("500")}
      >
        <Sun />
        <input type="range" min={0} max={500} step={1} />
      </div>
    </Widget>
  );
};

export default LightIntensityWidget;

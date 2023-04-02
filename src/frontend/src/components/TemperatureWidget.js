// Components
import Thermometer from "react-thermometer-component";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";
import Widget from "./Widget";

/**
 * Temperature Gauge Widget
 */
const TemperatureWidget = () => {
  const [temperature, setTemperature] = useState(20);
  const { client, subscribe, unsubscribe } = useMqtt();

  const onTemperatureReceived = (string) => {
    setTemperature(parseFloat(string));
    console.log("Temperature: ", string);
  };

  useEffect(() => {
    subscribe("safehouse/temperature", onTemperatureReceived);

    return () => {
      unsubscribe("safehouse/temperature", onTemperatureReceived);
    };
  }, [client]);

  return (
    <Widget label="Temperature" value={temperature} unit="°Celsius">
      <div className="widget__icon widget__icon--thermo">
        <Thermometer
          theme="dark"
          value={temperature}
          max="100"
          format="°C"
          size="large"
          height="200"
        />
      </div>
    </Widget>
  );
};

export default TemperatureWidget;

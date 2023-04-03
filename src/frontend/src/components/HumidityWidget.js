// Components
import GaugeChart from "react-gauge-chart";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";
import Widget from "./Widget";

const HumidityWidget = () => {
  const [humidity, setHumidity] = useState(0);
  const { client, subscribe, unsubscribe } = useMqtt();

  const onHumidityReceived = (string) => {
    setHumidity(parseFloat(string));
    console.log("Humidity: ", string);
  };

  useEffect(() => {
    subscribe("safehouse/humidity", onHumidityReceived);

    return () => {
      unsubscribe("safehouse/humidity", onHumidityReceived);
    };
  }, [client]);

  return (
    <Widget
      className="widget--span-2"
      label="Humidity"
      value={humidity}
      unit="% Percentage"
    >
      <GaugeChart
        id="gauge--1"
        className="gauge widget__icon"
        percent={humidity / 100}
        nrOfLevels={1}
        colors={["#3477eb"]}
      />
    </Widget>
  );
};

export default HumidityWidget;

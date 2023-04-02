// Components
import { ReactComponent as LightOn } from "../assets/img/light-on.svg";
import { ReactComponent as LightOff } from "../assets/img/light-off.svg";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";
import Widget from "./Widget";

/**
 * Widget for Light State
 */
const LightWidget = ({ view }) => {
  const [light, setLight] = useState(0);
  const { client, publish, subscribe, unsubscribe } = useMqtt();

  const onLightReceived = (string) => {
    setLight(parseInt(string));
  };

  useEffect(() => {
    subscribe("safehouse/light", onLightReceived);

    return () => {
      unsubscribe("safehouse/light", onLightReceived);
    };
  }, [client]);

  const handleClick = async () => {
    publish(
      "safehouse/light",
      light ? (light == "1" ? "0" : "1") : "1",
      0,
      true
    );
  };

  return (
    <Widget
      label="Light"
      value={light == 1 ? "On" : "Off"}
      showState={true}
      state={light == 1}
    >
      <button
        className="widget__icon"
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={handleClick}
      >
        {light == 1 ? <LightOn /> : <LightOff />}
      </button>
    </Widget>
  );
};

export default LightWidget;

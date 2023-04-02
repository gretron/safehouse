// Components
import { ReactComponent as FanOn } from "../assets/img/fan-on.svg";
import { ReactComponent as FanOff } from "../assets/img/fan-off.svg";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";
import Widget from "./Widget";

/**
 * Widget for Fan State
 */
const FanWidget = ({ view }) => {
  const [fan, setFan] = useState(0);
  const { client, publish, subscribe, unsubscribe } = useMqtt();

  const onFanReceived = (string) => {
    setFan(parseInt(string));
  };

  useEffect(() => {
    subscribe("safehouse/fan", onFanReceived);

    return () => {
      unsubscribe("safehouse/fan", onFanReceived);
    };
  }, [client]);

  const handleClick = async () => {
    publish("safehouse/fan", fan ? (fan == "1" ? "0" : "1") : "1", 0, true);
  };

  return (
    <Widget
      label="Fan"
      value={fan == 1 ? "On" : "Off"}
      showState={true}
      state={fan == 1}
    >
      <button
        className="widget__icon"
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={handleClick}
      >
        {fan == 1 ? <FanOn /> : <FanOff />}
      </button>
    </Widget>
  );
};

export default FanWidget;

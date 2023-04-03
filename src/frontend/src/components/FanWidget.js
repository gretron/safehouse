// Components
import { ReactComponent as FanOn } from "../assets/img/fan-on.svg";
import { ReactComponent as FanOff } from "../assets/img/fan-off.svg";
import Widget from "./Widget";

// Hooks
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

/**
 * Widget for Fan State
 */
const FanWidget = ({ view }) => {
  const [fan, setFan] = useState(1);
  const { client, publish, subscribe, unsubscribe } = useMqtt();

  const props = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    config: { duration: 1000 },
    loop: true,
  });

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
      <button className="widget__icon" onClick={handleClick}>
        {fan == 1 ? (
          <animated.div className="widget__fan" style={props}>
            <FanOn />
          </animated.div>
        ) : (
          <FanOff />
        )}
      </button>
    </Widget>
  );
};

export default FanWidget;

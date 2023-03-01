import light from "../assets/img/light.svg";
import { ReactComponent as Light } from "../assets/img/light.svg";


// Hooks
import { useState } from "react";
import { useLightState } from "../hooks/useLightState";

/**
 * Widget for Light Electrical Component
 */
const LightWidget = () => {
  const [state, setState] = useState(false);
  const { setLightState, loading, error } = useLightState();

  const handleClick = async () => {
    const newState = await setLightState(!state);

    console.log(newState);

    setState(newState != 0);
  };

  return (
    <div className="light-widget">
      <button
        className={state ? "light-widget--active" : ""}
        style={{ aspectRatio: "1 / 1", width: "10rem" }}
        onClick={() => handleClick()}
      >
        <Light />
        <div>{error}</div>
      </button>
    </div>
  );
};

export default LightWidget;

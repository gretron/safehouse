import light from "../assets/img/light.svg";
import { ReactComponent as Light } from "../assets/img/light.svg";


// Hooks
import { useEffect, useState } from "react";
import { useLightState } from "../hooks/useLightState";

/**
 * Widget for Light Electrical Component
 */
const LightWidget = () => {
  const [state, setState] = useState(false);
  const { getLightState, setLightState, loading, error } = useLightState();

  useEffect(() => {
    const fetchState = async () => {
      const newState = await getLightState();

      console.log(newState);

      setState(newState != 0);
    }

    fetchState();
  }, [])

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
        {!loading && <Light />}
        <div>{error}</div>
      </button>
    </div>
  );
};

export default LightWidget;

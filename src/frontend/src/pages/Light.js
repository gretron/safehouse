// #region Imports

// Hooks
import { useEffect, useState } from "react";
import { useLightState } from "../hooks/useLightState";

// Styles
import styles from "../assets/css/light.css";

// #endregion

/**
 * Light Switch Page
 */
const Light = () => {
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

  const handleChange = async (checked) => {
    const newState = await setLightState(checked);

    setState(newState != 0);
  };

  return (
    <div className="light-switch">
      <div>{error}</div>
      <span className="light-switch__label">Light State</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={state}
          onChange={(event) => handleChange(event.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Light;

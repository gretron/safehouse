// #region Imports

// Hooks
import { useState } from "react";
import { useLightState } from "../hooks/useLightState";

// Styles
import styles from "../assets/css/light.css";

// #endregion

/**
 * Light Switch Page
 */
const Light = () => {
  const [state, setState] = useState(false);
  const { setLightState, loading, error } = useLightState();

  const handleChange = async (checked) => {
    console.log(await setLightState(checked));

    setState(checked);
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

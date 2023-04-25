// Hooks
import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSettingsContext } from "../hooks/useSettingsContext";

// Styles
import settings from "../assets/css/settings.css";

/**
 * Settings Page
 */
const Settings = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuthContext();
  const { settings, dispatch } = useSettingsContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchSettings = async () => {
      const response = await fetch("/api/settings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET", payload: json });
      }
    };

    if (user) {
      fetchSettings();
    }

    return abortController.abort();
  }, [dispatch, user]);

  useEffect(() => {
    if (!settings) return;

    setTemperature(settings.temperature);
    setHumidity(settings.humidity);
    setLightIntensity(settings.light_intensity);
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!user) {
      setLoading(false);
      setError("Please Login to Update Settings");
      return;
    }

    const settings = {
      temperature: parseInt(temperature),
      humidity: parseInt(humidity),
      light_intensity: parseInt(lightIntensity),
    };

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(settings),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.msg);
    } else {
      setLoading(false);
      setError(null);
      dispatch({ type: "PUT", payload: json });

      setSuccess("Successfuly Updated Settings");
    }
  };

  return (
    <form className="settings" onSubmit={handleSubmit}>
      <div className="heading--1">Settings</div>

      <div className="field">
        <div className="field__label">Temperature Threshold (°C)</div>
        <input
          type="number"
          placeholder="25"
          onChange={(e) => setTemperature(e.target.value)}
          value={temperature}
        />
      </div>
      <div className="field">
        <div className="field__label">Humidity Threshold (%)</div>
        <input
          type="number"
          placeholder="50"
          onChange={(e) => setHumidity(e.target.value)}
          value={humidity}
        />
      </div>
      <div className="field">
        <div className="field__label">Light Intensity Threshold (Ω)</div>
        <input
          type="number"
          placeholder="400"
          onChange={(e) => setLightIntensity(e.target.value)}
          value={lightIntensity}
        />
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <button className="button--purple">{loading ? "Updating" : "Update"}</button>
    </form>
  );
};

export default Settings;

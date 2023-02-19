import { useState } from "react";

/**
 * Hook to Turn Light On or Off
 */
export const useLightState = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setLightState = async (state) => {
    setLoading(true);
    setError(null);

    const route = state ? "on" : "off";

    const response = await fetch("api/light/" + route);

    const json = await response.json();

    if (!response.ok) {
      setError("Not Found");
    } else {
      return json;
    }

    setLoading(false);
  };

  return { setLightState, loading, error };
};

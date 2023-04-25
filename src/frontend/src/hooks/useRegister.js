import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (rfid_tag, email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rfid_tag, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.msg);
    } else {
      // Save User Credentials
      localStorage.setItem("user", JSON.stringify(json));

      // Update AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { register, loading, error };
};

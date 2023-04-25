// Hooks
import { useRegister } from "../hooks/useRegister";
import { useMqtt } from "../contexts/MqttContext";
import { useState, useEffect } from "react";

// Styles
import dashboard from "../assets/css/user.css";

/**
 * Register Page
 */
const Register = () => {
  const [tag, setTag] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading, error } = useRegister();
  const { client, connect, subscribe, unsubscribe } = useMqtt();

  const onTagReceived = (tag) => {
    setTag(tag);
  };

  useEffect(() => {
    if (!client) connect();
    console.log("Connecting")

    subscribe("safehouse/register", onTagReceived);

    return () => {
      unsubscribe("safehouse/register", onTagReceived);
    };
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(tag, email, password);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="heading--1">Register</div>
      <div className="field">
        <div className="field__label">RFID Tag</div>
        <input
          type="text"
          placeholder="00 00 00 00"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
      </div>
      <div className="field">
        <div className="field__label">Email Address</div>
        <input
          type="email"
          placeholder="user@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="field">
        <div className="field__label">Password</div>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="field">
        <div className="field__label">Confirm Password</div>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </div>

      <button className="button--purple">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;

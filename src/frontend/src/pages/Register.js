// Hooks
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

// Styles
import dashboard from "../assets/css/user.css";

/**
 * Register Page
 */
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password);

    console.log(email, password, confirmPassword);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="heading--1">Register</div>
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

// Hooks
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// Styles
import dashboard from "../assets/css/user.css";

/**
 * Login Page
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    console.log(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="heading--1">Login</div>

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

      <button className="button--purple">Login</button>
    </form>
  );
};

export default Login;

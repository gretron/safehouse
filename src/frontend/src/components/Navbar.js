// #region Imports

// Components
import { ReactComponent as SafehouseLogo } from "../assets/img/safehouse-logo.svg";
import { ReactComponent as HouseIcon } from "../assets/img/house.svg";
import { ReactComponent as SettingsIcon } from "../assets/img/settings.svg";
import { ReactComponent as RegisterIcon } from "../assets/img/register.svg";
import { ReactComponent as LoginIcon } from "../assets/img/login.svg";
import { ReactComponent as LogoutIcon } from "../assets/img/logout.svg";

// Hooks
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

// Styles
import styles from "../assets/css/navbar.css";

// #endregion

/**
 * Navigation Sidebar
 */
const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  return (
    <div className="navbar">
      <SafehouseLogo />
      {user ? (
        <>
          <div className="navbar__user-name">User</div>
          <div className="navbar__user-email">user@example.com</div>
          <div className="navbar__links">
            <Link
              to="/"
              className={`navbar__link ${
                location.pathname == "/" ? "navbar__link--active" : ""
              }`}
            >
              <HouseIcon />
              <div className="navbar__link-label">Home</div>
            </Link>
            <Link
              to="/settings"
              className={`navbar__link ${
                location.pathname == "/settings" ? "navbar__link--active" : ""
              }`}
            >
              <SettingsIcon />
              <div className="navbar__link-label">Settings</div>
            </Link>
          </div>
          <div className="navbar__footer">
            <a className="navbar__link" onClick={handleClick}>
              <LogoutIcon />
              <div className="navbar__link-label">Logout</div>
            </a>
          </div>
        </>
      ) : (
        <div className="navbar__links">
          <Link
            to="/login"
            className={`navbar__link ${
              location.pathname == "/login" ? "navbar__link--active" : ""
            }`}
          >
            <LoginIcon />
            <div className="navbar__link-label">Login</div>
          </Link>
          <Link
            to="/register"
            className={`navbar__link ${
              location.pathname == "/register" ? "navbar__link--active" : ""
            }`}
          >
            <RegisterIcon />
            <div className="navbar__link-label">Register</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

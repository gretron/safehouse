// Hooks
import { useLocation, Link } from "react-router-dom";
import { useRef } from "react";

// Styles
import styles from "../assets/css/navbar.css";

/**
 * Navigation Sidebar
 */
const Navbar = () => {
  const location = useLocation();

  const button = useRef();
  const buttonSpan = useRef();

  const handleMouseEnter = (e) => {
    const rect = button.current.getBoundingClientRect();
    const win = button.current.ownerDocument.defaultView;

    const parentOffset = {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset,
    };

    const relX = e.pageX - parentOffset.left;
    const relY = e.pageY - parentOffset.top;

    buttonSpan.current.style.top = `${relY}px`;
    buttonSpan.current.style.left = `${relX}px`;

    console.log(location.pathname);
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        className={`button ${location.pathname == "/" ? "button--active" : ""}`}
        onMouseEnter={(e) => handleMouseEnter(e)}
        ref={button}
      >
        <div className="label">Dashboard</div>
        <span ref={buttonSpan}></span>
      </Link>
    </div>
  );
};

export default Navbar;

// Hooks
import { useAuthContext } from "../hooks/useAuthContext";

/**
 * Information Sidebar
 */
const Sidebar = () => {
  const { user } = useAuthContext();

  return <>{user && <div className="sidebar">Welcome User</div>}</>;
};

export default Sidebar;

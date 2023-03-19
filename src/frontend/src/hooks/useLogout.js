import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();

  const logout = () => {
    // Remove User Credentials
    localStorage.removeItem("user");

    // Dispatch LOGOUT Action
    authDispatch({ type: "LOGOUT" });
  };

  return { logout };
};

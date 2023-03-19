import { useAuthContext } from "./useAuthContext";
import { useExercisesContext } from "./useExercisesContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: exercisesDispatch } = useExercisesContext();

  const logout = () => {
    // Remove User Credentials
    localStorage.removeItem("user");

    // Dispatch LOGOUT Action
    authDispatch({ type: "LOGOUT" });
    exercisesDispatch({ type: "GET", payload: null });
  };

  return { logout };
};

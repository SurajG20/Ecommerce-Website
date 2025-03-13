import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, logoutUser } from "../redux/features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const login = (userData) => dispatch(loginUser(userData)).unwrap();
  const register = (userData) => dispatch(registerUser(userData)).unwrap();
  const logout = () => dispatch(logoutUser());

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

export default useAuth;
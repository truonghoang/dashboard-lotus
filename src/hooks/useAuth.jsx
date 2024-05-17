import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "./useCookie";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useCookie("user", null);
    console.log("🚀 ~ AuthProvider ~ user:", user)
  
    const navigate = useNavigate();
   
    // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/");
  };
  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
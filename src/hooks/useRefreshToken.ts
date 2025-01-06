import { baseURL } from "@/api/axios";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useLogout from "./useLogout";

const useRefreshToken = (isInProtectedRoutes = true) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const refresh = async () => {
    try {
      console.log("Refreshing token...");

      const response = await axios.get(`${baseURL}/auth/refresh`, {
        withCredentials: true,
      });

      setAuth((prev) => {
        return { ...prev, accessToken: response.data.token };
      });

      return response.data.token;
    } catch (error) {
      console.error("Refresh token error:", error);
      await logout();
      if (isInProtectedRoutes)
        navigate("/login", { replace: true, state: { from: location } });
    }
  };

  return refresh;
};

export default useRefreshToken;

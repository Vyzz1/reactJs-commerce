import axios from "axios";
import { useAuth } from "./useAuth";
import { baseURL } from "@/api/axios";

export default function useLogout() {
  const { deleteCurrentUser, setIsLoggedOut } = useAuth();

  const logout = async () => {
    deleteCurrentUser();
    setIsLoggedOut(true);
    const res = await axios.get(`${baseURL}/auth/logout`, {
      withCredentials: true,
    });
    return res.data;
  };

  return logout;
}

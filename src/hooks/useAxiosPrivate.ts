import axios, { axiosUpload } from "@/api/axios";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
const useAxiosPrivate = ({ type }: { type: string }) => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  const axiosInstance = type === "upload" ? axiosUpload : axios;

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        console.log("Config On");

        if (type === "upload") {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.error("Response error:", error);
        const prevRequest = error?.config;
        if (error?.response?.status > 400 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();

            if (newAccessToken) {
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosInstance(prevRequest);
            }
          } catch (refreshError) {
            console.error("Refresh token error:", refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, axiosInstance, type, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;

import axios from "axios";
export const baseURL =
  "https://favourable-merralee-kvtcompany-60ae5da4.koyeb.app";

export default axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const normalAxios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export const axiosUpload = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "multipart/form-data" },
  // withCredentials: true,
});

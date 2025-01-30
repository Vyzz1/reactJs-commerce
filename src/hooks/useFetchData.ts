import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "@/api/axios";

export const fetchData = async (customAxios: Axios, endpoint: string) => {
  const response = await customAxios.get(endpoint);
  return response.data;
};
const useFetchData = (
  endpoint: string,
  uniqueKey: string = "",
  type: "private" | "normal",
  enable: boolean = true
) => {
  const axiosPrivate = useAxiosPrivate({ type: "private" });
  const queryKey =
    uniqueKey !== ""
      ? ["fetchData", endpoint, uniqueKey]
      : ["fetchData", endpoint];
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      return fetchData(type === "normal" ? axios : axiosPrivate, endpoint);
    },
    enabled: enable,
  });
};
export default useFetchData;

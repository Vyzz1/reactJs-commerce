import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { normalAxios } from "@/api/axios";

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

  let axios = null;
  if (type === "normal") {
    axios = normalAxios;
  } else {
    axios = axiosPrivate;
  }

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      return fetchData(axios, endpoint);
    },
    enabled: enable,
  });
};
export default useFetchData;

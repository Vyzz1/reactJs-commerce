import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { Axios, AxiosResponse } from "axios";

type AxiosType = "post" | "patch" | "put" | "delete";

const fetchData = async (
  axiosPrivate: Axios,
  endpoint: string,
  body: Record<string | number, unknown> | FormData,
  type: AxiosType
): Promise<unknown> => {
  const methods = {
    post: axiosPrivate.post,
    patch: axiosPrivate.patch,
    put: axiosPrivate.put,
    delete: axiosPrivate.delete,
  };

  try {
    const response: AxiosResponse = await methods[type](endpoint, body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const useSubmitData = (
  endpoint: string,
  onSuccess: (data: unknown) => void,
  onError?: (error: unknown) => void,
  type?: string
) => {
  type = type || "private";

  const axiosPrivate = useAxiosPrivate({ type: type });

  return useMutation({
    mutationKey: [endpoint],
    mutationFn: async ({
      data,
      type,
    }: {
      data: Record<string | number, unknown> | FormData;
      type: AxiosType;
    }) => {
      return fetchData(axiosPrivate, endpoint, data, type);
    },
    onSuccess,
    onError,
  });
};

export default useSubmitData;

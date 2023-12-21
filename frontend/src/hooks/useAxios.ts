import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CanceledError,
} from "axios";
import { useState, useEffect } from "react";

interface Config {
  axiosInstance: typeof axios;
  method: "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
  url: string;
  requestConfig?: AxiosRequestConfig;
}

const useAxios = (config: Config): [AxiosResponse | null, string, boolean] => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { axiosInstance, method, url, requestConfig } = config;

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      axiosInstance[method](url, {
        ...requestConfig,
        signal: controller.signal,
      })
        .then((res) => {
          setResponse(res);
        })
        .catch((err) => {
          if (!(err instanceof CanceledError)) {
            let error = err as AxiosError;
            setError(error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
    // for cancel the request if needed
    return () => controller.abort();
  }, []);

  return [response, error, loading];
};

export default useAxios;

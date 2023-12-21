import axios from "axios";
import useAxios from "../../hooks/useAxios";

export const getUser = () => {
  const config = {
    axiosInstance: axios,
    method: "get" as const,
    url: "/api/user",
  };
  return useAxios(config);
};

import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "../../constants";

export const getAllGames = () => {
  const config = {
    axiosInstance: axios,
    method: "get" as const,
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    requestConfig: {
      headers: {
        "X-RapidAPI-Key": X_RapidAPI_Key,
        "X-RapidAPI-Host": X_RapidAPI_Host,
      },
    },
  };
  return useAxios(config);
};

import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "../../constants";

const rapidAPI_headers = {
  "X-RapidAPI-Key": X_RapidAPI_Key,
  "X-RapidAPI-Host": X_RapidAPI_Host,
};

export const getAllGames = () => {
  const config = {
    axiosInstance: axios,
    method: "get" as const,
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    requestConfig: {
      headers: rapidAPI_headers,
    },
  };
  return useAxios(config);
};

export const getGameDetails = (game_id: string) => {
  const config = {
    axiosInstance: axios,
    method: "get" as const,
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    requestConfig: {
      headers: rapidAPI_headers,
      params: { id: game_id },
    },
  };
  return useAxios(config);
};

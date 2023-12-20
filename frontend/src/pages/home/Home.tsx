import { useEffect, useState } from "react";
import { GameType } from "../../components/game/Game";
import Games from "../../components/game/Games";
import NavigationBar from "../../components/navigation_bar/NavigationBar";
import axios from "axios";
import { getAllGames } from "../../services/games/GameService";
import { X_RapidAPI_Host, X_RapidAPI_Key } from "../../constants";
import useAxios from "../../hooks/useAxios";

// const mock_game: GameType = {
//   id: 540,
//   title: "Overwatch 2",
//   thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
//   short_description:
//     "A hero-focused first-person team shooter from Blizzard Entertainment.",
//   game_url: "https://www.freetogame.com/open/overwatch-2",
//   genre: "Shooter",
//   platform: "PC (Windows)",
//   publisher: "Activision Blizzard",
//   developer: "Blizzard Entertainment",
//   release_date: "2022-10-04",
//   freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
// };

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

const Home = () => {
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Array<GameType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [response, error, loading] = useAxios(config);
  // TODO caught error
  useEffect(() => {
    setGames(response?.data ? response.data : []);
    setIsLoading(false);
  }, [response]);

  return (
    <div>
      <NavigationBar />
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Games games_list={games} size={3} />
      )}
    </div>
  );
};

export default Home;
